import { create } from 'zustand'

// import { STATUS_POPUP } from '../constants/status'

interface Popup {
	promotingSquare: { x: number; y: number; piece: string; currentPositionX: number; currentPositionY: number } | null
	// status: 'Ongoing' | 'Promoting'
	// setStatus: (status: 'Ongoing' | 'Promoting') => void
}

export const usePopup = create<Popup>(() => ({
	// status: STATUS_POPUP.ongoing,
	// setStatus: (status) => set({ status }),
	promotingSquare: null
}))
