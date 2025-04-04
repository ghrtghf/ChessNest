import {
	getBishopMoves,
	getKingMoves,
	getKnightMoves,
	getPawnCaptures,
	getPawnMoves,
	getQueenMoves,
	getRookMoves
} from './figures'

export interface Moves {
	letter: number
	number: number
	piece: string
	position: any
	prevPosition?: any
}

export const getRegularMoves = ({ position, piece, number, letter }: Moves) => {
	if (piece.endsWith('n')) return getKnightMoves({ position, number, letter, piece })
	if (piece.endsWith('b')) return getBishopMoves({ position, piece, letter, number })
	if (piece.endsWith('r')) return getRookMoves({ position, piece, number, letter })
	if (piece.endsWith('q')) return getQueenMoves({ position, piece, number, letter })
	if (piece.endsWith('k')) return getKingMoves({ position, piece, number, letter })
	if (piece.endsWith('p')) return getPawnMoves({ position, piece, number, letter })
}

export const getValidMoves = ({ position, prevPosition, piece, number, letter }: Moves) => {
	let moves = getRegularMoves({ position, piece, number, letter })

	if (piece.endsWith('p')) {
		moves = [...(moves || []), ...getPawnCaptures({ position, prevPosition, piece, number, letter })]
	}

	return moves
}
