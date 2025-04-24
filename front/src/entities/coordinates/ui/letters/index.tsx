import { PRESETS } from '@/shared/constants'
import { useGame } from '@/shared/store'
import { useCustomBoard, useSelectTheme } from '@/shared/store/custom-board'
import { cn } from '@/shared/utils/cn'

const getCharacter = (char: number) => String.fromCharCode(char + 96)

export const Letters = ({ letters }: { letters: number[] }) => {
	const turn = useGame((state) => state.turn)

	const tileSize = useCustomBoard((state) => state.tileSize)
	const selectedTheme = useSelectTheme((state) => state.selectedTheme)

	const textSizeClass = Number(tileSize) >= 90 ? 'text-2xl' : 'text-1xl'
	const padding = Number(tileSize) >= 90 ? 'pl-[74px]' : 'pl-[50px]'

	const displayLetters = turn === 'b' ? [...letters].reverse() : letters

	return (
		<div className='absolute bottom-0 left-0 flex justify-around w-full'>
			{displayLetters.map((letter, i) => {
				const isDarkBackground = i % 2 !== 0
				const textColor = isDarkBackground
					? PRESETS.find((p) => p.id === selectedTheme.board)?.dark
					: PRESETS.find((p) => p.id === selectedTheme.board)?.light

				return (
					<span className={cn(textSizeClass, padding, 'select-none')} key={i} style={{ color: textColor }}>
						{getCharacter(letter)}
					</span>
				)
			})}
		</div>
	)
}
