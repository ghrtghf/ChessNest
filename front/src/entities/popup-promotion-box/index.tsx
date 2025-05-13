// eslint-disable-next-line simple-import-sort/imports
import type { CSSProperties } from 'react'
import { X } from 'lucide-react'

import { PRESETS } from '@/shared/constants'
import { STATUS_GAME } from '@/shared/constants/status'
import { copyPosition } from '@/shared/helpers'
import { getNewMoveNotation } from '@/shared/helpers/change-position/notation'
import { useGame, usePopup, useSelectTheme } from '@/shared/store'
import { cn } from '@/shared/utils'

import './popup.css'

const getPromotionBoxPosition = (promotionSquare: {
	x: number
	y: number
	piece: string
	currentPositionX: number
	currentPositionY: number
}) => {
	const style: CSSProperties = {}

	if (promotionSquare.x === 7) {
		style.top = '0%'
	} else {
		style.top = '44%'
	}

	if (promotionSquare.y === 0) {
		style.left = '0%'
	} else if (promotionSquare.y === 1) {
		style.left = '12.5%'
	} else if (promotionSquare.y === 2) {
		style.left = '25%'
	} else if (promotionSquare.y === 3) {
		style.left = '37.5%'
	} else if (promotionSquare.y === 4) {
		style.left = '50%'
	} else if (promotionSquare.y === 5) {
		style.left = '62.5%'
	} else if (promotionSquare.y === 6) {
		style.left = '75%'
	} else if (promotionSquare.y === 7) {
		style.left = '87.5%'
	}

	return style
}

export const PromotionBox = () => {
	const setStatus = useGame((state) => state.setStatus)
	const setCandidatesMoves = useGame((state) => state.setCandidatesMoves)
	const setNewCurrentPosition = useGame((state) => state.setNewCurrentPosition)
	const setNoteMoves = useGame((state) => state.setNoteMoves)
	const statusGame = useGame((state) => state.status)
	const currentPosition = useGame((state) => state.currentPosition)

	const promotionSquare = usePopup((state) => state.promotingSquare)

	const selectedTheme = useSelectTheme((state) => state.selectedTheme)

	if (statusGame === STATUS_GAME.is_coming || !promotionSquare) return null

	const options = ['q', 'r', 'b', 'n']
	const color = promotionSquare?.piece === 'wp' ? 'w' : 'b'

	const promotionDirection = promotionSquare.x === 7 ? 'top' : 'bottom'

	const changePiece = (optionPiece: string) => {
		const newPosition = copyPosition(currentPosition[currentPosition.length - 1])

		newPosition[promotionSquare.currentPositionX][promotionSquare.currentPositionY] = ''
		newPosition[promotionSquare.x][promotionSquare.y] = `${color}${optionPiece}`

		setCandidatesMoves([])

		const newMove = getNewMoveNotation({
			...promotionSquare,
			letter: promotionSquare.currentPositionY,
			number: promotionSquare.currentPositionX,
			piece: `${color}p`,
			promotesTo: optionPiece,
			position: newPosition
		})
		setNoteMoves(newMove)
		setNewCurrentPosition(newPosition)
		setStatus(STATUS_GAME.is_coming)
	}

	return (
		<div className='popup'>
			<div className={`popup__inner ${promotionDirection}`} style={getPromotionBoxPosition(promotionSquare)}>
				{options.map((option) => (
					<div
						className={cn(PRESETS.find((p) => p.id === selectedTheme.figures)?.id, `popup__piece ${color}${option}`)}
						key={option}
						onClick={() => changePiece(option)}
					/>
				))}
				<div className='popup__cancel' onClick={() => setStatus(STATUS_GAME.is_coming)}>
					<X color='#8b8987' />
				</div>
			</div>
		</div>
	)
}
