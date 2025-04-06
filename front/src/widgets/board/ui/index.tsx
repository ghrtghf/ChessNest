'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'

import { Letters, Numbers } from '@/entities/coordinates'
import { Popup } from '@/entities/popup'
import { changePosition, getClassname, letters, numbers } from '@/shared/helpers'
import { getKingPosition } from '@/shared/helpers/moves/check'
import { isPlayerInCheck } from '@/shared/helpers/moves/is-player-check'
import { useGame, useHighlightPiece, usePiece } from '@/shared/store'
import { InfoGame } from '@/widgets/info-game'

import { Pieces } from './pieces'

export const Board = () => {
	const highlightPiece = useHighlightPiece((state) => state.highlightPiece)

	const dragging = usePiece((statePiece) => statePiece.dragging)
	const setDragging = usePiece((statePiece) => statePiece.setDragging)
	const refPiece = usePiece((statePiece) => statePiece.refPiece)
	const setRefPieces = usePiece((statePiece) => statePiece.setRefPieces)

	const currentPosition = useGame((stateGame) => stateGame.currentPosition)
	const turn = useGame((stateGame) => stateGame.turn)

	const position = currentPosition[currentPosition.length - 1]

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

	const checkTile = (() => {
		const isInCheck = isPlayerInCheck({
			position,
			positionAfterMove: position,
			player: turn
		})

		if (isInCheck) return getKingPosition(position, turn)

		return null
	})()

	// useEffect(() => {
	// 	console.log(checkTile)
	// 	if (checkTile) {
	// 		const audio = new Audio('sounds/arthas/1.mp3')
	// 		// Воспроизводим звук
	// 		audio.play().catch((error) => {
	// 			console.error('Ошибка при воспроизведении звука:', error)
	// 		})
	// 	}
	// }, [checkTile])

	useLayoutEffect(() => {
		document.addEventListener('mousemove', mouseMove)
		document.addEventListener('mouseup', mouseUp)

		return () => {
			document.removeEventListener('mousemove', mouseMove)
			document.removeEventListener('mouseup', mouseUp)
		}
	}, [dragging])

	return (
		<div className='relative w-[calc(8*var(--tile-size))] h-[calc(8*var(--tile-size))]' ref={refPieces}>
			{highlightPiece && <div className={`highlight p-${highlightPiece}`} />}
			<div className='absolute grid grid-cols-8-tiles grid-rows-8-tiles w-[calc(8*var(--tile-size))] rounded overflow-hidden select-none'>
				{numbers.map((number, y) =>
					letters.map((letter, x) => <div className={getClassname(7 - y, x, checkTile)} key={`cell-${number}-${letter}`} />)
				)}
			</div>
			<Numbers numbers={numbers} />
			<Letters letters={letters} />
			<Pieces />
			<Popup />
		</div>
	)
}
