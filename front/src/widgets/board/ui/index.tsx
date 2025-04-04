'use client'

import { useLayoutEffect, useRef } from 'react'
import type { MouseEvent } from 'react'

import { Pieces } from '@/app/(game)/chess/_components/pieces'
import { Letters, Numbers } from '@/entities/coordinates'
import { Popup } from '@/entities/popup'
import { changePosition, getClassname, letters, numbers } from '@/shared/helpers'
import { useHighlightPiece, usePiece } from '@/shared/store'

export const Board = () => {
	const highlightPiece = useHighlightPiece((state) => state.highlightPiece)

	const dragging = usePiece((statePiece) => statePiece.dragging)
	const setDragging = usePiece((statePiece) => statePiece.setDragging)
	const refPiece = usePiece((statePiece) => statePiece.refPiece)
	const setRefPieces = usePiece((statePiece) => statePiece.setRefPieces)

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
				changePosition(event)
			}
		}
	}

	return (
		// eslint-disable-next-line jsx-a11y/no-static-element-interactions
		<div
			className=' flex overflow-y-hidden h-screen w-screen justify-center items-center'
			onMouseMove={mouseMove}
			onMouseUp={mouseUp}
		>
			<div className='relative w-[calc(8*var(--tile-size))] h-[calc(8*var(--tile-size))]' ref={refPieces}>
				{highlightPiece && <div className={`highlight p-${highlightPiece}`} />}
				<div className='absolute grid grid-cols-8-tiles grid-rows-8-tiles w-[calc(8*var(--tile-size))] rounded overflow-hidden select-none'>
					{numbers.map((number, y) =>
						letters.map((letter, x) => <div className={getClassname(7 - y, x)} key={`cell-${number}-${letter}`} />)
					)}
				</div>
				<Numbers numbers={numbers} />
				<Letters letters={letters} />
				<Pieces />
				<Popup />
			</div>
		</div>
	)
}
