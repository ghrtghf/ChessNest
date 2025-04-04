import React from 'react'

import { STATUS } from '@/shared/constants/status'
import { usePopup } from '@/shared/store'

import { PromotionBox } from './promotion-box'

import './popup.css'

export const Popup = () => {
	const status = usePopup((state) => state.status)

	if (status === STATUS.ongoing) return null

	return (
		<div className='popup'>
			<PromotionBox />
		</div>
	)
}
