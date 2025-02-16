'use client'

import { Pieces } from '@/app/(game)/chess/_components/pieces'
import { Letters, Numbers } from '@/entities/coordinates'
import { getClassname, letters, numbers } from '@/shared/helpers'
import { useGame, useHighlightPiece } from '@/shared/store'

export const Board = () => {
	const highlightPiece = useHighlightPiece((state) => state.highlightPiece)
	const currentPosition = useGame((stateGame) => stateGame.currentPosition[stateGame.currentPosition.length - 1]) as unknown[][]
	const candidatesMoves = useGame((stateGame) => stateGame.candidatesMoves)

	return (
		<div className='relative w-[calc(8*var(--tile-size))]'>
			{highlightPiece && <div className={`highlight p-${highlightPiece}`} />}
			<div className='grid grid-cols-8-tiles grid-rows-8-tiles w-[calc(8*var(--tile-size))] rounded overflow-hidden select-none'>
				{numbers.map((number, i) =>
					letters.map((letter, j) => (
						<div className={getClassname(7 - i, j, currentPosition, candidatesMoves)} key={`${number}-${letter}`} />
					))
				)}
			</div>
			<Numbers numbers={numbers} />
			<Letters letters={letters} />
			<Pieces />
		</div>
	)
}
