import { create } from 'zustand'

import { STATUS_GAME } from '../constants/status'
import { initialPosition } from '../helpers/initial-position'

interface Game {
	candidatesMoves: [number, number][]
	castleDirection: { w: 'both' | 'left' | 'none' | 'right'; b: 'both' | 'left' | 'none' | 'right' }
	currentPosition: ReturnType<typeof initialPosition>[]
	noteMoves: string[]
	status: 'black_wins' | 'is_coming' | 'promoting' | 'stalemate' | 'white_wins'
	turn: 'b' | 'w'
	setCandidatesMoves: (moves: [number, number][]) => void
	setCastleDirection: (color: 'b' | 'w', direction: 'both' | 'left' | 'none' | 'right') => void
	setNewCurrentPosition: (newPosition: ReturnType<typeof initialPosition>) => void
	setNewGame: () => void
	setNoteMoves: (moves: string) => void
	setStatus: (status: 'black_wins' | 'is_coming' | 'promoting' | 'stalemate' | 'white_wins') => void
}

export const GAME_INIT = {
	currentPosition: [initialPosition('w')],
	noteMoves: [],
	turn: 'w',
	status: STATUS_GAME.is_coming,
	castleDirection: {
		w: 'both',
		b: 'both'
	},
	candidatesMoves: []
} satisfies Partial<Game>

export const useGame = create<Game>((set) => ({
	currentPosition: GAME_INIT.currentPosition,
	noteMoves: GAME_INIT.noteMoves,
	setNoteMoves: (moves) => set((state) => ({ noteMoves: [...state.noteMoves, moves] })),
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
	turn: GAME_INIT.turn,
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
	candidatesMoves: GAME_INIT.candidatesMoves,
	setCandidatesMoves: (moves) => set({ candidatesMoves: moves }),
	castleDirection: GAME_INIT.castleDirection,
	setCastleDirection: (color: 'b' | 'w', direction: 'both' | 'left' | 'none' | 'right') =>
		set((state) => ({
			castleDirection: {
				...state.castleDirection,
				[color]: direction
			}
		})),
	status: GAME_INIT.status,
	setStatus: (status) => set({ status })
}))
