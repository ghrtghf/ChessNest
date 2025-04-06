package main

import (
	"fmt"
	"net/http"
	"sync"

	"github.com/gorilla/websocket"
)

// Структура клиента
type Client struct {
	conn   *websocket.Conn
	gameId string
	color  string // "white" или "black"
}

// Глобальная карта: gameId -> список клиентов
var (
	clients   = make(map[string][]*Client)
	clientsMu sync.Mutex
)

// Настройка WebSocket
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true // Разрешаем подключение отовсюду
	},
}

// Основной обработчик WebSocket-подключений
func handleWS(w http.ResponseWriter, r *http.Request) {
	// Получаем ID игры из query-параметра
	gameId := r.URL.Query().Get("gameId")
	if gameId == "" {
		http.Error(w, "gameId is required", http.StatusBadRequest)
		return
	}

	// Обновляем соединение до WebSocket
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println("Ошибка апгрейда:", err)
		return
	}

	// Определяем цвет игрока
	clientsMu.Lock()
	gameClients := clients[gameId]
	var playerColor string
	if len(gameClients) == 0 {
		playerColor = "w"
	} else if len(gameClients) == 1 {
		playerColor = "b"
	} else {
		// Если уже 2 игрока, закрываем соединение
		conn.Close()
		clientsMu.Unlock()
		return
	}

	client := &Client{conn, gameId, playerColor}

	// Добавляем клиента в список
	clients[gameId] = append(clients[gameId], client)
	
	// Отправляем игроку его цвет
	conn.WriteJSON(map[string]interface{}{
		"type": "init",
		"data": map[string]string{
			"color": playerColor,
			"id": gameId,
		},
	})
	
	// Если подключились оба игрока, уведомляем их
	if len(clients[gameId]) == 2 {
		for _, c := range clients[gameId] {
			c.conn.WriteJSON(map[string]interface{}{
				"type": "game_start",
				"data": map[string]interface{}{
					"message": "Оба игрока подключились",
				},
			})
		}
	}
	clientsMu.Unlock()

	defer func() {
		// Удаляем клиента при отключении
		clientsMu.Lock()
		defer clientsMu.Unlock()
		conns := clients[gameId]
		for i, c := range conns {
			if c == client {
				clients[gameId] = append(conns[:i], conns[i+1:]...)
				break
			}
		}
		conn.Close()
		
		// Уведомляем оставшегося игрока о выходе соперника
		if len(clients[gameId]) > 0 {
			clients[gameId][0].conn.WriteJSON(map[string]interface{}{
				"type": "opponent_disconnected",
				"data": map[string]interface{}{},
			})
		}
	}()

	// Цикл чтения сообщений от клиента
	for {
		var message map[string]interface{}
		err := conn.ReadJSON(&message)
		if err != nil {
			fmt.Println("Ошибка чтения:", err)
			break
		}

		fmt.Printf("Сообщение в игре %s: %v\n", gameId, message)

		// Отправляем сообщение другим игрокам
		clientsMu.Lock()
		for _, c := range clients[gameId] {
			if c != client {
				c.conn.WriteJSON(map[string]interface{}{
					"type": message["type"],
					"data": message["data"],
				})
			}
		}
		clientsMu.Unlock()
	}
}

func main() {
	http.HandleFunc("/ws", handleWS)
	fmt.Println("WebSocket сервер запущен на порту 8080")
	http.ListenAndServe(":8080", nil)
}