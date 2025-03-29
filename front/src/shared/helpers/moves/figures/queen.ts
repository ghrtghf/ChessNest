import type { Moves } from '../regular'

import { getBishopMoves } from './bishop'
import { getRookMoves } from './rook'

export const getQueenMoves = ({ position, piece, number, letter }: Moves) => {
	const moves = [...getBishopMoves({ position, piece, number, letter }), ...getRookMoves({ position, piece, number, letter })]

	return moves
}
