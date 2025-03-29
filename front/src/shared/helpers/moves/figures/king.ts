import type { Moves } from '../regular'

export const getKingMoves = ({ position, piece, number, letter }: Moves) => {
	const moves = [] as [number, number][]
	const us = piece[0]
	const direction = [
		[1, -1],
		[1, 0],
		[1, 1],
		[0, -1],
		[0, 1],
		[-1, -1],
		[-1, 0],
		[-1, 1]
	]

	direction.forEach((dir) => {
		const x = number + dir[0]
		const y = letter + dir[1]
		if (position?.[x]?.[y] !== undefined && !position[x][y].startsWith(us)) moves.push([x, y])
	})
	return moves
}
