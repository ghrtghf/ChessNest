'use client'

import { changePosition } from '@/shared/helpers'
import { useGame } from '@/shared/store'

import { Piece } from './Piece'

import './Pieces.css'

export const Pieces = () => {
	const currentPosition = useGame((stateGame) => stateGame.currentPosition[stateGame.currentPosition.length - 1])
	const candidatesMoves = useGame((stateGame) => stateGame.candidatesMoves)

	const attackingMoves = candidatesMoves.filter(([y, x]) => currentPosition[y][x] !== '')
	const hintMoves = candidatesMoves.filter(([y, x]) => currentPosition[y][x] === '')

	return (
		<>
			{attackingMoves &&
				attackingMoves.map(([y, x]) => (
					// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
					<div className={`attacking p-${x}${y}`} key={`attacking-${y}-${x}`} onClick={(event) => changePosition(event)} />
				))}
			{hintMoves &&
				hintMoves.map(([y, x]) => (
					// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
					<div className={`hint p-${x}${y}`} key={`hint-${y}-${x}`} onClick={(event) => changePosition(event)} />
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
