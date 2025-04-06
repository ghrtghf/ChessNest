'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import type { Metadata } from 'next'
import { useRouter } from 'next/navigation'
import { v4 } from 'uuid'

import { myColor, useWebsocket } from '@/shared/store/websocket'
import { Button } from '@/shared/ui/button'

// export const metadata: Metadata = {
// 	title: 'Главная | Knight.com',
// 	description: 'Chess'
// }

export default function Home() {
	const router = useRouter()
	const [loading, setLoading] = useState(false)

	const setWebsocket = useWebsocket((state) => state.setWebsocket)
	const setIdRoom = useWebsocket((state) => state.setIdRoom)
	const setPlayerBlackId = useWebsocket((state) => state.setPlayerBlackId)
	const setPlayerWhiteId = useWebsocket((state) => state.setPlayerWhiteId)

	const idRoom = useWebsocket((state) => state.idRoom)

	const handleOnlineGame = () => {
		setLoading(true)
		const socket = new WebSocket(`ws://localhost:6001/games`)
		const userId = v4()

		socket.onopen = () => {
			console.log('WebSocket открыт')
			setWebsocket(socket)
			localStorage.setItem('idUser', userId)
			socket.send(
				JSON.stringify({
					id: userId
				})
			)
		}

		socket.onmessage = (event) => {
			console.log('Сообщение от сервера:', event.data)
			setIdRoom(event.data.game.id)
			setPlayerBlackId(event.data.game.player_black_id)
			setPlayerWhiteId(event.data.game.player_white_id)

			myColor()
		}

		socket.onclose = () => {
			console.log('WebSocket закрыт')
		}

		socket.onerror = (error) => {
			console.error('Ошибка WebSocket:', error)
		}

		if (idRoom) {
			router.push(`/game/${idRoom}`)
		}
		setLoading(false)
	}

	return (
		<div className='flex flex-col items-center justify-center h-screen gap-6'>
			<Button className='w-[250px] h-[60px]' disabled={loading} onClick={handleOnlineGame}>
				{loading && <Loader2 className='animate-spin' />}
				Играть по сети
			</Button>
			<Button className='w-[250px] h-[60px]' disabled={loading}>
				{loading && <Loader2 className='animate-spin' />}
				Играть на одном пк
			</Button>
		</div>
	)
}
