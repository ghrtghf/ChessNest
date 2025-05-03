package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"sync"
	"time"

	"github.com/go-redis/redis/v8"
	"github.com/gorilla/websocket"
	"github.com/notnil/chess"
)

var (
	rdb *redis.Client
	ctx = context.Background()
)

type Client struct {
	conn     *websocket.Conn
	gameID   string
	Color    string `json:"color"`
	Username string `json:"username"`
}

type GameState struct {
	FEN     string           `json:"fen"`
	History []*chess.Move    `json:"history"`
	Status  chess.Outcome `json:"status"`
	Turn    chess.Color     `json:"turn"`
}

var (
	clients   = make(map[string][]*Client)
	clientsMu sync.Mutex
	games     = make(map[string]*chess.Game)
	gamesMu   sync.Mutex
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func initRedis() {
	rdb = redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "password",      
		DB:       0,               
	})

	// Проверка подключения
	_, err := rdb.Ping(ctx).Result()
	if err != nil {
		log.Fatal("Failed to connect to Redis:", err)
	}
}

func saveGameState(gameID string, game *chess.Game) error {
	state := GameState{
		FEN:     game.FEN(),
		History: game.Moves(),
		Status:  game.Outcome(),
		Turn:    game.Position().Turn(),
	}

	stateJSON, err := json.Marshal(state)
	if err != nil {
		return err
	}

	return rdb.Set(ctx, "chess:game:"+gameID, stateJSON, 24*time.Hour).Err()
}

func loadGameState(gameID string) (*chess.Game, error) {
	val, err := rdb.Get(ctx, "chess:game:"+gameID).Result()
	if err != nil {
		return nil, err
	}

	var state GameState
	if err := json.Unmarshal([]byte(val), &state); err != nil {
		return nil, err
	}

	game := chess.NewGame(chess.UseNotation(chess.AlgebraicNotation{}))
	if len(state.History) > 0 {
		for _, move := range state.History {
			if err := game.Move(move); err != nil {
				return nil, err
			}
		}
	}

	return game, nil
}

func handleWS(w http.ResponseWriter, r *http.Request) {
	gameID := r.URL.Query().Get("gameId")
	username := r.URL.Query().Get("username")
	if gameID == "" || username == "" {
		http.Error(w, "gameId and username are required", http.StatusBadRequest)
		return
	}

	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Upgrade error:", err)
		return
	}

	// Загружаем или создаем новую игру
	gamesMu.Lock()
	game, exists := games[gameID]
	if !exists {
		// Пытаемся загрузить из Redis
		redisGame, err := loadGameState(gameID)
		if err == nil {
			game = redisGame
		} else {
			game = chess.NewGame(chess.UseNotation(chess.AlgebraicNotation{}))
		}
		games[gameID] = game
	}
	gamesMu.Unlock()

	// Определяем цвет игрока
	clientsMu.Lock()
	gameClients := clients[gameID]
	var playerColor string
	if len(gameClients) == 0 {
		playerColor = "w"
	} else if len(gameClients) == 1 {
		playerColor = "b"
	} else {
		conn.Close()
		clientsMu.Unlock()
		return
	}

	client := &Client{
		conn:     conn,
		gameID:   gameID,
		Color:    playerColor,
		Username: username,
	}

	clients[gameID] = append(clients[gameID], client)
	clientsMu.Unlock()

	// Отправляем начальное состояние
	initialState := map[string]interface{}{
		"type": "init",
		"data": map[string]interface{}{
			"color":    playerColor,
			"gameId":   gameID,
			"username": username,
			"fen":      game.FEN(),
			"status":   game.Outcome().String(),
			"turn":     game.Position().Turn().String(),
		},
	}

	if err := conn.WriteJSON(initialState); err != nil {
		log.Println("Write error:", err)
		return
	}

	// Уведомляем о подключении второго игрока
	if len(clients[gameID]) == 2 {
		for _, c := range clients[gameID] {
			c.conn.WriteJSON(map[string]interface{}{
				"type": "game_start",
				"data": map[string]interface{}{
					"message": "Both players connected",
				},
			})
		}
	}

	defer func() {
		// Очистка при отключении
		clientsMu.Lock()
		defer clientsMu.Unlock()
		
		conns := clients[gameID]
		for i, c := range conns {
			if c == client {
				clients[gameID] = append(conns[:i], conns[i+1:]...)
				break
			}
		}
		conn.Close()
		
		// Уведомляем оставшегося игрока об отключении
		if len(clients[gameID]) > 0 {
			clients[gameID][0].conn.WriteJSON(map[string]interface{}{
				"type": "opponent_disconnected",
				"data": map[string]interface{}{
					"username": username,
				},
			})
		}
	}()

	for {
		var msg map[string]interface{}
		if err := conn.ReadJSON(&msg); err != nil {
			log.Println("Read error:", err)
			break
		}

		switch msg["type"] {
		case "move":
			// Обработка хода
			moveStr, ok := msg["move"].(string)
			if !ok {
				log.Println("Invalid move format")
				continue
			}

			gamesMu.Lock()
			game := games[gameID]
			move, err := chess.AlgebraicNotation{}.Decode(game.Position(), moveStr)
			if err != nil {
				log.Println("Move decode error:", err)
				gamesMu.Unlock()
				continue
			}

			// Проверяем, может ли текущий игрок сделать ход
			if (playerColor == "w" && game.Position().Turn() != chess.White) ||
				(playerColor == "b" && game.Position().Turn() != chess.Black) {
				gamesMu.Unlock()
				conn.WriteJSON(map[string]interface{}{
					"type": "error",
					"data": "Not your turn",
				})
				continue
			}

			// Пытаемся сделать ход
			if err := game.Move(move); err != nil {
				gamesMu.Unlock()
				conn.WriteJSON(map[string]interface{}{
					"type": "error",
					"data": err.Error(),
				})
				continue
			}

			// Сохраняем состояние игры в Redis
			if err := saveGameState(gameID, game); err != nil {
				log.Println("Failed to save game state:", err)
			}

			// Рассылаем обновление всем игрокам
			update := map[string]interface{}{
				"type": "game_update",
				"data": map[string]interface{}{
					"fen":    game.FEN(),
					"move":   moveStr,
					"status": game.Outcome().String(),
					"turn":   game.Position().Turn().String(),
				},
			}

			for _, c := range clients[gameID] {
				if err := c.conn.WriteJSON(update); err != nil {
					log.Println("Write error:", err)
				}
			}
			gamesMu.Unlock()

		case "chat":
			// Обработка чата
			message, ok := msg["message"].(string)
			if !ok {
				continue
			}

			chatMsg := map[string]interface{}{
				"type": "chat",
				"data": map[string]interface{}{
					"username": username,
					"message": message,
					"time":    time.Now().Unix(),
				},
			}

			clientsMu.Lock()
			for _, c := range clients[gameID] {
				if c != client {
					if err := c.conn.WriteJSON(chatMsg); err != nil {
						log.Println("Write error:", err)
					}
				}
			}
			clientsMu.Unlock()

		case "resign":
			// Обработка сдачи
			gamesMu.Lock()
			game := games[gameID]
			if game.Outcome() == chess.NoOutcome {
				if playerColor == "w" {
					game.Resign(chess.White)
				} else {
					game.Resign(chess.Black)
				}
				saveGameState(gameID, game)
			}

			resignMsg := map[string]interface{}{
				"type": "game_over",
				"data": map[string]interface{}{
					"reason":  "resignation",
					"winner":  game.Outcome().String(),
					"username": username,
				},
			}

			for _, c := range clients[gameID] {
				if err := c.conn.WriteJSON(resignMsg); err != nil {
					log.Println("Write error:", err)
				}
			}
			gamesMu.Unlock()
		}
	}
}

func main() {
	initRedis()
	
	http.HandleFunc("/ws", handleWS)
	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})

	log.Println("WebSocket server started on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}