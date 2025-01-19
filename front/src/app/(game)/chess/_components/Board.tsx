'use client'

import { getCharacter } from '@/helpers/get-character'
import { getClassname } from '@/helpers/get-classname'

import { Letters, Numbers } from './coordinates'
import { Pieces } from './pieces'

import './Board.css'

export const Board = () => {
	const numbers = Array.from({ length: 8 })
		.fill(0)
		.map((_, i) => 8 - i)
	const letters = Array.from({ length: 8 })
		.fill(0)
		.map((_, i) => i + 1)

	// const handlePlaySound = () => {
	// 	const audio = new Audio('/sounds/arthas/1.mp3')
	// 	audio.volume = 0.1
	// 	audio.play()
	// }

	return (
		<div className='relative w-[calc(8*var(--tile-size))]'>
			<Numbers numbers={numbers} />
			<div className='grid grid-cols-8-tiles grid-rows-8-tiles w-[calc(8*var(--tile-size))] rounded overflow-hidden select-none'>
				{numbers.map((number, i) =>
					letters.map((letter, j) => (
						<div className={getClassname(9 - i, j)} key={`${number}-${letter}`}>
							{/* {rank}
							{file} */}
						</div>
					))
				)}
			</div>
			<Pieces />
			<Letters letters={letters} />
		</div>
	)
}
