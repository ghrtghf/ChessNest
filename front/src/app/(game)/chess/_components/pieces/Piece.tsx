'use client'

import { useRef } from 'react'
import type { MouseEvent } from 'react'

import { getValidMoves } from '@/shared/helpers/moves'

import { useGame } from '../../../../../shared/store/game'
import { useHighlightPiece, usePiece } from '../../../../../shared/store/piece'

export const Piece = ({ letter, number, piece }: { letter: number; number: number; piece: string }) => {
	const setDragging = usePiece((state) => state.setDragging)
	const setRefPiece = usePiece((state) => state.setRefPiece)
	const setCandidatesMoves = useGame((state) => state.setCandidatesMoves)

	const setHighlightPiece = useHighlightPiece((state) => state.setHighlightPiece)

	const turn = useGame((stateGame) => stateGame.turn)
	const position = useGame((stateGame) => stateGame.currentPosition[stateGame.currentPosition.length - 1]) as unknown[][]
	const prevPosition = useGame((stateGame) => stateGame.currentPosition[stateGame.currentPosition.length - 2]) as unknown[][]

	const refPiece = useRef<HTMLDivElement | null>(null)

	const onMouseDown = (event: MouseEvent<HTMLDivElement>) => {
		event.currentTarget.classList.add('dragging')
		setDragging(true)
		setRefPiece(refPiece.current)

		if (turn === piece[0]) {
			const candidateMoves = getValidMoves({ position, prevPosition, piece, number, letter })
			setCandidatesMoves(candidateMoves || [])
		} else {
			setCandidatesMoves([])
		}

		setHighlightPiece(letter, number)
	}

	const changeRefPiece = () => {
		setRefPiece(refPiece.current)
	}

	return (
		// eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
		<div className={`piece ${piece} p-${letter}${number}`} ref={refPiece} onClick={changeRefPiece} onMouseDown={onMouseDown} />
	)
}
