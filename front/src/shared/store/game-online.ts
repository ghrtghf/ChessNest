import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { STATUS_GAME } from '../constants/status'
import { initialPosition } from '../helpers/initial-position'

import { useWebsocket } from './websocket'

interface GameOnline {
	candidatesMoves: [number, number][]
	castleDirection: { w: 'both' | 'left' | 'none' | 'right'; b: 'both' | 'left' | 'none' | 'right' }
	currentPosition: ReturnType<typeof initialPosition>[]
	myColor: any
	status: 'black wins' | 'is_coming' | 'promoting' | 'stalemate' | 'white wins'
	turn: 'b' | 'w'
	setCandidatesMoves: (moves: [number, number][]) => void
	setCastleDirection: (color: 'b' | 'w', direction: 'both' | 'left' | 'none' | 'right') => void
	setMyColor: (state: any) => void
	setNewCurrentPosition: (newPosition: ReturnType<typeof initialPosition>) => void
	setNewGame: () => void
	setReceivedPosition: (newPosition: string[][]) => void
	setStatus: (status: 'black wins' | 'is_coming' | 'promoting' | 'stalemate' | 'white wins') => void
}

export const useGameOnline = create<GameOnline>((set) => ({
	currentPosition: [initialPosition('w')],
	setReceivedPosition: (newPosition) =>
		set((positions) => {
			let colorPosition

			if (positions.myColor === 'w' && positions.turn === 'b') {
				colorPosition = newPosition.slice().reverse()
			} else if (positions.myColor === 'b' && positions.turn === 'b') {
				colorPosition = newPosition
			} else if (positions.myColor === 'w' && positions.turn === 'w') {
				colorPosition = newPosition
			} else if (positions.myColor === 'b' && positions.turn === 'w') {
				colorPosition = newPosition.slice().reverse()
			}

			// console.log(positions.myColor, positions.turn)

			return {
				currentPosition: [...positions.currentPosition, colorPosition!],
				turn: positions.turn === 'w' ? 'b' : 'w'
			}
		}),
	myColor: 'w',
	setMyColor: (color) =>
		set(() => ({
			myColor: color,
			currentPosition: [initialPosition(color)]
		})),
	setNewCurrentPosition: (newPosition) =>
		set((positions) => {
			const updatedPositions = [...positions.currentPosition, newPosition]

			// const { websocket } = useWebsocket.getState()

			// Если websocket существует и открыт, отправляем сообщение
			// if (websocket && websocket.readyState === WebSocket.OPEN) {
			// 	websocket.send(JSON.stringify({ position: updatedPositions, type: 'move' }))
			// }

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
			// currentPosition: [initialPosition()],
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
