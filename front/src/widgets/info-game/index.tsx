'use client'

import { useGame } from '@/shared/store'

const CurrentColor = {
	w: 'Белые',
	b: 'Черные'
}

export const InfoGame = () => {
	const turn = useGame((stateGame) => stateGame.turn)

	return (
		<div className='flex flex-col w-full'>
			<div className='flex flex-col items-center justify-center h-screen'>
				<h1 className='text-2xl font-bold'>Knight.com</h1>
				<p className='text-gray-500'>Играйте против друга</p>
				{/* eslint-disable-next-line style/jsx-one-expression-per-line */}
				<p className='text-gray-500'>Сейчас ходят: {CurrentColor[turn]}</p>
			</div>
		</div>
	)
}
