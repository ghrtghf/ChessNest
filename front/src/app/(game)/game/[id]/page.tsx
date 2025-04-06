'use client'

import { useEffect, useLayoutEffect } from 'react'
import type { Metadata } from 'next'
import { useParams } from 'next/navigation'

import { Board } from '@/widgets/board'
import { InfoGame } from '@/widgets/info-game'

// export const metadata: Metadata = {
// 	title: 'Играть против друга | Knight.com',
// 	description: 'Chess'
// }

export default function Game() {
	// const { id } = useParams() as { id: string }

	return (
		<div className='flex items-center justify-center gap-6'>
			<Board />
			<InfoGame />
		</div>
	)
}
