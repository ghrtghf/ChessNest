export const getClassname = (i: number, j: number) => {
	let c = 'tile'
	c += (i + j) % 2 === 0 ? ' tile--dark' : ' tile--light'
	return c
}
