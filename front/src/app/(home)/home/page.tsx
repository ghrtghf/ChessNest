'use client'

import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { v4 } from 'uuid'

import { PAGES } from '@/shared/constants'
import { useGame } from '@/shared/store'
import { myColor, useWebsocket } from '@/shared/store/websocket'
import { Button } from '@/shared/ui/button'

// export const metadata: Metadata = {
// 	title: 'Главная | Knight.com',
// 	description: 'Chess'
// }

export default function Home() {
	const router = useRouter()
	const [shouldConnect, setShouldConnect] = useState(false)

	const setWebsocket = useWebsocket((state) => state.setWebsocket)
	const setMyColor = useGame((state) => state.setMyColor)
	const setIdRoom = useWebsocket((state) => state.setIdRoom)

	const setReceivedPosition = useGame((state) => state.setReceivedPosition)

	// const setReceivedPosition = useGame((state) => state.setReceivedPosition)
	const setPlayerBlackId = useWebsocket((state) => state.setPlayerBlackId)
	const setPlayerWhiteId = useWebsocket((state) => state.setPlayerWhiteId)

	useEffect(() => {
		if (!shouldConnect) return

		const socket = new WebSocket(`ws://localhost:8080/ws?gameId=abc123`)
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

			const data = JSON.parse(event.data)

			if (data.type === 'init') {
				setIdRoom(data.data.id)
				setMyColor(data.data.color)
				setPlayerBlackId(data.data.rating)
				setPlayerWhiteId(data.data.rating)
			} else if (data.type === 'move') {
				console.log(data.data[data.data.length - 1])
				setReceivedPosition(data.data[data.data.length - 1])
				// useGame.setState((positions) => ({ currentPosition: [...positions.currentPosition, data.data[data.data - 1]] }))
			} else if (data.type === 'game_start') {
				console.log(useWebsocket.getState().idRoom)

				router.push(`/game/${useWebsocket.getState().idRoom}`)
			}
			// myColor()
		}

		socket.onclose = () => {
			console.log('WebSocket закрыт')
		}

		socket.onerror = (error) => {
			console.error('Ошибка WebSocket:', error)
		}
	}, [shouldConnect])

	const handleOnlineGame = () => {
		setShouldConnect(true)
	}

	return (
		<div className='flex flex-col items-center justify-center h-full gap-6'>
			<Button className='w-[250px] h-[60px]' onClick={handleOnlineGame}>
				{/* {loading && <Loader2 className='animate-spin' />} */}
				Играть по сети
			</Button>
			<Button className='w-[250px] h-[60px]' asChild>
				{/* {loading && <Loader2 className='animate-spin' />} */}
				<Link href={`${PAGES.game}/123`}>Играть на одном пк</Link>
			</Button>
		</div>
	)
}
