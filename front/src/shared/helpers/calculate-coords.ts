import type { MouseEvent } from 'react'

export const calculateCoords = (event: MouseEvent<HTMLDivElement>, ref: HTMLDivElement | null) => {
	const { top, left, width } = ref!.getBoundingClientRect()
	const size = width / 8
	const y = Math.floor((event.clientX - left) / size)
	const x = 7 - Math.floor((event.clientY - top) / size)

	return { x, y }
}
