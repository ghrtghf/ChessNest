'use client'

import type { MouseEvent } from 'react'

import { calculateCoords, copyPosition } from '@/shared/helpers'
import { useGame, usePiece } from '@/shared/store'

import { Piece } from './Piece'

import './Pieces.css'

export const Pieces = () => {
	const currentPosition = useGame((stateGame) => stateGame.currentPosition[stateGame.currentPosition.length - 1])
	const candidatesMoves = useGame((stateGame) => stateGame.candidatesMoves)
	const setCandidatesMoves = useGame((stateGame) => stateGame.setCandidatesMoves)
	const setNewCurrentPosition = useGame((stateGame) => stateGame.setNewCurrentPosition)

	const refPiece = usePiece((statePiece) => statePiece.refPiece)
	const refPieces = usePiece((statePiece) => statePiece.refPieces)

	const changePosition = (event: MouseEvent<HTMLDivElement>) => {
		const newPosition = copyPosition(currentPosition)
		const { x, y } = calculateCoords(event, refPieces)

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

			setCandidatesMoves([])
			setNewCurrentPosition(newPosition)
		}
	}

	const attackingMoves = candidatesMoves.filter(([y, x]) => currentPosition[y][x] !== '')
	const hintMoves = candidatesMoves.filter(([y, x]) => currentPosition[y][x] === '')

	return (
		<>
			{/* attacking */}
			{attackingMoves &&
				attackingMoves.map(([y, x]) => (
					// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
					<div className={`attacking p-${x}${y}`} key={`attacking-${y}-${x}`} onClick={(event) => changePosition(event)} />
				))}
			{/* hint */}
			{hintMoves &&
				hintMoves.map(([y, x]) => (
					// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
					<div className={`hint p-${x}${y}`} key={`hint-${y}-${x}`} onClick={(event) => changePosition(event)} />
				))}
			{/* piece */}
			{currentPosition.map((row, number) =>
				row.map((_, letter: number) =>
					// eslint-disable-next-line style/multiline-ternary
					currentPosition[number][letter] ? (
						<Piece key={`${number}-${letter}`} letter={letter} number={number} piece={currentPosition[number][letter]} />
					) : null
				)
			)}
		</>
	)
}
