export const getClassname = (y: number, x: number) => {
	let cell = 'tile'
	cell += (y + x) % 2 === 0 ? ' tile--dark' : ' tile--light'

	return cell
}
