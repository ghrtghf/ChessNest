import type { MouseEvent } from 'react'

import { useGame, usePiece } from '../store'

import { calculateCoords } from './calculate-coords'
import { copyPosition } from './copy-position'

export const changePosition = (event: MouseEvent<HTMLDivElement>) => {
	const { currentPosition, candidatesMoves } = useGame.getState()
	const { refPiece, refPieces } = usePiece.getState()

	const newPosition = copyPosition(currentPosition[currentPosition.length - 1])
	const { x, y } = calculateCoords(event, refPieces)

	usePiece.setState({ refPiece: null })

	if (candidatesMoves.find((move) => move[0] === x && move[1] === y)) {
		const classList = Array.from(refPiece!.classList)

		const piece = classList.find((cls) => /^[a-z]{2}$/i.test(cls))
		const letter = classList.find((cls) => /^p-\d+$/.test(cls))!.split('-')[1][0]
		const number = classList.find((cls) => /^p-\d+$/.test(cls))!.split('-')[1][1]

		// Проверка на взятие на проходе
		if (piece?.endsWith('p') && !newPosition[x][y] && x !== Number(number) && y !== Number(letter)) {
			newPosition[Number(number)][y] = ''
		}

		newPosition[Number(number)][Number(letter)] = ''
		newPosition[x][y] = piece || ''

		useGame.setState({ candidatesMoves: [] })
		useGame.setState((positions) => ({
			currentPosition: [...positions.currentPosition, newPosition],
			turn: positions.turn === 'w' ? 'b' : 'w'
		}))
	} else {
		refPiece!.style.removeProperty('transform')
	}
}
