import { getKingPosition, getPieces } from './check'
import { getPawnCaptures } from './figures'
import { getRegularMoves } from './regular'

interface isPlayerInCheckProps {
	player: string
	position: string[][]
	positionAfterMove: string[][]
}

export const isPlayerInCheck = ({ positionAfterMove, position, player }: isPlayerInCheckProps) => {
	const enemy = player.startsWith('w') ? 'b' : 'w'

	const kingPos = getKingPosition(positionAfterMove, player)
	const enemyPieces = getPieces(positionAfterMove, enemy)

	const enemyMoves = enemyPieces.reduce<[number, number][]>((acc, p) => {
		const moves = p.piece.endsWith('p')
			? getPawnCaptures({
					position: positionAfterMove,
					prevPosition: position,
					...p
				})
			: getRegularMoves({
					position: positionAfterMove,
					...p
				})

		return [...acc, ...(moves ?? [])]
	}, [])

	if (enemyMoves.some(([x, y]) => kingPos?.[0] === x && kingPos?.[1] === y)) {
		return true
	} else {
		return false
	}
}
