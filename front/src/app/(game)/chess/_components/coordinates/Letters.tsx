import { cn } from '@/helpers/cn'
import { getCharacter } from '@/helpers/get-character'

import './Coordinates.css'

export const Letters = ({ letters }: { letters: number[] }) => (
	<div className='absolute bottom-0 left-0 flex justify-around w-full'>
		{letters.map((letter, i) => (
			<span className={cn('text-2xl pl-[74px] select-none', { light: i % 2 === 0, dark: i % 2 !== 0 })} key={i}>
				{getCharacter(letter)}
			</span>
		))}
	</div>
)
