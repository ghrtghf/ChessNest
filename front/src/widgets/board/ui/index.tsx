/* eslint-disable jsx-a11y/no-static-element-interactions */
'use client'

import { useLayoutEffect, useRef } from 'react'
import type { MouseEvent } from 'react'

import { Pieces } from '@/app/(game)/chess/_components/pieces'
import { Letters, Numbers } from '@/entities/coordinates'
import { calculateCoords, copyPosition, getClassname, letters, numbers } from '@/shared/helpers'
import { useGame, useHighlightPiece, usePiece } from '@/shared/store'

export const Board = () => {
	const highlightPiece = useHighlightPiece((state) => state.highlightPiece)

	const currentPosition = useGame((stateGame) => stateGame.currentPosition[stateGame.currentPosition.length - 1])
	const candidatesMoves = useGame((stateGame) => stateGame.candidatesMoves)
	const setCandidatesMoves = useGame((stateGame) => stateGame.setCandidatesMoves)
	const setNewCurrentPosition = useGame((stateGame) => stateGame.setNewCurrentPosition)

	const dragging = usePiece((statePiece) => statePiece.dragging)
	const setDragging = usePiece((statePiece) => statePiece.setDragging)
	const refPiece = usePiece((statePiece) => statePiece.refPiece)
	const setRefPiece = usePiece((statePiece) => statePiece.setRefPiece)
	const setRefPieces = usePiece((statePiece) => statePiece.setRefPieces)
	// const refPieces = usePiece((statePiece) => statePiece.refPieces)

	const refPieces = useRef<HTMLDivElement | null>(null)

	useLayoutEffect(() => {
		setRefPieces(refPieces.current)
	}, [refPieces])

	const mouseMove = (event: MouseEvent<HTMLDivElement>) => {
		if (dragging) {
			const { width, top: topContainer, left: leftContainer } = refPieces.current!.getBoundingClientRect()

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

			const { width, top: topContainer, left: leftContainer } = refPieces.current!.getBoundingClientRect()

			const size = width / 8

			const mouseCatchX = (event.clientX - leftContainer) / size
			const mouseCatchY = (event.clientY - topContainer) / size

			const mouseX = mouseCatchX * 100 - 50
			const mouseY = mouseCatchY * 100 - 55

			const clampedX = Math.max(-50, Math.min(750, mouseCatchX))
			const clampedY = Math.max(-50, Math.min(750, mouseCatchY))

			if (clampedX === mouseX && clampedY === mouseY) {
				refPiece!.style.transform = `translate(${clampedX}px, ${clampedY}px)`
			} else {
				const newPosition = copyPosition(currentPosition)
				const { x, y } = calculateCoords(event, refPieces.current)

				if (candidatesMoves.find((move) => move[0] === x && move[1] === y)) {
					const classList = Array.from(refPiece!.classList)

					const piece = classList.find((cls) => /^[a-z]{2}$/i.test(cls))
					const letter = classList.find((cls) => /^p-\d+$/.test(cls))!.split('-')[1][0]
					const number = classList.find((cls) => /^p-\d+$/.test(cls))!.split('-')[1][1]

					// Проверка на взятие на проходе
					if (piece?.endsWith('p') && !newPosition[x][y] && x !== Number(number) && y !== Number(letter)) {
						newPosition[Number(number)][y] = ''
					}

					newPosition[Number(number)][Number(letter)] = ''
					newPosition[x][y] = piece || ''

					setCandidatesMoves([])
					setNewCurrentPosition(newPosition)
				} else {
					refPiece!.style.removeProperty('transform')
				}
			}
		}
	}

	return (
		<div className='flex overflow-y-hidden h-screen w-screen justify-center items-center' onMouseMove={mouseMove} onMouseUp={mouseUp}>
			<div className='relative w-[calc(8*var(--tile-size))] h-[calc(8*var(--tile-size))]' ref={refPieces}>
				{highlightPiece && <div className={`highlight p-${highlightPiece}`} />}
				<div className='absolute grid grid-cols-8-tiles grid-rows-8-tiles w-[calc(8*var(--tile-size))] rounded overflow-hidden select-none'>
					{numbers.map((number, y) =>
						letters.map((letter, x) => (
							<div className={getClassname(7 - y, x)} key={`cell-${number}-${letter}`} />
						))
					)}
				</div>
				<Numbers numbers={numbers} />
				<Letters letters={letters} />
				<Pieces />
			</div>
		</div>
	)
}
