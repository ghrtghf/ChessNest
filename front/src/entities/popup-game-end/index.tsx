import { useState } from 'react'
import Image from 'next/image'

import { STATUS_GAME } from '@/shared/constants/status'
import { useGame } from '@/shared/store'
import { myColor } from '@/shared/store/websocket'
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

// const currentMessage = (myColor, statusGame) => {
// 	const color = myColor === 'b' ?

// 	switch (key) {
// 		case value:
// 			break

// 		default:
// 			break
// 	}
// }

export const GameEnd = () => {
	const statusGame = useGame((state) => state.status)
	const setNewGame = useGame((state) => state.setNewGame)
	// const myColor = useGame((state) => state.myColor)

	const [open, setOpen] = useState(true)

	if (statusGame === STATUS_GAME.promoting || statusGame === STATUS_GAME.is_coming) return null

	const newGame = () => {
		setNewGame()
		setOpen(false)
	}

	const isWin = statusGame.endsWith('wins')

	return (
		<Dialog onOpenChange={() => setOpen(false)} open={open}>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle>Игра окончена</DialogTitle>
					<DialogDescription asChild>
						<h2 className='flex justify-center'>{isWin ? statusGame : 'Ничья'}</h2>
					</DialogDescription>
				</DialogHeader>
				<div className='flex items-center justify-center'>
					{/* {statusGame === 'black wins' && <Image alt='bp' height={150} src='/pieces/default/bp.png' width={150} />}
					{statusGame === 'white wins' && <Image alt='wp' height={150} src='/pieces/default/wp.png' width={150} />}
					{statusGame === 'stalemate' && (
						<>
							<Image alt='bp' height={150} src='/pieces/default/bp.png' width={150} />
							<Image alt='wp' height={150} src='/pieces/default/wp.png' width={150} />
						</>
					)} */}
				</div>
				<DialogFooter className='sm:justify-center'>
					<DialogClose asChild>
						<Button size='lg' type='button' variant='default' onClick={newGame}>
							Новая игра
						</Button>
					</DialogClose>
					<Button size='lg' type='button' variant='secondary'>
						Реванш
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
