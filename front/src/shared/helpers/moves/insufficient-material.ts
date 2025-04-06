export const areSameColorTiles = (coords1: { x: number; y: number }, coords2: { x: number; y: number }) =>
	(coords1.x + coords1.y) % 2 === (coords2.x + coords2.y) % 2

export const findPieceCoords = (position: string[][], type: string) => {
	const results = [] as { x: number; y: number }[]

	position.forEach((rank, i) => {
		rank.forEach((pos, j) => {
			if (pos === type) results.push({ x: i, y: j })
		})
	})
	return results
}

export const insufficientMaterial = (position: string[][]) => {
	const pieces = position.reduce((acc, rank) => (acc = [...acc, ...rank.filter((spot) => spot)]), [])

	if (pieces.length === 2) return true

	if (pieces.length === 3 && pieces.some((p) => p.endsWith('b') || p.endsWith('n'))) return true

	if (
		pieces.length === 4 &&
		pieces.every((p) => p.endsWith('b') || p.endsWith('k')) &&
		new Set(pieces).size === 4 &&
		// eslint-disable-next-line style/indent-binary-ops
		areSameColorTiles(findPieceCoords(position, 'wb')[0], findPieceCoords(position, 'bb')[0])
	) {
		return true
	}

	return false
}
