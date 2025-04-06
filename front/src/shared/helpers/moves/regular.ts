import { performMove } from '../change-position'

import { getCastlingMoves } from './castling'
import {
	getBishopMoves,
	getKingMoves,
	getKnightMoves,
	getPawnCaptures,
	getPawnMoves,
	getQueenMoves,
	getRookMoves
} from './figures'
import { isPlayerInCheck } from './is-player-check'

export interface Moves {
	castleDirection?: 'both' | 'left' | 'none' | 'right'
	letter: number
	number: number
	piece: string
	position: string[][]
	prevPosition?: string[][]
}

export const getRegularMoves = ({ position, piece, number, letter }: Moves) => {
	if (piece.endsWith('n')) return getKnightMoves({ position, number, letter, piece })
	if (piece.endsWith('b')) return getBishopMoves({ position, piece, letter, number })
	if (piece.endsWith('r')) return getRookMoves({ position, piece, number, letter })
	if (piece.endsWith('q')) return getQueenMoves({ position, piece, number, letter })
	if (piece.endsWith('k')) return getKingMoves({ position, piece, number, letter })
	if (piece.endsWith('p')) return getPawnMoves({ position, piece, number, letter })
}

export const getValidMoves = ({ position, prevPosition, castleDirection, piece, number, letter }: Moves) => {
	const notInCheckMoves = [] as [number, number][]

	// обычные движения
	let moves = getRegularMoves({ position, piece, number, letter })

	// взятие на проходе
	if (piece.endsWith('p')) {
		moves = [...(moves || []), ...getPawnCaptures({ position, prevPosition, piece, number, letter })]
	}

	// TODO: Рокировка при наведении на ладью
	// рокировка
	if (piece.endsWith('k')) moves = [...(moves || []), ...getCastlingMoves({ position, castleDirection, piece, number, letter })]

	moves?.forEach(([x, y]) => {
		const positionAfterMove = performMove({ position, piece, number, letter, x, y })
		// debugger
		if (!isPlayerInCheck({ positionAfterMove, position, player: piece[0] })) {
			notInCheckMoves.push([x, y])
		}
	})
	return notInCheckMoves
}
