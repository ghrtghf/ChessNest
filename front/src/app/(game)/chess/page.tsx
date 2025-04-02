import type { Metadata } from 'next'

import { Board } from '@/widgets/board'

export const metadata: Metadata = {
	title: 'Играть против друга | Pawn.com',
	description: 'Chess'
}

export default function Chess() {
	return <Board />
}
