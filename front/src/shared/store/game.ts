import { create } from 'zustand'

import { STATUS } from '../constants/status'
import { initialPosition } from '../helpers/initial-position'

interface Game {
	candidatesMoves: [number, number][]
	castleDirection: { w: 'both' | 'left' | 'right'; b: 'both' | 'left' | 'right' }
	currentPosition: ReturnType<typeof initialPosition>[]
	turn: 'b' | 'w'
	setCandidatesMoves: (moves: [number, number][]) => void
	setCastleDirection: (color: 'b' | 'w', direction: 'both' | 'left' | 'right') => void
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
	setCastleDirection: (color: 'b' | 'w', direction: 'both' | 'left' | 'right') =>
		set((state) => ({
			castleDirection: {
				...state.castleDirection,
				[color]: direction
			}
		}))
}))
