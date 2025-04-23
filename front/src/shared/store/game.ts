import { create } from 'zustand'

import { STATUS_GAME } from '../constants/status'
import { initialPosition } from '../helpers/initial-position'

interface Game {
	candidatesMoves: [number, number][]
	castleDirection: { w: 'both' | 'left' | 'none' | 'right'; b: 'both' | 'left' | 'none' | 'right' }
	currentPosition: ReturnType<typeof initialPosition>[]
	status: 'black_wins' | 'is_coming' | 'promoting' | 'stalemate' | 'white_wins'
	turn: 'b' | 'w'
	setCandidatesMoves: (moves: [number, number][]) => void
	setCastleDirection: (color: 'b' | 'w', direction: 'both' | 'left' | 'none' | 'right') => void
	setNewCurrentPosition: (newPosition: ReturnType<typeof initialPosition>) => void
	setNewGame: () => void
	setStatus: (status: 'black_wins' | 'is_coming' | 'promoting' | 'stalemate' | 'white_wins') => void
}

export const useGame = create<Game>((set) => ({
	currentPosition: [initialPosition('w')],
	setNewCurrentPosition: (newPosition) =>
		set((positions) => {
			const updatedPositions = [
				...positions.currentPosition,
				newPosition
					.slice()
					.reverse()
					.map((row) => row.slice().reverse())
			]

			return {
				currentPosition: updatedPositions,
				turn: positions.turn === 'w' ? 'b' : 'w'
			}
		}),
	turn: 'w',
	setNewGame: () =>
		set({
			currentPosition: [initialPosition('w')],
			turn: 'w',
			status: STATUS_GAME.is_coming,
			castleDirection: {
				w: 'both',
				b: 'both'
			}
		}),
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
		})),
	status: STATUS_GAME.is_coming,
	setStatus: (status) => set({ status })
}))
