'use client'

// eslint-disable-next-line simple-import-sort/imports
import { useState } from 'react'
import { CircleCheckBig } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'

import { Piece } from '@/entities/piece'
import { PRESETS } from '@/shared/constants'
import { useCustomBoard, useSelectTheme, type TypeThemeBoard } from '@/shared/store'
import { Button } from '@/shared/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'
import { cn } from '@/shared/utils/cn'

// export const metadata: Metadata = {
// 	title: 'Настройки доски'
// }

const boardSetup = [
	['bp', 'bb', 'bq'],
	['', '', ''],
	['wn', 'wk', 'wr']
]

export default function Board() {
	const selectedTheme = useSelectTheme((stateGame) => stateGame.selectedTheme)
	const setSelectedTheme = useSelectTheme((stateGame) => stateGame.setSelectedTheme)

	const [selectedBoard, setSelectedBoard] = useState<TypeThemeBoard | null>(null)
	const [selectedPieces, setSelectedPieces] = useState<TypeThemeBoard | null>(null)

	const onSelectPresetBoard = (presetId: TypeThemeBoard) => {
		const preset = PRESETS.find((p) => p.id === presetId)

		if (preset) {
			setSelectedBoard(preset.id)
		}
	}

	console.log(selectedTheme, selectedPieces)

	const onSelectPresetPieces = (presetId: TypeThemeBoard) => {
		const preset = PRESETS.find((p) => p.id === presetId)

		if (preset) {
			setSelectedPieces(preset.id)
		}
	}

	const onSavePresetBoard = () => {
		if (selectedBoard) {
			setSelectedTheme({ board: selectedBoard })
			setSelectedBoard(null)
		}
	}

	const onSavePresetPieces = () => {
		if (selectedPieces) {
			setSelectedTheme({ figures: selectedPieces })
			setSelectedPieces(null)
		}
	}

	return (
		<>
			<h1 className='scroll-m-20 text-2xl font-bold tracking-tight'>Доска и фигуры</h1>
			<p className='leading-7 mb-6'>Настроить внешний вид своих шахмат.</p>
			<div className='flex w-full gap-6 justify-between'>
				<Tabs
					className='w-[400px]'
					defaultValue='boards'
					onValueChange={() => {
						setSelectedBoard(null)
						setSelectedPieces(null)
					}}
				>
					<TabsList className='grid w-full grid-cols-2'>
						<TabsTrigger className='' value='boards'>
							Доски
						</TabsTrigger>
						<TabsTrigger className='' value='figures'>
							Фигуры
						</TabsTrigger>
					</TabsList>
					<TabsContent value='boards'>
						<div className='grid grid-cols-6 grid-rows-3 gap-[5px]'>
							{PRESETS.map((preset) => {
								const isActive = preset.id === (selectedBoard ?? selectedTheme.board)
								return (
									<div
										key={preset.id}
										className={cn(
											`relative rounded-sm border-2 border-transparent transition cursor-pointer`,
											isActive ? 'border-black border-2' : ''
										)}
										onClick={() => onSelectPresetBoard(preset.id)}
									>
										<Image
											alt={preset.id}
											className={cn('rounded-sm', isActive && 'opacity-50')}
											height={60}
											src={preset.srcBoard}
											width={60}
										/>
										{isActive && (
											<span className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2  text-black w-6 h-6'>
												<CircleCheckBig className='w-6 h-6' />
											</span>
										)}
									</div>
								)
							})}
						</div>
						<div className='flex gap-2 justify-end'>
							<Button
								disabled={Boolean(!selectedBoard) || selectedBoard === selectedTheme.board}
								variant='secondary'
								onClick={() => setSelectedBoard(null)}
							>
								Отмена
							</Button>
							<Button disabled={Boolean(!selectedBoard) || selectedBoard === selectedTheme.board} onClick={onSavePresetBoard}>
								Сохранить
							</Button>
						</div>
					</TabsContent>
					<TabsContent value='figures'>
						<div className='grid grid-cols-6 grid-rows-3 gap-[5px]'>
							{PRESETS.filter((p) => p.srcPieces).map((preset) => {
								const isActive = preset.id === (selectedPieces ?? selectedTheme.figures)
								return (
									<div
										key={preset.id}
										className={cn(
											`relative rounded-sm border-2 border-transparent transition cursor-pointer`,
											isActive ? 'border-black border-2' : ''
										)}
										onClick={() => onSelectPresetPieces(preset.id)}
									>
										<Image
											alt={preset.id}
											className={cn('rounded-sm', isActive && 'opacity-50')}
											height={60}
											src={preset.srcPieces}
											width={60}
										/>
										{isActive && (
											<span className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2  text-black w-6 h-6'>
												<CircleCheckBig className='w-6 h-6' />
											</span>
										)}
									</div>
								)
							})}
						</div>
						<div className='flex gap-2 justify-end'>
							<Button
								disabled={Boolean(!selectedPieces) || selectedPieces === selectedTheme.figures}
								variant='secondary'
								onClick={() => setSelectedPieces(null)}
							>
								Отмена
							</Button>
							<Button
								disabled={Boolean(!selectedPieces) || selectedPieces === selectedTheme.figures}
								onClick={onSavePresetPieces}
							>
								Сохранить
							</Button>
						</div>
					</TabsContent>
				</Tabs>
				<div className='relative' style={{ minWidth: `calc(3 * 80px)`, maxHeight: `calc(3 * 80px)` }}>
					<div
						className='absolute rounded-md overflow-hidden select-none'
						style={{
							minWidth: `calc(3 * 80px)`,
							maxHeight: `calc(3 * 80px)`,
							display: 'grid',
							gridTemplateColumns: `repeat(3, 80px)`,
							gridTemplateRows: `repeat(3, 80px)`
						}}
					>
						{Array.from({ length: 3 }).map((_, y) =>
							// eslint-disable-next-line no-shadow
							Array.from({ length: 3 }).map((_, x) => {
								const row = 3 - y
								const isDark = (row + x) % 2 === 0
								const bgColor = isDark
									? PRESETS.find((p) => p.id === (selectedBoard ?? selectedTheme.board))?.dark
									: PRESETS.find((p) => p.id === (selectedBoard ?? selectedTheme.board))?.light
								return (
									<div
										className='tile relative'
										key={`cell-${y}-${x}`}
										style={{
											backgroundColor: bgColor
											// ...(isChecked && {
											// 	width: '20px',
											// 	height: 20px',
											// 	boxShadow: `inset 0 0 0 3px rgba(255, 215, 0, 0.8)`
											// })
										}}
									/>
								)
							})
						)}
					</div>
					<div className='absolute top-0 left-0 h-full justify-around flex flex-col'>
						{Array.from({ length: 3 })
							.fill(0)
							.map((_, i) => 8 - i)
							.map((number, i) => {
								const isDarkBackground = i % 2 === 0
								const textColor = isDarkBackground
									? PRESETS.find((p) => p.id === (selectedBoard ?? selectedTheme.board))?.dark
									: PRESETS.find((p) => p.id === (selectedBoard ?? selectedTheme.board))?.light

								return (
									<span className={cn('text-[20px]', 'pb-11', 'pl-[6px] select-none')} key={i} style={{ color: textColor }}>
										{number}
									</span>
								)
							})}
					</div>
					{boardSetup.map((row, number) =>
						row.map(
							(code, letter: number) =>
								code && (
									<div
										key={`${number}-${letter}`}
										className={cn(
											PRESETS.find((p) => p.id === (selectedPieces ?? selectedTheme.figures))?.id,
											boardSetup[number][letter],
											'absolute w-[80px] h-[80px] bg-no-repeat bg-[length:100%_100%] touch-none overflow-hidden select-none z-10 [will-change:transform]'
										)}
										style={{
											top: `${number * 33.3333}%`,
											left: `${letter * 33.3333}%`
										}}
									/>
								)
						)
					)}
				</div>
			</div>
		</>
	)
}
