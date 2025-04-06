// main.go
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
}

// Глобальная карта: gameId -> список клиентов
var (
    clients   = make(map[string][]*Client)
    clientsMu sync.Mutex
)

// Настройка WebSocket
var upgrader = websocket.Upgrader{
    CheckOrigin: func(r *http.Request) bool {
        return true // Разрешаем подключение отовсюду (на локалке — ок)
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

    client := &Client{conn, gameId}

    // Добавляем клиента в список
    clientsMu.Lock()
    clients[gameId] = append(clients[gameId], client)
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
    }()

    // Цикл чтения сообщений от клиента
    for {
        var move map[string]interface{}
        err := conn.ReadJSON(&move)
        if err != nil {
            fmt.Println("Ошибка чтения:", err)
            break
        }

        fmt.Printf("Ход в игре %s: %v\n", gameId, move)

        // Отправляем ход другим игрокам
        clientsMu.Lock()
        for _, c := range clients[gameId] {
            if c != client {
                c.conn.WriteJSON(map[string]interface{}{
                    "type": "move",
                    "data": move,
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
