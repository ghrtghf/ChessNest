/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// eslint-disable-next-line simple-import-sort/imports
import type { CSSProperties } from 'react'
import { X } from 'lucide-react'

// import { STATUS_POPUP } from '@/shared/constants/status'
import { copyPosition } from '@/shared/helpers'
import { useGame, usePopup } from '@/shared/store'
import { STATUS_GAME } from '@/shared/constants/status'

export const PromotionBox = () => {
	const setStatus = useGame((state) => state.setStatus)
	const setCandidatesMoves = useGame((state) => state.setCandidatesMoves)
	const setNewCurrentPosition = useGame((state) => state.setNewCurrentPosition)

	const currentPosition = useGame((state) => state.currentPosition)
	const promotionSquare = usePopup((state) => state.promotingSquare)

	const options = ['q', 'r', 'b', 'n']
	const color = promotionSquare?.piece === 'wp' ? 'w' : 'b'

	if (!promotionSquare) return null

	const promotionDirection = promotionSquare.x === 7 ? 'top' : 'bottom'

	const getPromotionBoxPosition = () => {
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

	const changePiece = (optionPiece: string) => {
		const newPosition = copyPosition(currentPosition[currentPosition.length - 1])

		newPosition[promotionSquare.currentPositionX][promotionSquare.currentPositionY] = ''
		newPosition[promotionSquare.x][promotionSquare.y] = `${color}${optionPiece}`

		setCandidatesMoves([])
		setNewCurrentPosition(newPosition)
		setStatus(STATUS_GAME.is_coming)
	}

	return (
		<div className={`popup__inner ${promotionDirection}`} style={getPromotionBoxPosition()}>
			{options.map((option) => (
				<div className={`popup__piece ${color}${option}`} key={option} onClick={() => changePiece(option)} />
			))}
			<div className='popup__cancel' onClick={() => setStatus(STATUS_GAME.is_coming)}>
				<X color='#8b8987' />
			</div>
		</div>
	)
}
