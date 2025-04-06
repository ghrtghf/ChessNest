import type { Moves } from './regular'

export const getCastlingDirections = ({ castleDirection, piece, letter, number }: Omit<Moves, 'position'>) => {
	if (piece.endsWith('k')) return 'none'

	if (number === 0 && letter === 0) {
		if (castleDirection === 'both') return 'right'
		if (castleDirection === 'left') return 'none'
	}
	if (number === 7 && letter === 0) {
		if (castleDirection === 'both') return 'right'
		if (castleDirection === 'left') return 'none'
	}
	if (number === 0 && letter === 7) {
		if (castleDirection === 'both') return 'left'
		if (castleDirection === 'right') return 'none'
	}
	if (number === 7 && letter === 7) {
		if (castleDirection === 'both') return 'left'
		if (castleDirection === 'right') return 'none'
	}
}
