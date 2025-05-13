export const getCharacter = (file: number) => String.fromCharCode(file + 96)
// export const getCharacter = (file: number) => String.fromCharCode(file + 97)

interface Notation {
	letter: number
	number: number
	piece: string | undefined
	position: string[][]
	promotesTo?: string
	x: number
	y: number
}

export const getNewMoveNotation = ({ piece, letter, number, x, y, position, promotesTo }: Notation) => {
	const flipped = piece?.startsWith('b')

	const fileIndex = flipped ? 7 - y : y
	const rankIndex = flipped ? 8 - x : x + 1
	const fileChar = String.fromCharCode(97 + fileIndex)

	let note = ''

	if (piece?.[1] === 'k' && Math.abs(letter - y) === 2) {
		if (letter < y) return 'O-O'
		else return 'O-O-O'
	}

	if (piece?.[1] !== 'p') {
		note += piece?.[1].toUpperCase()
		if (position[x][y]) {
			note += 'x'
		}
	} else if (number !== x && letter !== y) {
		const fromFileIndex = flipped ? 7 - letter : letter
		const fromFileChar = String.fromCharCode(97 + fromFileIndex)
		note += `${fromFileChar}x`
		// note += `${getCharacter(letter + 1)}x`
	}
	console.log(fileChar + rankIndex)
	// note += getCharacter(y + 1) + (x + 1)
	note += fileChar + rankIndex

	if (promotesTo) note += `=${promotesTo.toUpperCase()}`

	return note
}
