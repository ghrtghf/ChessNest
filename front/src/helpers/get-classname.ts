export const getClassname = (i: number, j: number, currentPosition, candidatesMoves: [number, number][]) => {
	let c = 'tile'
	c += (i + j) % 2 === 0 ? ' tile--dark' : ' tile--light'

	if (candidatesMoves.find((move) => move[0] === i && move[1] === j)) {
		if (currentPosition[i][j]) {
			c += ' attacking'
		} else {
			c += ' hint'
		}
	}

	return c
}
