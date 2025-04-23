'use client'

import { changePosition } from '@/shared/helpers'
import { useGame } from '@/shared/store'

import { Piece } from '../piece'

// function flipBoard(board: string[][]) {
// 	// Сначала переворачиваем порядок строк, затем в каждой строке — порядок столбцов
// 	return board
// 		.slice()
// 		.reverse()
// 		.map((row) => row.slice().reverse())
// }

export const Pieces = () => {
	const currentPosition = useGame((stateGame) => stateGame.currentPosition[stateGame.currentPosition.length - 1])
	const candidatesMoves = useGame((stateGame) => stateGame.candidatesMoves)

	const attackingMoves = candidatesMoves.filter(([y, x]) => currentPosition[y][x] !== '')
	const hintMoves = candidatesMoves.filter(([y, x]) => currentPosition[y][x] === '')

	console.log('@currentPosition', currentPosition)

	return (
		<>
			{attackingMoves &&
				attackingMoves.map(([y, x]) => (
					<div
						className={`attacking p-${x}${y}`}
						key={`attacking-${y}-${x}`}
						onClick={(event) => changePosition(event as unknown as MouseEvent)}
					/>
				))}
			{hintMoves &&
				hintMoves.map(([y, x]) => (
					<div
						className={`hint p-${x}${y}`}
						key={`hint-${y}-${x}`}
						onClick={(event) => changePosition(event as unknown as MouseEvent)}
					/>
				))}
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
