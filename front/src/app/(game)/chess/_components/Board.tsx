'use client'

import { getCharacter } from '@/helpers/get-character'
import { getClassname } from '@/helpers/get-classname'

import './Board.css'

export const Board = () => {
	const ranks = Array.from({ length: 8 })
		.fill(0)
		.map((x, i) => 8 - i)
	const files = Array.from({ length: 8 })
		.fill(0)
		.map((x, i) => getCharacter(i))

	const handlePlaySound = () => {
		const audio = new Audio('/sounds/arthas/1.mp3')
		audio.volume = 0.1
		audio.play()
	}

	return (
		<div className=''>
			<div className='grid grid-cols-8-tiles grid-rows-8-tiles w-[calc(8*var(--tile-size))] mx-auto rounded overflow-hidden mt-10'>
				{ranks.map((rank, i) =>
					files.map((file, j) => (
						<div className={getClassname(i, j)} key={`${rank}-${file}`}>
							{rank}
							{file}
						</div>
					))
				)}
			</div>
			<button onClick={handlePlaySound}>test</button>
		</div>
	)
}
