'use client'

import { useLayoutEffect, useRef } from 'react'

import { Letters, Numbers } from '@/entities/coordinates'
import { GridTiles } from '@/entities/grid-tiles'
import { Pieces } from '@/entities/pieces'
import { GameEnd } from '@/entities/popup-game-end'
import { PromotionBox } from '@/entities/popup-promotion-box'
import { changePosition, letters, numbers } from '@/shared/helpers'
import { useHighlightPiece, usePiece } from '@/shared/store'
import { useCustomBoard } from '@/shared/store/custom-board'

// export function useMoveSound() {
// 	const audioRef = useRef<HTMLAudioElement | null>(null)

// 	useEffect(() => {
// 		audioRef.current = getMoveAudio()
// 	}, [])

// 	const play = () => {
// 		audioRef.current?.currentTime = 0
// 		audioRef.current?.play()
// 	}

// 	return { play }
// }

export const Board = () => {
	const highlightPiece = useHighlightPiece((state) => state.highlightPiece)

	const dragging = usePiece((statePiece) => statePiece.dragging)
	const setDragging = usePiece((statePiece) => statePiece.setDragging)
	const refPiece = usePiece((statePiece) => statePiece.refPiece)
	const setRefPieces = usePiece((statePiece) => statePiece.setRefPieces)

	const tileSize = useCustomBoard((stateGame) => stateGame.tileSize)

	const refPieces = useRef<HTMLDivElement | null>(null)

	useLayoutEffect(() => {
		setRefPieces(refPieces.current)
	}, [refPieces])

	const mouseMove = (event: MouseEvent) => {
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

	const mouseUp = (event: MouseEvent) => {
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

	useLayoutEffect(() => {
		document.addEventListener('mousemove', mouseMove)
		document.addEventListener('mouseup', mouseUp)

		return () => {
			document.removeEventListener('mousemove', mouseMove)
			document.removeEventListener('mouseup', mouseUp)
		}
	}, [dragging])

	return (
		<div className='relative' ref={refPieces} style={{ width: `calc(8*${tileSize}px)`, height: `calc(8*${tileSize}px)` }}>
			{highlightPiece && <div className={`highlight p-${highlightPiece}`} />}
			<GridTiles />
			<Numbers numbers={numbers} />
			<Letters letters={letters} />
			<Pieces />
			<PromotionBox />
			<GameEnd />
		</div>
	)
}
