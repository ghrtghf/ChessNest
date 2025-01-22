'use client'

import { useRef } from 'react'
import type { MouseEvent } from 'react'

import { useGame } from '@/store/game'
import { useHighlightPiece, usePiece } from '@/store/piece'

import { getRookMoves } from '../arbiter/moves'

export const Piece = ({ letter, number, piece }: { letter: number; number: number; piece: string }) => {
	const setDragging = usePiece((state) => state.setDragging)
	const setRefPiece = usePiece((state) => state.setRefPiece)
	const setCandidatesMoves = useGame((state) => state.setCandidatesMoves)

	const setHighlightPiece = useHighlightPiece((state) => state.setHighlightPiece)

	const turn = useGame((stateGame) => stateGame.turn)
	const currentPosition = useGame((stateGame) => stateGame.currentPosition[stateGame.currentPosition.length - 1]) as unknown[][]

	const refPiece = useRef<HTMLDivElement | null>(null)

	const onMouseDown = (event: MouseEvent<HTMLDivElement>) => {
		event.currentTarget.classList.add('dragging')
		setDragging(true)
		setRefPiece(refPiece.current)

		if (turn === piece[0]) {
			const candidateMoves = getRookMoves({ position: currentPosition, piece, number, letter })
			setCandidatesMoves(candidateMoves)
		} else {
			setCandidatesMoves([])
		}

		setHighlightPiece(letter, number)
	}

	// eslint-disable-next-line jsx-a11y/no-static-element-interactions
	return <div className={`piece ${piece} p-${letter}${number}`} ref={refPiece} onMouseDown={onMouseDown} />
}
