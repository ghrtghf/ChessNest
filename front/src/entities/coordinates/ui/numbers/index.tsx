import { PRESETS } from '@/shared/constants'
import { useGame } from '@/shared/store'
import { useCustomBoard, useSelectTheme } from '@/shared/store/custom-board'
import { cn } from '@/shared/utils/cn'

export const Numbers = ({ numbers }: { numbers: number[] }) => {
	const turn = useGame((state) => state.turn)

	const tileSize = useCustomBoard((state) => state.tileSize)
	const selectedTheme = useSelectTheme((state) => state.selectedTheme)

	const textSizeClass = Number(tileSize) >= 90 ? 'text-2xl' : 'text-1xl'
	const padding = Number(tileSize) >= 90 ? 'pb-14' : 'pb-11'

	const displayNumbers = turn === 'b' ? [...numbers].reverse() : numbers

	return (
		<div className='absolute top-0 left-0 h-full justify-around flex flex-col'>
			{displayNumbers.map((number, i) => {
				const isDarkBackground = i % 2 === 0
				const textColor = isDarkBackground
					? PRESETS.find((p) => p.id === selectedTheme.board)?.dark
					: PRESETS.find((p) => p.id === selectedTheme.board)?.light

				return (
					<span className={cn(textSizeClass, padding, 'pl-[6px] select-none')} key={i} style={{ color: textColor }}>
						{number}
					</span>
				)
			})}
		</div>
	)
}
