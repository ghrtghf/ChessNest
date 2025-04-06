import { useWebsocket } from '../store/websocket'

export const initialPosition = () => {
	// создаем пустую доску 8x8
	// и заполняем ее пустыми строками
	const position = Array.from({ length: 8 })
		.fill('')
		.map(() => Array.from({ length: 8 }).fill(''))

	if (useWebsocket.getState().myColor === 'w') {
		// белый ряд фигур сзади
		position[0][0] = 'wr'
		position[0][1] = 'wn'
		position[0][2] = 'wb'
		position[0][3] = 'wq'
		position[0][4] = 'wk'
		position[0][5] = 'wb'
		position[0][6] = 'wn'
		position[0][7] = 'wr'

		// черный ряд фигур сзади
		position[7][0] = 'br'
		position[7][1] = 'bn'
		position[7][2] = 'bb'
		position[7][3] = 'bq'
		position[7][4] = 'bk'
		position[7][5] = 'bb'
		position[7][6] = 'bn'
		position[7][7] = 'br'

		// пешки
		for (let i = 0; i < 8; i++) {
			position[1][i] = 'wp'
			position[6][i] = 'bp'
		}
	} else if (useWebsocket.getState().myColor === 'b') {
		// белый ряд фигур сзади
		position[7][0] = 'wr'
		position[7][1] = 'wn'
		position[7][2] = 'wb'
		position[7][3] = 'wq'
		position[7][4] = 'wk'
		position[7][5] = 'wb'
		position[7][6] = 'wn'
		position[7][7] = 'wr'

		// черный ряд фигур сзади
		position[0][0] = 'br'
		position[0][1] = 'bn'
		position[0][2] = 'bb'
		position[0][3] = 'bq'
		position[0][4] = 'bk'
		position[0][5] = 'bb'
		position[0][6] = 'bn'
		position[0][7] = 'br'

		// пешки
		for (let i = 0; i < 8; i++) {
			position[6][i] = 'wp'
			position[1][i] = 'bp'
		}
	}

	return position as string[][]
}
