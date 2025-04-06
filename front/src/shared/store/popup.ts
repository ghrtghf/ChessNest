import { create } from 'zustand'

import { STATUS } from '../constants/status'

interface Popup {
	promotingSquare: { x: number; y: number; piece: string; currentPositionX: number; currentPositionY: number } | null
	status: 'Black wins' | 'Ongoing' | 'Promoting' | 'White wins'
	setStatus: (status: 'Black wins' | 'Ongoing' | 'Promoting' | 'White wins') => void
}

export const usePopup = create<Popup>((set) => ({
	status: STATUS.ongoing,
	setStatus: (status) => set({ status }),
	promotingSquare: null
}))
