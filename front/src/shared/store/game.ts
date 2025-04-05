import { create } from 'zustand'

import { initialPosition } from '../helpers/initial-position'

interface Game {
	candidatesMoves: [number, number][]
	castleDirection: { w: 'both' | 'left' | 'none' | 'right'; b: 'both' | 'left' | 'none' | 'right' }
	currentPosition: ReturnType<typeof initialPosition>[]
	turn: 'b' | 'w'
	setCandidatesMoves: (moves: [number, number][]) => void
	setCastleDirection: (color: 'b' | 'w', direction: 'both' | 'left' | 'none' | 'right') => void
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
	setCandidatesMoves: (moves) => set({ candidatesMoves: moves }),
	castleDirection: {
		w: 'both',
		b: 'both'
	},
	setCastleDirection: (color: 'b' | 'w', direction: 'both' | 'left' | 'none' | 'right') =>
		set((state) => ({
			castleDirection: {
				...state.castleDirection,
				[color]: direction
			}
		}))
}))
