import { useGame } from '@/shared/store'
import { useCustomBoard } from '@/shared/store/custom-board'
import { cn } from '@/shared/utils/cn'

const getCharacter = (char: number) => String.fromCharCode(char + 96)

export const Letters = ({ letters }: { letters: number[] }) => {
	const myColor = useGame((state) => state.myColor)

	const tileSize = useCustomBoard((state) => state.tileSize)
	const colorLightTile = useCustomBoard((state) => state.colorLightTile)
	const colorDarkTile = useCustomBoard((state) => state.colorDarkTile)

	const textSizeClass = Number(tileSize) >= 90 ? 'text-2xl' : 'text-1xl'
	const padding = Number(tileSize) >= 90 ? 'pl-[74px]' : 'pl-[62px]'

	const displayLetters = myColor === 'b' ? [...letters].reverse() : letters

	return (
		<div className='absolute bottom-0 left-0 flex justify-around w-full'>
			{displayLetters.map((letter, i) => {
				const isDarkBackground = i % 2 !== 0
				const textColor = isDarkBackground ? colorDarkTile : colorLightTile

				return (
					<span className={cn(textSizeClass, padding, 'select-none')} key={i} style={{ color: textColor }}>
						{getCharacter(letter)}
					</span>
				)
			})}
		</div>
	)
}
