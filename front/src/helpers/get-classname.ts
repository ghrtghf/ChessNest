export const getClassname = (i: number, j: number) => {
	let c = 'piece'
	c += (i + j) % 2 === 0 ? ' wp' : ' bp'
	return c
}
