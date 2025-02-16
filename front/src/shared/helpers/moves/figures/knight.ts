import type { Moves } from '../regular'

export const getKnightMoves = ({ position, number, letter }: Moves) => {
	const moves = [] as [number, number][]
	const enemy = position[number][letter].startsWith('w') ? 'b' : 'w'

	const candidates = [
		[-2, -1],
		[-2, 1],
		[-1, -2],
		[-1, 2],
		[1, -2],
		[1, 2],
		[2, -1],
		[2, 1]
	]

	candidates.forEach((c) => {
		const cell = position?.[number + c[0]]?.[letter + c[1]]
		if (cell !== undefined && (cell.startsWith(enemy) || cell === '')) {
			moves.push([number + c[0], letter + c[1]])
		}
	})
	return moves
}
