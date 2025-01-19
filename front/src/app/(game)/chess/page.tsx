import type { Metadata } from 'next'

import { Board } from './_components'

export const metadata: Metadata = {
	title: 'Шахматы',
	description: 'Chess'
}

export default function Chess() {
	return <Board />
}
