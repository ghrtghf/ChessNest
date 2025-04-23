import { PRESETS } from '@/shared/constants'
import { letters, numbers } from '@/shared/helpers'
import { getKingPosition, isPlayerInCheck } from '@/shared/helpers/moves'
import { useGame } from '@/shared/store'
import { useCustomBoard } from '@/shared/store/custom-board'

export const GridTiles = () => {
	const currentPosition = useGame((stateGame) => stateGame.currentPosition)
	const turn = useGame((stateGame) => stateGame.turn)

	const tileSize = useCustomBoard((stateGame) => stateGame.tileSize)
	// const colorDarkTile = useCustomBoard((stateGame) => stateGame.colorDarkTile)
	// const colorLightTile = useCustomBoard((stateGame) => stateGame.colorLightTile)
	const selectedTheme = useCustomBoard((stateGame) => stateGame.selectedTheme)

	const position = currentPosition[currentPosition.length - 1]

	const checkTile = (() => {
		const isInCheck = isPlayerInCheck({
			position,
			positionAfterMove: position,
			player: turn
		})

		if (isInCheck) return getKingPosition(position, turn)

		return null
	})()

	return (
		<div
			className='absolute rounded overflow-hidden select-none'
			style={{
				width: `calc(8 * ${tileSize}px)`,
				display: 'grid',
				gridTemplateColumns: `repeat(8, ${tileSize}px)`,
				gridTemplateRows: `repeat(8, ${tileSize}px)`
			}}
		>
			{numbers.map((number, y) =>
				letters.map((letter, x) => {
					const row = 7 - y
					const isDark = (row + x) % 2 === 0
					// const bgColor = isDark ? colorDarkTile : colorLightTile
					const bgColor = isDark
						? PRESETS.find((p) => p.id === selectedTheme.board)?.dark
						: PRESETS.find((p) => p.id === selectedTheme.board)?.light

					const isChecked = checkTile && checkTile[0] === row && checkTile[1] === x

					return (
						<div
							className='tile relative'
							key={`cell-${number}-${letter}`}
							style={{
								backgroundColor: bgColor,
								...(isChecked && {
									width: tileSize,
									height: tileSize,
									boxShadow: `inset 0 0 0 3px rgba(255, 215, 0, 0.8)`
								})
							}}
						/>
					)
				})
			)}
		</div>
	)
}
