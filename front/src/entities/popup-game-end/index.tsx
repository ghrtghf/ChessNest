import { useLayoutEffect, useState } from 'react'
import Image from 'next/image'

import { PRESETS } from '@/shared/constants'
import { STATUS_GAME } from '@/shared/constants/status'
import { useGame, useSelectTheme } from '@/shared/store'
import { Button } from '@/shared/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@/shared/ui/dialog'

const statusMessage = {
	black_wins: 'Черные выиграли',
	white_wins: 'Белые выиграли',
	stalemate: 'Ничья'
}

export const GameEnd = () => {
	const statusGame = useGame((state) => state.status)
	const setNewGame = useGame((state) => state.setNewGame)

	const selectedTheme = useSelectTheme((stateGame) => stateGame.selectedTheme)

	const [open, setOpen] = useState(true)

	useLayoutEffect(() => {
		if (statusGame === STATUS_GAME.black || statusGame === STATUS_GAME.white || statusGame === STATUS_GAME.stalemate) {
			setOpen(true)
		}
	}, [statusGame])

	if (statusGame === STATUS_GAME.promoting || statusGame === STATUS_GAME.is_coming) return null

	const newGame = () => {
		setOpen(false)
		setNewGame()
	}

	return (
		<Dialog onOpenChange={() => setOpen(false)} open={open}>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle>Игра окончена</DialogTitle>
					<DialogDescription asChild>
						<h2 className='flex'>{statusMessage?.[statusGame]}</h2>
					</DialogDescription>
				</DialogHeader>
				<div className='flex items-center justify-center'>
					{statusGame === 'black_wins' && (
						<Image
							alt='bp'
							height={150}
							src={`/custom/pieces/${PRESETS.find((p) => p.id === selectedTheme.figures)?.id}/bp.png`}
							width={150}
						/>
					)}
					{statusGame === 'white_wins' && (
						<Image
							alt='wp'
							height={150}
							src={`/custom/pieces/${PRESETS.find((p) => p.id === selectedTheme.figures)?.id}/wp.png`}
							width={150}
						/>
					)}
					{statusGame === 'stalemate' && (
						<>
							<Image
								alt='bp'
								height={150}
								src={`/custom/pieces/${PRESETS.find((p) => p.id === selectedTheme.figures)?.id}/bp.png`}
								width={150}
							/>
							<Image
								alt='wp'
								height={150}
								src={`/custom/pieces/${PRESETS.find((p) => p.id === selectedTheme.figures)?.id}/bp.png`}
								width={150}
							/>
						</>
					)}
				</div>
				<DialogFooter className='sm:justify-center'>
					<DialogClose asChild>
						<Button size='lg' type='button' variant='default' onClick={newGame}>
							Новая игра
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
