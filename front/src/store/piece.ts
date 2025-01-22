import { create } from 'zustand'

interface Piece {
	dragging: boolean
	refPiece: HTMLDivElement | null
	setDragging: (change: boolean) => void
	setRefPiece: (ref: HTMLDivElement | null) => void
}

export const usePiece = create<Piece>((set) => ({
	dragging: false,
	setDragging: (change) => set(() => ({ dragging: change })),
	refPiece: null,
	setRefPiece: (ref: HTMLDivElement | null) => set({ refPiece: ref })
}))

interface Highlight {
	highlightPiece: string
	setHighlightPiece: (letter: number, number: number) => void
}

export const useHighlightPiece = create<Highlight>((set) => ({
	setHighlightPiece: (letter: number, number: number) => set(() => ({ highlightPiece: `${letter}${number}` })),
	highlightPiece: ''
}))
