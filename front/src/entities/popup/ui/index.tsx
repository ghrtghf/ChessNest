import React from 'react'

import { STATUS_GAME } from '@/shared/constants/status'
import { useGame, usePopup } from '@/shared/store'

import { GameEnd } from './game-end'
import { PromotionBox } from './promotion-box'

import './popup.css'

export const Popup = () => {
	// const statusPopup = usePopup((state) => state.status)
	const statusGame = useGame((state) => state.status)

	if (statusGame === STATUS_GAME.is_coming) return null
	// console.log(statusPopup, statusGame)

	return (
		<div className='popup'>
			<PromotionBox />
			<GameEnd />
		</div>
	)
}
