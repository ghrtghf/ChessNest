import type { Metadata } from 'next'

import { useWebsocket } from '@/shared/store/websocket'
import { Board } from '@/widgets/board'
import { InfoGame } from '@/widgets/info-game'

export const metadata: Metadata = {
	title: 'Игра онлайн | Knight.com',
	description: 'Chess'
}

export default function Game() {
	// const { id } = useParams() as { id: string }
	// const idRoom = useWebsocket((state) => state.idRoom)

	// if (id !== idRoom) {
	// 	notFound()
	// }

	return (
		<div className='flex items-center justify-center gap-6'>
			<Board />
			<InfoGame />
		</div>
	)
}
