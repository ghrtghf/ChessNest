export const getClassname = (y: number, x: number, checkTile: [number, number] | null | undefined) => {
	let cell = 'tile'
	cell += (y + x) % 2 === 0 ? ' tile--dark' : ' tile--light'

	if (checkTile && checkTile[0] === y && checkTile[1] === x) {
		cell += ' checked'
	}

	return cell
}
