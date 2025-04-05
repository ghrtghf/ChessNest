export const getPieces = (position: string[][], enemy: 'b' | 'w') => {
	const enemyPieces = [] as { number: number; letter: number; piece: string }[]

	position.forEach((rank, x) => {
		rank.forEach((_, y) => {
			if (position[x][y].startsWith(enemy)) {
				enemyPieces.push({
					piece: position[x][y],
					letter: y,
					number: x
				})
			}
		})
	})
	return enemyPieces
}

export const getKingPosition = (position: string[][], player: string) => {
	let kingPos: [number, number] | undefined
	position.forEach((rank, x) => {
		rank.forEach((_, y) => {
			if (position[x][y].startsWith(player) && position[x][y].endsWith('k')) kingPos = [x, y]
		})
	})
	return kingPos
}
