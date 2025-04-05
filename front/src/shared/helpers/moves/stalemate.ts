import { getPieces } from './check'
import { isPlayerInCheck } from './is-player-check'
import { getValidMoves } from './regular'

export const isStalemate = (position: string[][], player: 'b' | 'w', castleDirection: 'both' | 'left' | 'none' | 'right') => {
	// console.log(position, player, castleDirection)
	const isInCheck = isPlayerInCheck({ position, positionAfterMove: position, player })

	console.log(isInCheck)

	// if (isInCheck) return false

	// console.log(position, player, castleDirection)

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

	console.log(moves)

	return isInCheck && moves.length === 0
}
