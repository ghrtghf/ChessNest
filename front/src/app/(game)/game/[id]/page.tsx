'use client'

import { useSession } from 'next-auth/react'
import type { Metadata } from 'next'

import { useGame } from '@/shared/store'
import { useWebsocket } from '@/shared/store/websocket'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { cn } from '@/shared/utils'
import { Board } from '@/widgets/board'
import { InfoGame } from '@/widgets/info-game'

// export const metadata: Metadata = {
// 	title: 'Игра с другом | Knight.com',
// 	description: 'Chess'
// }

export default function Game() {
	const turn = useGame((state) => state.turn)
	const { data: session } = useSession()

	return (
		<div className='flex items-center justify-center gap-6 h-full'>
			<div className={cn('flex flex-col gap-3', turn === 'w' ? '' : 'flex-col-reverse')}>
				<div className='flex gap-2'>
					<Avatar className='rounded'>
						<AvatarImage alt='@shadcn' src='https://github.com/shadcn.png' />
						<AvatarFallback className='rounded'>CN</AvatarFallback>
					</Avatar>
					<div className='grid flex-1 text-left text-sm leading-tight'>
						<span className='truncate font-medium'>Филиппок</span>
					</div>
				</div>
				<Board />
				<div className='flex gap-2'>
					<Avatar className='rounded'>
						<AvatarImage alt={session?.user?.name ?? ''} src={session?.user?.image ?? ''} />
						<AvatarFallback className='rounded'>{session?.user?.name}</AvatarFallback>
					</Avatar>
					<div className='grid flex-1 text-left text-sm leading-tight'>
						<span className='truncate font-medium'>{session?.user?.name}</span>
					</div>
				</div>
			</div>
			<InfoGame />
		</div>
	)
}
