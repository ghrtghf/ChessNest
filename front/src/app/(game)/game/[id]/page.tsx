import type { Metadata } from 'next'

import { useWebsocket } from '@/shared/store/websocket'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { Board } from '@/widgets/board'
import { InfoGame } from '@/widgets/info-game'

export const metadata: Metadata = {
	title: 'Игра с другом | Knight.com',
	description: 'Chess'
}

export default function Game() {
	return (
		<div className='flex items-center justify-center gap-6 h-full'>
			<div className='flex flex-col gap-3'>
				<div className='flex gap-2'>
					<Avatar className='rounded'>
						<AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
						<AvatarFallback className='rounded'>CN</AvatarFallback>
					</Avatar>
					<div className='grid flex-1 text-left text-sm leading-tight'>
						<span className='truncate font-medium'>Afpia</span>
					</div>
				</div>
				<Board />
				<div className='flex gap-2'>
					<Avatar className='rounded'>
						<AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
						<AvatarFallback className='rounded'>CN</AvatarFallback>
					</Avatar>
					<div className='grid flex-1 text-left text-sm leading-tight'>
						<span className='truncate font-medium'>Afpia</span>
					</div>
				</div>
			</div>
			<InfoGame />
		</div>
	)
}
