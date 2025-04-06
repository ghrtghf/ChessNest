import { create } from 'zustand'

import { STATUS_GAME } from '../constants/status'
import { initialPosition } from '../helpers/initial-position'

import { useWebsocket } from './websocket'

interface Game {
	candidatesMoves: [number, number][]
	castleDirection: { w: 'both' | 'left' | 'none' | 'right'; b: 'both' | 'left' | 'none' | 'right' }
	currentPosition: ReturnType<typeof initialPosition>[]
	status: 'black wins' | 'is_coming' | 'promoting' | 'stalemate' | 'white wins'
	turn: 'b' | 'w'
	setCandidatesMoves: (moves: [number, number][]) => void
	setCastleDirection: (color: 'b' | 'w', direction: 'both' | 'left' | 'none' | 'right') => void
	setNewCurrentPosition: (newPosition: ReturnType<typeof initialPosition>) => void
	setNewGame: () => void
	setReceivedPosition: (newPosition: string[][]) => void
	setStatus: (status: 'black wins' | 'is_coming' | 'promoting' | 'stalemate' | 'white wins') => void
}

export const useGame = create<Game>((set) => ({
	currentPosition: [initialPosition()],
	setReceivedPosition: (newPosition) =>
		set((positions) => ({
			currentPosition: [...positions.currentPosition, newPosition]
		})),
	setNewCurrentPosition: (newPosition) =>
		set((positions) => {
			const updatedPositions = [...positions.currentPosition, newPosition]

			const { websocket } = useWebsocket.getState()

			// Если websocket существует и открыт, отправляем сообщение
			if (websocket && websocket.readyState === WebSocket.OPEN) {
				websocket.send(JSON.stringify({ position: updatedPositions, type: 'move' }))
			}

			return {
				currentPosition: updatedPositions,
				turn: positions.turn === 'w' ? 'b' : 'w'
			}
			// currentPosition: [...positions.currentPosition, newPosition],
			// turn: positions.turn === 'w' ? 'b' : 'w'
		}),
	turn: 'w',
	setNewGame: () =>
		set({
			currentPosition: [initialPosition()],
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
