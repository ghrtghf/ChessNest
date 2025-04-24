import type { Moves } from '../regular'

export const getPawnMoves = ({ position, piece, number, letter }: Moves) => {
	const moves = [] as [number, number][]
	const dir = 1
	// const dir = piece === 'wp' ? 1 : -1

	if (number % 5 === 1) {
		if (position?.[number + dir]?.[letter] === '' && position?.[number + dir + dir]?.[letter] === '') {
			moves.push([number + dir + dir, letter])
		}
	}

	if (!position?.[number + dir]?.[letter]) {
		moves.push([number + dir, letter])
	}

	// console.log('@', 'paws', moves)
	return moves
}

export const getPawnCaptures = ({ position, prevPosition, piece, number, letter }: Moves) => {
	const moves = [] as [number, number][]
	const dir = 1
	// const dir = piece === 'wp' ? 1 : -1
	const enemy = piece[0] === 'w' ? 'b' : 'w'

	// Слева
	if (position?.[number + dir]?.[letter - 1] && position[number + dir][letter - 1].startsWith(enemy)) {
		moves.push([number + dir, letter - 1])
	}

	// Справа
	if (position?.[number + dir]?.[letter + 1] && position[number + dir][letter + 1].startsWith(enemy)) {
		moves.push([number + dir, letter + 1])
	}

	// EnPassant
	// Если противник сделал движение на 2 клетки предыдущего хода
	const enemyPawn = dir === 1 ? 'bp' : 'wp'
	// console.log(enemyPawn)
	// const enemyPawn = dir === 1 ? `${enemy}p` : `${enemy}p`
	const adjacentletters = [letter - 1, letter + 1]
	if (prevPosition) {
		// if (dir === 1 && number === 4) {
		if (dir === 1 && number === 4) {
			adjacentletters.forEach((f) => {
				if (
					position?.[number]?.[f] === enemyPawn &&
					position?.[number + dir + dir]?.[f] === '' &&
					prevPosition?.[number]?.[f] === '' &&
					prevPosition?.[number + dir + dir]?.[f] === enemyPawn
				) {
					moves.push([number + dir, f])
				}
			})
		}
	}

	return moves
}
