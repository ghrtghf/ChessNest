import { create } from 'zustand'

// import { STATUS_POPUP } from '../constants/status'

interface Popup {
	promotingSquare: { x: number; y: number; piece: string; currentPositionX: number; currentPositionY: number } | null
}

export const usePopup = create<Popup>(() => ({
	promotingSquare: null
}))
