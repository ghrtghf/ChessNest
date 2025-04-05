import { getPieces } from './check'
import { isPlayerInCheck } from './is-player-check'
import { getValidMoves } from './regular'

export const isStalemate = (position: string[][], player: 'b' | 'w', castleDirection: 'both' | 'left' | 'none' | 'right') => {
	const isInCheck = isPlayerInCheck({ positionAfterMove: position, position, player })

	if (isInCheck) return false

	const pieces = getPieces(position, player)
	const moves = pieces.reduce(
		(acc: [number, number][], p) =>
			(acc = [
				...acc,
				...getValidMoves({
					position,
					castleDirection,
					...p
				})
			]),
		[]
	)

	return !isInCheck && moves.length === 0
}
