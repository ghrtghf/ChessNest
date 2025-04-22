import React from 'react'

import { STATUS_GAME } from '@/shared/constants/status'
import { useGame } from '@/shared/store'

import { PromotionBox } from './promotion-box'

import './popup.css'

export const Popup = () => {
	const statusGame = useGame((state) => state.status)

	if (statusGame === STATUS_GAME.is_coming) return null

	return (
		<div className='popup'>
			<PromotionBox />
		</div>
	)
}
