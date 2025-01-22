interface Moves {
	letter: number
	number: number
	piece: string
	position: any
}

export const getRookMoves = ({ position, piece, number, letter }: Moves) => {
	const moves = [] as [number, number][]
	const us = piece[0]
	const enemy = us === 'w' ? 'b' : 'w'

	const direction = [
		[-1, 0],
		[1, 0],
		[0, -1],
		[0, 1]
	]

	direction.forEach((dir) => {
		for (let i = 1; i <= 8; i++) {
			const x = number + i * dir[0]
			const y = letter + i * dir[1]
			if (position?.[x]?.[y] === undefined) break
			if (position[x][y].startsWith(enemy)) {
				moves.push([x, y])
				break
			}
			if (position[x][y].startsWith(us)) {
				break
			}
			moves.push([x, y])
		}
	})

	return moves
}
