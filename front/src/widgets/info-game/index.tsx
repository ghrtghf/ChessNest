'use client'

import { useState } from 'react'
import { Flag } from 'lucide-react'

import { useWebsocket } from '@/shared/store/websocket'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from '@/shared/ui/alert-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip'

type AlertType = 'draw' | 'surrender' | null

export const InfoGame = () => {
	const [alertType, setAlertType] = useState<AlertType>(null)
	const playerBlackId = useWebsocket((state) => state.playerBlackId)
	const playerWhiteId = useWebsocket((state) => state.playerWhiteId)

	return (
		<div className=''>
			<div className='flex  gap-10  justify-center items-center h-screen'>
				<div className='flex flex-col justify-between h-[50%] w-[200px]'>
					<div className='gap-4 flex flex-col justify-center items-center'>
						<Avatar>
							<AvatarImage src='https://github.com/shadcn.png' />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<h2>Рейтинг: {playerBlackId}</h2>
					</div>

					<div className='gap-4 flex flex-col justify-center items-center'>
						<Avatar>
							<AvatarImage src='https://github.com/shadcn.png' />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<h2>Рейтинг: {playerWhiteId}</h2>
					</div>
				</div>

				<div className='flex flex-col'>
					<div className='flex flex-col gap-2 mb-32'>
						<h1 className='text-2xl font-bold'>Knight.com</h1>
						<p className='text-gray-500'>Играйте против друга</p>
					</div>
					<div className='flex gap-2'>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button className='w-20' onClick={() => setAlertType('surrender')}>
										<Flag />
									</Button>
								</TooltipTrigger>
								<TooltipContent>Сдаться</TooltipContent>
							</Tooltip>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button className='w-20' onClick={() => setAlertType('draw')}>
										1/2
									</Button>
								</TooltipTrigger>
								<TooltipContent>Предложить ничью</TooltipContent>
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
		</div>
	)
}
