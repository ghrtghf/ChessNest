'use client'

import { Flag } from 'lucide-react'

import { Button } from '@/shared/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip'

export const InfoGame = () => (
	<div className=''>
		<div className='flex w-[300px] flex-col justify-center items-center h-screen'>
			<div className='flex flex-col gap-2 mb-32'>
				<h1 className='text-2xl font-bold'>Knight.com</h1>
				<p className='text-gray-500'>Играйте против друга</p>
			</div>
			<div className='flex gap-2'>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button className='w-20'>
								<Flag />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Сдаться</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button className='w-20'>1/2</Button>
						</TooltipTrigger>
						<TooltipContent>Предложить ничью</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
		</div>
	</div>
)
