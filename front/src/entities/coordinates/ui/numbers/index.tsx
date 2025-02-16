import { cn } from '@/shared/utils/cn'

export const Numbers = ({ numbers }: { numbers: number[] }) => (
	<div className='absolute top-0 left-0 h-full justify-around flex flex-col'>
		{numbers.map((number, i) => (
			<span
				className={cn('text-2xl pb-14 pl-[6px] select-none', { 'text-light': i % 2 !== 0, 'text-dark': i % 2 === 0 })}
				key={i}
			>
				{number}
			</span>
		))}
	</div>
)
