import { useRef, useState } from 'react'
import type { DragEvent } from 'react'

import { copyPosition } from '@/helpers/copy-position'
import { initialPosition } from '@/helpers/initial-position'

import { Piece } from './Piece'

import './Pieces.css'

export const Pieces = () => {
	const [state, setState] = useState(initialPosition())
	const ref = useRef<HTMLDivElement | null>(null)

	const calculateCoords = (event: DragEvent<HTMLDivElement>) => {
		const { top, left, width } = ref.current!.getBoundingClientRect()
		const size = width / 8
		const y = Math.floor((event.clientX - left) / size)
		const x = 7 - Math.floor((event.clientY - top) / size)

		return { x, y }
	}

	const onDrop = (event: DragEvent<HTMLDivElement>) => {
		const newPosition = copyPosition(state)

		const { x, y } = calculateCoords(event)
		console.log(y, x)
		const [letter, number, piece] = event.dataTransfer.getData('text/plain').split(',')

		newPosition[Number(number)][Number(letter)] = ''
		newPosition[x][y] = piece

		setState(newPosition)
	}

	const onDragOver = (event: DragEvent<HTMLDivElement>) => {
		// мышка по центру когда объект над зоной

		// ограничить область
		// const rect = event.currentTarget.getBoundingClientRect()
		// const mouseX = event.clientX
		// const mouseY = event.clientY

		// const isInside = mouseX >= rect.left && mouseX <= rect.right && mouseY >= rect.top && mouseY <= rect.bottom
		// // console.log(isInside)
		// event.dataTransfer.effectAllowed = 'move'
		event.preventDefault()
	}

	return (
		<div className='pieces' ref={ref} onDragOver={onDragOver} onDrop={onDrop}>
			{state.map((n, number) =>
				n.map((_, letter) =>
					// eslint-disable-next-line style/multiline-ternary
					state[number][letter] ? (
						<Piece key={`${number}-${letter}`} letter={letter} number={number} piece={state[number][letter]} />
					) : null
				)
			)}
		</div>
	)
}
