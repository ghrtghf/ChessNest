'use client'

import { useRef, useState } from 'react'
import type { MouseEvent } from 'react'

import { copyPosition } from '../../../../../shared/helpers/copy-position'
import { initialPosition } from '../../../../../shared/helpers/initial-position'
import { useGame } from '../../../../../shared/store/game'
import { usePiece } from '../../../../../shared/store/piece'

import { Piece } from './Piece'

import './Pieces.css'

export const Pieces = () => {
	const currentPosition = useGame((stateGame) => stateGame.currentPosition[stateGame.currentPosition.length - 1]) as unknown[][]
	const candidatesMoves = useGame((stateGame) => stateGame.candidatesMoves)
	const setCandidatesMoves = useGame((stateGame) => stateGame.setCandidatesMoves)
	const setNewCurrentPosition = useGame((stateGame) => stateGame.setNewCurrentPosition)

	const dragging = usePiece((statePiece) => statePiece.dragging)
	const setDragging = usePiece((statePiece) => statePiece.setDragging)
	const setRefPiece = usePiece((statePiece) => statePiece.setRefPiece)
	const refPiece = usePiece((statePiece) => statePiece.refPiece)

	const ref = useRef<HTMLDivElement | null>(null)

	const calculateCoords = (event: MouseEvent<HTMLDivElement>) => {
		const { top, left, width } = ref.current!.getBoundingClientRect()
		const size = width / 8
		const y = Math.floor((event.clientX - left) / size)
		const x = 7 - Math.floor((event.clientY - top) / size)

		return { x, y }
	}

	const mouseMove = (event: MouseEvent<HTMLDivElement>) => {
		if (dragging) {
			const { width, top: topContainer, left: leftContainer } = ref.current!.getBoundingClientRect()

			const size = width / 8

			const mouseCatchX = (event.clientX - leftContainer) / size
			const mouseCatchY = (event.clientY - topContainer) / size

			const mouseX = mouseCatchX * 100 - 50
			const mouseY = mouseCatchY * 100 - 55

			const style = window.getComputedStyle(refPiece!)
			let topElement
			let leftElement

			if (style.transform.startsWith('matrix')) {
				const matrixValues = style.transform.match(/matrix\(([^)]+)\)/)![1].split(', ')
				leftElement = Number.parseFloat(matrixValues[4])
				topElement = Number.parseFloat(matrixValues[5])
			}

			leftElement = mouseX
			topElement = mouseY

			const clampedX = Math.max(-50, Math.min(750, Number(leftElement)))
			const clampedY = Math.max(-50, Math.min(750, Number(topElement)))

			refPiece!.style.transform = `translate(${clampedX}%, ${clampedY}%)`
		}
	}

	const mouseUp = (event: MouseEvent<HTMLDivElement>) => {
		if (dragging) {
			setDragging(false)
			setRefPiece(null)
			refPiece!.classList.remove('dragging')

			const { width, top: topContainer, left: leftContainer } = ref.current!.getBoundingClientRect()

			const size = width / 8

			const mouseCatchX = (event.clientX - leftContainer) / size
			const mouseCatchY = (event.clientY - topContainer) / size

			const mouseX = mouseCatchX * 100 - 50
			const mouseY = mouseCatchY * 100 - 55

			if (mouseX < -50 || mouseX > 750 || mouseY < -50 || mouseY > 750) {
				refPiece!.style.removeProperty('transform')
			} else {
				const newPosition = copyPosition(currentPosition)
				const { x, y } = calculateCoords(event)

				if (candidatesMoves.find((move) => move[0] === x && move[1] === y)) {
					const classList = Array.from(refPiece!.classList)

					const piece = classList.find((cls) => /^[a-z]{2}$/i.test(cls))
					const letter = classList.find((cls) => /^p-\d+$/.test(cls))!.split('-')[1][0]
					const number = classList.find((cls) => /^p-\d+$/.test(cls))!.split('-')[1][1]

					// if (x === Number(number) && y === Number(letter)) refPiece!.style.removeProperty('transform')

					// Проверка на взятие на проходе
					if (piece?.endsWith('p') && !newPosition[x][y] && x !== Number(number) && y !== Number(letter)) {
						newPosition[Number(number)][y] = ''
					}

					newPosition[Number(number)][Number(letter)] = ''
					newPosition[x][y] = piece

					// console.log('not take')

					setCandidatesMoves([])
					setNewCurrentPosition(newPosition)
				} else {
					refPiece!.style.removeProperty('transform')
				}
			}
		}
	}

	return (
		// eslint-disable-next-line jsx-a11y/no-static-element-interactions
		<div
			className='pieces'
			ref={ref}
			// onClick={onclick}
			onMouseMove={mouseMove}
			onMouseUp={mouseUp}
		>
			{currentPosition.map((n: any, number) =>
				n.map((_: any, letter: number) =>
					// eslint-disable-next-line style/multiline-ternary
					currentPosition[number][letter] ? (
						<Piece
							key={`${number}-${letter}`}
							letter={letter}
							number={number}
							piece={currentPosition[number][letter] as string}
						/>
					) : null
				)
			)}
		</div>
	)
}
