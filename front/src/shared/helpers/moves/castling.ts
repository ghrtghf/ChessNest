import { performMove } from '../change-position'

import { isPlayerInCheck } from './is-player-check'
import type { Moves } from './regular'

export const getCastlingMoves = ({ position, castleDirection, piece, number, letter }: Moves) => {
	const moves = [] as [number, number][]

	if (!castleDirection) return moves

	// проверяем что король находится на своей изначальной позиции и что можно сделать рокировку иначе return
	if (letter !== 4 || number % 7 !== 0 || castleDirection === 'none') {
		return moves
	}

	if (piece.startsWith('w')) {
		if (
			isPlayerInCheck({
				position,
				positionAfterMove: position,
				player: 'w'
			})
		) {
			return moves
		}
		// удостоверяемся что поля пустые слева и ладья на своем месте + доступна рокировка
		if (
			['left', 'both'].includes(castleDirection) &&
			!position[0][3] &&
			!position[0][2] &&
			!position[0][1] &&
			position[0][0] === 'wr' &&
			!isPlayerInCheck({
				positionAfterMove: performMove({ position, piece, number, letter, x: 0, y: 3 }),
				position,
				player: 'w'
			}) &&
			!isPlayerInCheck({
				positionAfterMove: performMove({ position, piece, number, letter, x: 0, y: 2 }),
				position,
				player: 'w'
			})
		) {
			moves.push([0, 2])
		}
		if (
			['right', 'both'].includes(castleDirection) &&
			!position[0][5] &&
			!position[0][6] &&
			position[0][7] === 'wr' &&
			!isPlayerInCheck({
				positionAfterMove: performMove({ position, piece, number, letter, x: 0, y: 5 }),
				position,
				player: 'w'
			}) &&
			!isPlayerInCheck({
				positionAfterMove: performMove({ position, piece, number, letter, x: 0, y: 6 }),
				position,
				player: 'w'
			})
		) {
			moves.push([0, 6])
			// moves.push([0, 7])
		}
	} else {
		if (
			isPlayerInCheck({
				positionAfterMove: position,
				position,
				player: 'b'
			})
		) {
			return moves
		}

		if (
			['left', 'both'].includes(castleDirection) &&
			!position[7][3] &&
			!position[7][2] &&
			!position[7][1] &&
			position[7][0] === 'br' &&
			!isPlayerInCheck({
				positionAfterMove: performMove({ position, piece, number, letter, x: 7, y: 3 }),
				position,
				player: 'b'
			}) &&
			!isPlayerInCheck({
				positionAfterMove: performMove({ position, piece, number, letter, x: 7, y: 2 }),
				position,
				player: 'b'
			})
		) {
			moves.push([7, 2])
		}
		if (
			['right', 'both'].includes(castleDirection) &&
			!position[7][5] &&
			!position[7][6] &&
			position[7][7] === 'br' &&
			!isPlayerInCheck({
				positionAfterMove: performMove({ position, piece, number, letter, x: 7, y: 5 }),
				position,
				player: 'b'
			}) &&
			!isPlayerInCheck({
				positionAfterMove: performMove({ position, piece, number, letter, x: 7, y: 6 }),
				position,
				player: 'b'
			})
		) {
			moves.push([7, 6])
		}
	}

	return moves
}
