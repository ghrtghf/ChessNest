'use client'

import { useState } from 'react'
import { DoorOpen, Flag, Plus } from 'lucide-react'
import Link from 'next/link'

import { PAGES } from '@/shared/constants'
import { useGame } from '@/shared/store'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from '@/shared/ui/alert-dialog'
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
import { Table, TableBody, TableCell, TableRow } from '@/shared/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip'

type AlertType = 'surrender' | null

export const InfoGame = () => {
	const [alertType, setAlertType] = useState<AlertType>(null)

	const status = useGame((state) => state.status)
	const setNewGame = useGame((state) => state.setNewGame)
	const turn = useGame((state) => state.turn)

	const noteMoves = useGame((state) => state.noteMoves)

	const newGame = () => {
		setNewGame()
	}

	const surrenderClick = () => {
		setAlertType(null)
		if (turn === 'w') {
			useGame.setState({ status: 'black_wins' })
		} else if (turn === 'b') {
			useGame.setState({ status: 'white_wins' })
		}
	}

	return (
		<>
			<div className='flex w-[300px] flex-col items-center bg-sidebar-accent h-[560px] rounded p-4'>
				<h2 className='text-lg mb-2'>Ходы</h2>
				<div className='flex flex-1 flex-wrap content-start w-full '>
					<div className='max-h-64 overflow-y-auto w-full'>
						<Table className='w-full rounded-lg'>
							<TableBody className=''>
								{Array.from({ length: Math.ceil(noteMoves.length / 2) }, (_, idx) => {
									const moveNum = idx + 1
									const whiteMove = noteMoves[2 * idx] ?? ''
									const blackMove = noteMoves[2 * idx + 1] ?? ''

									return (
										<TableRow key={idx}>
											<TableCell className='text-left w-[50px]'>{moveNum}.</TableCell>
											<TableCell className='w-[50px]'>{whiteMove}</TableCell>
											<TableCell className='w-[50px]'>{blackMove}</TableCell>
										</TableRow>
									)
								})}
							</TableBody>
						</Table>
					</div>
				</div>

				<div className='flex gap-2 w-full'>
					<TooltipProvider>
						{status !== 'white_wins' && status !== 'black_wins' && (
							<>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button className='w-full h-10' onClick={() => setAlertType('surrender')}>
											<Flag />
										</Button>
									</TooltipTrigger>
									<TooltipContent>Сдаться</TooltipContent>
								</Tooltip>
								{/* <Tooltip>
									<TooltipTrigger asChild>
										<Button className='w-20 h-10' onClick={() => setAlertType('draw')}>
											1/2
										</Button>
									</TooltipTrigger>
									<TooltipContent>Предложить ничью</TooltipContent>
								</Tooltip> */}
							</>
						)}
						{(status === 'black_wins' || status === 'white_wins') && (
							<Tooltip>
								<TooltipTrigger asChild>
									<Button className='w-full h-10' onClick={newGame}>
										<Plus />
										Новая игра
									</Button>
								</TooltipTrigger>
								<TooltipContent>Новая игра</TooltipContent>
							</Tooltip>
						)}
						<Tooltip>
							<TooltipTrigger asChild>
								<Button className='w-full h-10' asChild>
									<Link href={PAGES.home}>
										<DoorOpen />
									</Link>
								</Button>
							</TooltipTrigger>
							<TooltipContent>Вернуться назад</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			</div>
			<Dialog onOpenChange={() => setAlertType(null)} open={alertType === 'surrender'}>
				<DialogContent className='sm:max-w-md'>
					<DialogHeader>
						<DialogTitle>Ты точно хочешь сдаться?</DialogTitle>
					</DialogHeader>
					<DialogFooter className='sm:justify-center'>
						<DialogClose asChild>
							<Button className='w-[200px] h-[50px]' type='button' variant='outline'>
								Отмена
							</Button>
						</DialogClose>
						<DialogClose asChild>
							<Button className='w-[200px] h-[50px]' type='button' variant='default' onClick={surrenderClick}>
								Новая игра
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
			{/* <AlertDialog onOpenChange={(open) => !open && setAlertType(null)} open={alertType === 'draw'}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle className='text-center'>Предложить ничью?</AlertDialogTitle>
					</AlertDialogHeader>
					<AlertDialogFooter className='flex justify-center sm:justify-center'>
						<AlertDialogCancel className='w-[200px] h-[50px]'>Отмена</AlertDialogCancel>
						<AlertDialogAction className='w-[200px] h-[50px]'>Предложить</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog> */}
		</>
	)
}
