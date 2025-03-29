import { create } from 'zustand'

import { initialPosition } from '../helpers/initial-position'

interface Game {
	candidatesMoves: [number, number][]
	currentPosition: ReturnType<typeof initialPosition>
	turn: 'b' | 'w'
	setCandidatesMoves: (moves: [number, number][]) => void
	setNewCurrentPosition: (newPosition: ReturnType<typeof initialPosition>) => void
}

export const useGame = create<Game>((set) => ({
	currentPosition: [initialPosition()],
	setNewCurrentPosition: (newPosition) =>
		set((positions) => ({
			currentPosition: [...positions.currentPosition, newPosition],
			turn: positions.turn === 'w' ? 'b' : 'w'
		})),
	turn: 'w',
	candidatesMoves: [],
	setCandidatesMoves: (moves) => set({ candidatesMoves: moves })
}))
