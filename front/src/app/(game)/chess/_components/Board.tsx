'use client'

import { getCharacter } from '@/helpers/get-character'
import { getClassname } from '@/helpers/get-classname'

import { Letters, Numbers } from './coordinates'

import './Board.css'

export const Board = () => {
	const numbers = Array.from({ length: 8 })
		.fill(0)
		.map((x, i) => 8 - i)
	const letters = Array.from({ length: 8 })
		.fill(0)
		.map((x, i) => i + 1)

	// const handlePlaySound = () => {
	// 	const audio = new Audio('/sounds/arthas/1.mp3')
	// 	audio.volume = 0.1
	// 	audio.play()
	// }

	return (
		<div className='relative w-[calc(8*var(--tile-size))]'>
			<Numbers numbers={numbers} />
			<div className='grid grid-cols-8-tiles grid-rows-8-tiles w-[calc(8*var(--tile-size))] rounded overflow-hidden'>
				{numbers.map((rank, i) =>
					letters.map((file, j) => (
						<div className={getClassname(9 - i, j)} key={`${rank}-${file}`}>
							{rank}
							{file}
						</div>
					))
				)}
			</div>
			<Letters letters={letters} />
		</div>
	)
}
