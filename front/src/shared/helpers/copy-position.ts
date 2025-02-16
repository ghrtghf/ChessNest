export const copyPosition = (position: unknown[][]) => {
	const newPosition = Array.from({ length: 8 })
		.fill('')
		.map(() => Array.from({ length: 8 }).fill(''))

	for (let number = 0; number < position.length; number++) {
		for (let letter = 0; letter < position[0].length; letter++) {
			newPosition[number][letter] = position[number][letter]
		}
	}

	return newPosition
}
