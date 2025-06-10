'use client'

import { changePosition } from '@/shared/helpers'
import { useGame } from '@/shared/store'

import { Piece } from '../piece'

export const Pieces = () => {
	const currentPosition = useGame((stateGame) => stateGame.currentPosition[stateGame.currentPosition.length - 1])
	const candidatesMoves = useGame((stateGame) => stateGame.candidatesMoves)

	const attackingMoves = candidatesMoves.filter(([y, x]) => currentPosition[y][x] !== '')
	const hintMoves = candidatesMoves.filter(([y, x]) => currentPosition[y][x] === '')

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
				row.map(
					(fill, letter: number) =>
						fill && <Piece key={`${number}-${letter}`} letter={letter} number={number} piece={currentPosition[number][letter]} />
				)
			)}
		</>
	)
}
