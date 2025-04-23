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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip'

type AlertType = 'draw' | 'surrender' | null

export const InfoGame = () => {
	const [alertType, setAlertType] = useState<AlertType>(null)

	const status = useGame((state) => state.status)
	const setNewGame = useGame((state) => state.setNewGame)

	const newGame = () => {
		setNewGame()
	}

	return (
		<div className='w-[300px]'>
			<div className='flex flex-col items-center'>
				<div className='flex gap-2'>
					<TooltipProvider>
						{status !== 'white_wins' && status !== 'black_wins' && (
							<>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button className='w-20 h-10' onClick={() => setAlertType('surrender')}>
											<Flag />
										</Button>
									</TooltipTrigger>
									<TooltipContent>Сдаться</TooltipContent>
								</Tooltip>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button className='w-20 h-10' onClick={() => setAlertType('draw')}>
											1/2
										</Button>
									</TooltipTrigger>
									<TooltipContent>Предложить ничью</TooltipContent>
								</Tooltip>
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
								<Button className='w-20 h-10' asChild>
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
			<AlertDialog onOpenChange={(open) => !open && setAlertType(null)} open={alertType === 'surrender'}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle className='text-center'>Ты точно хочешь сдаться?</AlertDialogTitle>
					</AlertDialogHeader>
					<AlertDialogFooter className='flex justify-center sm:justify-center'>
						<AlertDialogCancel className='w-[200px] h-[50px]'>Нет</AlertDialogCancel>
						<AlertDialogAction className='w-[200px] h-[50px]'>Да</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
			<AlertDialog onOpenChange={(open) => !open && setAlertType(null)} open={alertType === 'draw'}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle className='text-center'>Предложить ничью?</AlertDialogTitle>
					</AlertDialogHeader>
					<AlertDialogFooter className='flex justify-center sm:justify-center'>
						<AlertDialogCancel className='w-[200px] h-[50px]'>Отмена</AlertDialogCancel>
						<AlertDialogAction className='w-[200px] h-[50px]'>Предложить</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	)
}
