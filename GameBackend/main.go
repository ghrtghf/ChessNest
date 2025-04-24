package main

import (
	"fmt"
	"net/http"
	"sync"

	"github.com/gorilla/websocket"
)

type Client struct {
	conn   *websocket.Conn
	gameId string
	color  string
}

var (
	clients   = make(map[string][]*Client)
	clientsMu sync.Mutex
)


var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true 
	},
}

func handleWS(w http.ResponseWriter, r *http.Request) {
	gameId := r.URL.Query().Get("gameId")
	if gameId == "" {
		http.Error(w, "gameId is required", http.StatusBadRequest)
		return
	}

	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println("Ошибка апгрейда:", err)
		return
	}

	clientsMu.Lock()
	gameClients := clients[gameId]
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

	client := &Client{conn, gameId, playerColor}


	clients[gameId] = append(clients[gameId], client)
	
	conn.WriteJSON(map[string]interface{}{
    "type": "init",
    "data": map[string]interface{}{
        "color":  playerColor, 
        "id":     gameId,      
        "rating": 1200,        
    },
})
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
		
		if len(clients[gameId]) > 0 {
			clients[gameId][0].conn.WriteJSON(map[string]interface{}{
				"type": "opponent_disconnected",
				"data": map[string]interface{}{},
			})
		}
	}()

	for {
		var message map[string]interface{}
		err := conn.ReadJSON(&message)
		if err != nil {
			fmt.Println("Ошибка чтения:", err)
			break
		}
		
		fmt.Printf("Сообщение в игре %s: %v\n", gameId, message)

		var data interface{}
		if message["type"] == "move" {
			data = message["position"]
		} else {
			data = message["data"]
		}

		clientsMu.Lock()
		for _, c := range clients[gameId] {
			if c != client {
				if err := c.conn.WriteJSON(map[string]interface{}{
					"type": message["type"],
					"data": data,
				}); err != nil {
					fmt.Println("Ошибка записи JSON:", err)
				}
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