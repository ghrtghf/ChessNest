import type { RefObject } from 'react'
import { create } from 'zustand'

interface Piece {
	dragging: boolean
	refPiece: HTMLDivElement | null
	refPieces: HTMLDivElement | null
	setDragging: (change: boolean) => void
	setRefPiece: (ref: HTMLDivElement | null) => void
	setRefPieces: (ref: HTMLDivElement | null) => void
}

interface Highlight {
	highlightPiece: string
	setHighlightPiece: (letter: number, number: number) => void
}

export const usePiece = create<Piece>((set) => ({
	dragging: false,
	setDragging: (change) => set(() => ({ dragging: change })),
	refPiece: null,
	setRefPiece: (ref: HTMLDivElement | null) => set({ refPiece: ref }),
	refPieces: null,
	setRefPieces: (ref: HTMLDivElement | null) => set({ refPieces: ref })
}))

export const useHighlightPiece = create<Highlight>((set) => ({
	setHighlightPiece: (letter: number, number: number) => set(() => ({ highlightPiece: `${letter}${number}` })),
	highlightPiece: ''
}))
