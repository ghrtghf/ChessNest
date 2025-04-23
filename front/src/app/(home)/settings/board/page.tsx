'use client'

// eslint-disable-next-line simple-import-sort/imports
import { useState } from 'react'
import { CircleCheckBig } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'

import { PRESETS } from '@/shared/constants'
import { useCustomBoard, type TypeThemeBoard } from '@/shared/store'
import { Button } from '@/shared/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'
import { cn } from '@/shared/utils/cn'

// export const metadata: Metadata = {
// 	title: 'Настройки доски'
// }

export default function SettingsPage() {
	// const colorDarkTile = useCustomBoard((stateGame) => stateGame.colorDarkTile)
	// const colorLightTile = useCustomBoard((stateGame) => stateGame.colorLightTile)

	// const setColorDarkTile = useCustomBoard((stateGame) => stateGame.setColorDarkTile)
	// const setColorLightTile = useCustomBoard((stateGame) => stateGame.setColorLightTile)

	const selectedTheme = useCustomBoard((stateGame) => stateGame.selectedTheme)
	const setSelectedTheme = useCustomBoard((stateGame) => stateGame.setSelectedTheme)

	const [selected, setSelected] = useState<TypeThemeBoard | null>(null)

	const onSelectPreset = (presetId: TypeThemeBoard) => {
		const preset = PRESETS.find((p) => p.id === presetId)

		if (preset) {
			// setColorDarkTile(preset.dark)
			// setColorLightTile(preset.light)
			setSelected(preset.id)
		}
	}

	const onSavePreset = () => {
		if (selected) {
			setSelectedTheme({ board: selected })
			setSelected(null)
		}
	}

	return (
		<>
			<h1 className='scroll-m-20 text-2xl font-bold tracking-tight'>Доска и фигуры</h1>
			<p className='leading-7 mb-6'>Настроить внешний вид своих шахмат.</p>
			<div className='flex w-full gap-6 justify-between'>
				<Tabs className='w-[400px]' defaultValue='boards'>
					<TabsList className='grid w-full grid-cols-2'>
						<TabsTrigger className='' value='boards'>
							Доски
						</TabsTrigger>
						<TabsTrigger className='' value='figures'>
							Фигуры
						</TabsTrigger>
					</TabsList>
					<TabsContent className='flex flex-col' value='boards'>
						<div className='grid grid-cols-6 grid-rows-3  gap-[5px]'>
							{PRESETS.map((preset) => {
								const isActive = preset.id === (selected ?? selectedTheme.board)
								return (
									<div
										key={preset.id}
										className={cn(
											`relative rounded-sm border-2 border-transparent transition cursor-pointer`,
											isActive ? 'border-black border-2' : ''
										)}
										onClick={() => onSelectPreset(preset.id)}
									>
										<Image
											alt={preset.id}
											className={cn('rounded-sm', isActive && 'opacity-50')}
											height={60}
											src={preset.src}
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
								disabled={Boolean(!selected) || selected === selectedTheme.board}
								variant='secondary'
								onClick={() => setSelected(null)}
							>
								Отмена
							</Button>
							<Button disabled={Boolean(!selected) || selected === selectedTheme.board} onClick={onSavePreset}>
								Сохранить
							</Button>
						</div>
					</TabsContent>
					<TabsContent value='figures'></TabsContent>
				</Tabs>
				<div
					className='rounded-md overflow-hidden select-none'
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
								? PRESETS.find((p) => p.id === (selected ?? selectedTheme.board))?.dark
								: PRESETS.find((p) => p.id === (selected ?? selectedTheme.board))?.light
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
			</div>
		</>
	)
}
