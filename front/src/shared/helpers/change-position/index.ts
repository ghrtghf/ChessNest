import { STATUS_GAME } from '@/shared/constants'
import { useGame, useHighlightPiece, usePiece, usePopup } from '@/shared/store'

import { copyPosition } from '../copy-position'
import { getCastlingDirections, isCheckMate, isStalemate } from '../moves'
import { insufficientMaterial } from '../moves/insufficient-material'

import { calculateCoords } from './calculate-coords'
import { getNewMoveNotation } from './notation'

interface Move {
	letter: number
	number: number
	piece: string
	position: string[][]
	x: number
	y: number
}

const audio = new Audio('/custom/sounds/classic/1.mp3')

audio.preload = 'auto'
audio.volume = 0.2
audio.load()

export const changePosition = (event: MouseEvent) => {
	const { currentPosition, candidatesMoves, castleDirection, turn } = useGame.getState()
	const { refPiece, refPieces } = usePiece.getState()

	// let newPosition

	const newPosition = copyPosition(currentPosition[currentPosition.length - 1])
	// if (turn === 'b') {
	// 	newPosition = copyPosition(currentPosition[currentPosition.length - 1])
	// } else {
	// 	newPosition = copyPosition(
	// 		currentPosition[currentPosition.length - 1]
	// 			.slice()
	// 			.reverse()
	// 			.map((row) => row.slice().reverse())
	// 	)
	// }

	const { x, y } = calculateCoords(event, refPieces)
	// TODO: поменять местами x,y
	usePiece.setState({ refPiece: null })

	if (candidatesMoves.find((move) => move[0] === x && move[1] === y)) {
		const classList = Array.from(refPiece!.classList)

		const piece = classList.find((cls) => /^[a-z]{2}$/i.test(cls))
		const currentPositionY = classList.find((cls) => /^p-\d+$/.test(cls))!.split('-')[1][0]
		const currentPositionX = classList.find((cls) => /^p-\d+$/.test(cls))!.split('-')[1][1]

		// if ((piece === 'wp' && x === 7) || (piece === 'bp' && x === 0))
		if ((piece === 'wp' && x === 7) || (piece === 'bp' && x === 7)) {
			// Проверка на превращение пешки на конце доски
			usePopup.setState({
				promotingSquare: { piece, x, y, currentPositionX: Number(currentPositionX), currentPositionY: Number(currentPositionY) }
			})
			useGame.setState({ status: STATUS_GAME.promoting })
			useGame.setState({ candidatesMoves: [] })
			refPiece!.style.removeProperty('transform')
			return
		}

		// Проверка на рокировку
		if (piece?.endsWith('r') || piece?.endsWith('k')) {
			const direction = getCastlingDirections({
				castleDirection: castleDirection[turn],
				piece,
				letter: Number(currentPositionY),
				number: Number(currentPositionX)
			})

			useGame.setState((state) => ({
				castleDirection: {
					...state.castleDirection,
					[turn]: direction
				}
			}))
		}

		const newMove = getNewMoveNotation({
			piece,
			letter: Number(currentPositionY),
			number: Number(currentPositionX),
			x,
			y,
			position: newPosition
		})

		useGame.setState((state) => ({
			noteMoves: [...state.noteMoves, newMove]
		}))

		// Проверка на взятие на проходе
		if (piece?.endsWith('p') && !newPosition[x][y] && x !== Number(currentPositionX) && y !== Number(currentPositionY)) {
			newPosition[Number(currentPositionX)][y] = ''
		}

		// Рокировка
		if (piece?.endsWith('k') && Math.abs(y - Number(currentPositionY)) > 1) {
			// Рокировка
			if (y === 2) {
				// Длинная рокировка
				newPosition[Number(currentPositionX)][0] = ''
				newPosition[Number(currentPositionX)][3] = piece.startsWith('w') ? 'wr' : 'br'
			}
			if (y === 6) {
				// Короткая рокировка
				newPosition[Number(currentPositionX)][7] = ''
				newPosition[Number(currentPositionX)][5] = piece.startsWith('w') ? 'wr' : 'br'
			}
		}

		// Подумать над анимацией TODO:
		// Сам ход и записывание в state
		newPosition[Number(currentPositionX)][Number(currentPositionY)] = ''
		newPosition[x][y] = piece || ''

		useGame.setState({ candidatesMoves: [] })
		useGame.setState((positions) => {
			// currentPosition: [...positions.currentPosition, newPosition],
			// turn: positions.turn === 'w' ? 'b' : 'w'
			// const colorPosition = positions.myColor === 'w' ? newPosition : newPosition.reverse()

			const updatedPositions = [
				...positions.currentPosition,
				newPosition
					.slice()
					.reverse()
					.map((row) => row.slice().reverse())
			]

			console.log('@position', updatedPositions)
			audio.play()

			// const { websocket } = useWebsocket.getState()

			// if (websocket && websocket.readyState === WebSocket.OPEN) {
			// 	websocket.send(JSON.stringify({ position: updatedPositions, type: 'move' }))
			// 	console.log(JSON.stringify({ position: updatedPositions, type: 'move' }))
			// }

			return {
				currentPosition: updatedPositions,
				turn: positions.turn === 'w' ? 'b' : 'w'
			}
		})
		// useGame.setState((position) => {
		// 	return position.setSwitchColorPosition()
		// })

		if (insufficientMaterial(newPosition)) {
			useGame.setState({ status: STATUS_GAME.stalemate })
		} else if (
			isStalemate(newPosition, piece?.startsWith('b') ? 'w' : 'b', castleDirection[piece?.startsWith('b') ? 'w' : 'b'])
		) {
			useGame.setState({ status: STATUS_GAME.stalemate })
		} else if (
			isCheckMate(newPosition, piece?.startsWith('b') ? 'w' : 'b', castleDirection[piece?.startsWith('b') ? 'w' : 'b'])
		) {
			useGame.setState({ status: piece?.startsWith('b') ? STATUS_GAME.black : STATUS_GAME.white })
		}

		useHighlightPiece.setState({ highlightPiece: '' })
		refPiece!.style.removeProperty('transform')
	} else {
		refPiece!.style.removeProperty('transform')
	}
}

export const movePiece = ({ position, piece, number, letter, x, y }: Move) => {
	const newPosition = copyPosition(position)

	if (piece.endsWith('k') && Math.abs(y - letter) > 1) {
		if (y === 2) {
			newPosition[number][0] = ''
			newPosition[number][3] = piece.startsWith('w') ? 'wr' : 'br'
		}
		if (y === 6) {
			newPosition[number][7] = ''
			newPosition[number][5] = piece.startsWith('w') ? 'wr' : 'br'
		}
	}

	newPosition[number][letter] = ''
	newPosition[x][y] = piece
	return newPosition
}

export const movePawn = ({ position, piece, number, letter, x, y }: Move) => {
	const newPosition = copyPosition(position)

	if (!newPosition[x][y] && x !== number && y !== letter) newPosition[number][y] = ''

	newPosition[number][letter] = ''
	newPosition[x][y] = piece
	return newPosition
}

export const performMove = ({ position, piece, number, letter, x, y }: Move) => {
	if (piece.endsWith('p')) return movePawn({ position, piece, number, letter, x, y })
	else return movePiece({ position, piece, number, letter, x, y })
}
