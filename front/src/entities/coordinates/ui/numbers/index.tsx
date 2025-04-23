import { useGame } from '@/shared/store'
import { useCustomBoard } from '@/shared/store/custom-board'
import { cn } from '@/shared/utils/cn'

export const Numbers = ({ numbers }: { numbers: number[] }) => {
	const turn = useGame((state) => state.turn)

	const tileSize = useCustomBoard((state) => state.tileSize)
	const colorLightTile = useCustomBoard((state) => state.colorLightTile)
	const colorDarkTile = useCustomBoard((state) => state.colorDarkTile)

	const textSizeClass = Number(tileSize) >= 90 ? 'text-2xl' : 'text-1xl'
	const padding = Number(tileSize) >= 90 ? 'pb-14' : 'pb-11'

	const displayNumbers = turn === 'b' ? [...numbers].reverse() : numbers

	return (
		<div className='absolute top-0 left-0 h-full justify-around flex flex-col'>
			{displayNumbers.map((number, i) => {
				const isDarkBackground = i % 2 === 0
				const textColor = isDarkBackground ? colorDarkTile : colorLightTile

				return (
					<span className={cn(textSizeClass, padding, 'pl-[6px] select-none')} key={i} style={{ color: textColor }}>
						{number}
					</span>
				)
			})}
		</div>
	)
}
