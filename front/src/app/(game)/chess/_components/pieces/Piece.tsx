'use client'

import { useRef, useState } from 'react'
import type { DragEvent, MouseEvent } from 'react'

export const Piece = ({ letter, number, piece }: { letter: number; number: number; piece: unknown }) => {
	// const [position, setPosition] = useState({ x: 0, y: 0 })
	// const [dragging, setDragging] = useState(false)
	// const elementRef = useRef<HTMLDivElement | null>(null)
	// const offset = useRef({ x: 0, y: 0 })

	const onDragStart = (event: DragEvent<HTMLDivElement>) => {
		event.dataTransfer.effectAllowed = 'move'
		event.currentTarget.classList.add('dragging')
		event.dataTransfer.setData('text/plain', `${letter},${number},${piece}`)
		setTimeout(() => {
			const target = event.target as HTMLElement
			target.style.display = 'none'
		}, 0)
	}

	// const onMouseDown = (event: MouseEvent<HTMLDivElement>) => {
	// 	event.currentTarget.classList.add('dragging')
	// 	setDragging(true)

	// 	// event.currentTarget.style.transform = 'translate(100px, 100px)'
	// 	const element = elementRef.current
	// 	if (!element) return

	// 	const rect = element.getBoundingClientRect()
	// 	// const centerX = rect.left
	// 	// const centerY = rect.top

	// 	// Вычисляем начальное смещение мыши относительно элемента
	// 	offset.current = {
	// 		x: rect.left - event.clientX,
	// 		y: rect.top - event.clientY
	// 	}

	// }
	// console.log(offset.current)
	// const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
	// 	event.preventDefault()
	// 	if (!dragging) return
	// 	// console.log(event)
	// 	// Вычисляем новую позицию
	// 	const newX = event.clientX
	// 	const newY = event.clientY

	// 	setPosition({ x: newX, y: newY })

	// 	elementRef.current!.style.left = `${newX - offset.current.x}px`

	// 	elementRef.current!.style.top = `${newY - offset.current.y}px`
	// }

	// const onMouseUp = () => {
	// 	setDragging(false)
	// }

	// const style = dragging
	// 	? {
	// 			transform: `translate(${position.x}%, ${position.y}%)`
	// 		}
	// 	: {}

	function onDragEnd(event: DragEvent<HTMLDivElement>) {
		const target = event.target as HTMLElement
		target.style.display = 'block'
		event.currentTarget.classList.remove('dragging')
	}

	return (
		// eslint-disable-next-line jsx-a11y/no-static-element-interactions
		<div
			className={`piece ${piece} p-${letter}${number}`}
			draggable={true}
			onDragEnd={onDragEnd}
			// ref={elementRef}
			onDragStart={onDragStart}
			// style={style}
			// onMouseDown={onMouseDown}
			// onMouseMove={onMouseMove}
			// onMouseUp={onMouseUp}
		/>
	)
}
