'use client'

import { getClassname } from '@/helpers/get-classname'
import { letters, numbers } from '@/helpers/initial-position'
import { useGame } from '@/store/game'
import { useHighlightPiece } from '@/store/piece'

import { Letters, Numbers } from './coordinates'
import { Pieces } from './pieces'

import './Board.css'

export const Board = () => {
	const highlightPiece = useHighlightPiece((state) => state.highlightPiece)
	const currentPosition = useGame((stateGame) => stateGame.currentPosition[stateGame.currentPosition.length - 1]) as unknown[][]
	const candidatesMoves = useGame((stateGame) => stateGame.candidatesMoves)

	// const handlePlaySound = () => {
	// 	const audio = new Audio('/sounds/arthas/1.mp3')
	// 	audio.volume = 0.1
	// 	audio.play()
	// }

	return (
		<div className='relative w-[calc(8*var(--tile-size))]'>
			<Numbers numbers={numbers} />
			{highlightPiece && <div className={`highlight p-${highlightPiece}`} />}
			<div className='grid grid-cols-8-tiles grid-rows-8-tiles w-[calc(8*var(--tile-size))] rounded overflow-hidden select-none'>
				{numbers.map((number, i) =>
					letters.map((letter, j) => (
						<div className={getClassname(7 - i, j, currentPosition, candidatesMoves)} key={`${number}-${letter}`} />
					))
				)}
			</div>
			<Pieces />
			<Letters letters={letters} />
		</div>
	)
}
