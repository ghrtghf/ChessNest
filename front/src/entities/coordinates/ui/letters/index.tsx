	import { getCharacter } from '@/shared/helpers'
import { cn } from '@/shared/utils/cn'

export const Letters = ({ letters }: { letters: number[] }) => (
	<div className='absolute bottom-0 left-0 flex justify-around w-full'>
		{letters.map((letter, i) => (
			<span className={cn('text-2xl pl-[74px] select-none', { 'text-light': i % 2 === 0, 'text-dark': i % 2 !== 0 })} key={i}>
				{getCharacter(letter)}
			</span>
		))}
	</div>
)
