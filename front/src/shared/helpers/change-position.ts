import type { MouseEvent } from 'react'

import { STATUS } from '../constants/status'
import { useGame, usePiece, usePopup } from '../store'

import { calculateCoords } from './calculate-coords'
import { copyPosition } from './copy-position'

export const changePosition = (event: MouseEvent<HTMLDivElement>) => {
	const { currentPosition, candidatesMoves } = useGame.getState()
	const { refPiece, refPieces } = usePiece.getState()

	const newPosition = copyPosition(currentPosition[currentPosition.length - 1])
	const { x, y } = calculateCoords(event, refPieces)
	// TODO: поменять местами x,y

	usePiece.setState({ refPiece: null })

	if (candidatesMoves.find((move) => move[0] === x && move[1] === y)) {
		const classList = Array.from(refPiece!.classList)

		const piece = classList.find((cls) => /^[a-z]{2}$/i.test(cls))
		const currentPositionY = classList.find((cls) => /^p-\d+$/.test(cls))!.split('-')[1][0]
		const currentPositionX = classList.find((cls) => /^p-\d+$/.test(cls))!.split('-')[1][1]

		if ((piece === 'wp' && x === 7) || (piece === 'bp' && x === 0)) {
			usePopup.setState({
				status: STATUS.promoting,
				promotingSquare: { piece, x, y, currentPositionX: Number(currentPositionX), currentPositionY: Number(currentPositionY) }
			})
			useGame.setState({ candidatesMoves: [] })
			refPiece!.style.removeProperty('transform')
		} else {
			if (piece?.endsWith('p') && !newPosition[x][y] && x !== Number(currentPositionX) && y !== Number(currentPositionY)) {
				newPosition[Number(currentPositionX)][y] = ''
			}

			// Подумать над анимацией TODO:
			newPosition[Number(currentPositionX)][Number(currentPositionY)] = ''
			newPosition[x][y] = piece || ''

			useGame.setState({ candidatesMoves: [] })
			useGame.setState((positions) => ({
				currentPosition: [...positions.currentPosition, newPosition],
				turn: positions.turn === 'w' ? 'b' : 'w'
			}))
		}

		// Проверка на взятие на проходе
	} else {
		refPiece!.style.removeProperty('transform')
	}
}
