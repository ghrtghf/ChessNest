'use client'

import { useEffect, useState } from 'react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import { useIsMobile } from '@/shared/hooks/use-mobile'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import type { ChartConfig } from '@/shared/ui/chart'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/shared/ui/chart'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { ToggleGroup, ToggleGroupItem } from '@/shared/ui/toggle-group'

const chartData = [
	{ date: '2024-04-01', my_own: 222, mobile: 150 },
	{ date: '2024-04-02', my_own: 97, mobile: 180 },
	{ date: '2024-04-03', my_own: 167, mobile: 120 },
	{ date: '2024-04-04', my_own: 242, mobile: 260 },
	{ date: '2024-04-05', my_own: 373, mobile: 290 },
	{ date: '2024-04-06', my_own: 301, mobile: 340 },
	{ date: '2024-04-07', my_own: 245, mobile: 180 },
	{ date: '2024-04-08', my_own: 409, mobile: 320 },
	{ date: '2024-04-09', my_own: 59, mobile: 110 },
	{ date: '2024-04-10', my_own: 261, mobile: 190 },
	{ date: '2024-04-11', my_own: 327, mobile: 350 },
	{ date: '2024-04-12', my_own: 292, mobile: 210 },
	{ date: '2024-04-13', my_own: 342, mobile: 380 },
	{ date: '2024-04-14', my_own: 137, mobile: 220 },
	{ date: '2024-04-15', my_own: 120, mobile: 170 },
	{ date: '2024-04-16', my_own: 138, mobile: 190 },
	{ date: '2024-04-17', my_own: 446, mobile: 360 },
	{ date: '2024-04-18', my_own: 364, mobile: 410 },
	{ date: '2024-04-19', my_own: 243, mobile: 180 },
	{ date: '2024-04-20', my_own: 89, mobile: 150 },
	{ date: '2024-04-21', my_own: 137, mobile: 200 },
	{ date: '2024-04-22', my_own: 224, mobile: 170 },
	{ date: '2024-04-23', my_own: 138, mobile: 230 },
	{ date: '2024-04-24', my_own: 387, mobile: 290 },
	{ date: '2024-04-25', my_own: 215, mobile: 250 },
	{ date: '2024-04-26', my_own: 75, mobile: 130 },
	{ date: '2024-04-27', my_own: 383, mobile: 420 },
	{ date: '2024-04-28', my_own: 122, mobile: 180 },
	{ date: '2024-04-29', my_own: 315, mobile: 240 },
	{ date: '2024-04-30', my_own: 454, mobile: 380 },
	{ date: '2024-05-01', my_own: 165, mobile: 220 },
	{ date: '2024-05-02', my_own: 293, mobile: 310 },
	{ date: '2024-05-03', my_own: 247, mobile: 190 },
	{ date: '2024-05-04', my_own: 385, mobile: 420 },
	{ date: '2024-05-05', my_own: 481, mobile: 390 },
	{ date: '2024-05-06', my_own: 498, mobile: 520 },
	{ date: '2024-05-07', my_own: 388, mobile: 300 },
	{ date: '2024-05-08', my_own: 149, mobile: 210 },
	{ date: '2024-05-09', my_own: 227, mobile: 180 },
	{ date: '2024-05-10', my_own: 293, mobile: 330 },
	{ date: '2024-05-11', my_own: 335, mobile: 270 },
	{ date: '2024-05-12', my_own: 197, mobile: 240 },
	{ date: '2024-05-13', my_own: 197, mobile: 160 },
	{ date: '2024-05-14', my_own: 448, mobile: 490 },
	{ date: '2024-05-15', my_own: 473, mobile: 380 },
	{ date: '2024-05-16', my_own: 338, mobile: 400 },
	{ date: '2024-05-17', my_own: 499, mobile: 420 },
	{ date: '2024-05-18', my_own: 315, mobile: 350 },
	{ date: '2024-05-19', my_own: 235, mobile: 180 },
	{ date: '2024-05-20', my_own: 177, mobile: 230 },
	{ date: '2024-05-21', my_own: 82, mobile: 140 },
	{ date: '2024-05-22', my_own: 81, mobile: 120 },
	{ date: '2024-05-23', my_own: 252, mobile: 290 },
	{ date: '2024-05-24', my_own: 294, mobile: 220 },
	{ date: '2024-05-25', my_own: 201, mobile: 250 },
	{ date: '2024-05-26', my_own: 213, mobile: 170 },
	{ date: '2024-05-27', my_own: 420, mobile: 460 },
	{ date: '2024-05-28', my_own: 233, mobile: 190 },
	{ date: '2024-05-29', my_own: 78, mobile: 130 },
	{ date: '2024-05-30', my_own: 340, mobile: 280 },
	{ date: '2024-05-31', my_own: 178, mobile: 230 },
	{ date: '2024-06-01', my_own: 178, mobile: 200 },
	{ date: '2024-06-02', my_own: 470, mobile: 410 },
	{ date: '2024-06-03', my_own: 103, mobile: 160 },
	{ date: '2024-06-04', my_own: 439, mobile: 380 },
	{ date: '2024-06-05', my_own: 88, mobile: 140 },
	{ date: '2024-06-06', my_own: 294, mobile: 250 },
	{ date: '2024-06-07', my_own: 323, mobile: 370 },
	{ date: '2024-06-08', my_own: 385, mobile: 320 },
	{ date: '2024-06-09', my_own: 438, mobile: 480 },
	{ date: '2024-06-10', my_own: 155, mobile: 200 },
	{ date: '2024-06-11', my_own: 92, mobile: 150 },
	{ date: '2024-06-12', my_own: 492, mobile: 420 },
	{ date: '2024-06-13', my_own: 81, mobile: 130 },
	{ date: '2024-06-14', my_own: 426, mobile: 380 },
	{ date: '2024-06-15', my_own: 307, mobile: 350 },
	{ date: '2024-06-16', my_own: 371, mobile: 310 },
	{ date: '2024-06-17', my_own: 475, mobile: 520 },
	{ date: '2024-06-18', my_own: 107, mobile: 170 },
	{ date: '2024-06-19', my_own: 341, mobile: 290 },
	{ date: '2024-06-20', my_own: 408, mobile: 450 },
	{ date: '2024-06-21', my_own: 169, mobile: 210 },
	{ date: '2024-06-22', my_own: 317, mobile: 270 },
	{ date: '2024-06-23', my_own: 480, mobile: 530 },
	{ date: '2024-06-24', my_own: 132, mobile: 180 },
	{ date: '2024-06-25', my_own: 141, mobile: 190 },
	{ date: '2024-06-26', my_own: 434, mobile: 380 },
	{ date: '2024-06-27', my_own: 448, mobile: 490 },
	{ date: '2024-06-28', my_own: 149, mobile: 200 },
	{ date: '2024-06-29', my_own: 103, mobile: 160 },
	{ date: '2024-06-30', my_own: 446, mobile: 400 }
]

const chartConfig = {
	rating: {
		label: 'Рейтинг'
	},
	my_own: {
		label: 'Afpia',
		color: 'hsl(var(--chart-1))'
	}
	// mobile: {
	// 	label: 'Mobile',
	// 	color: 'hsl(var(--chart-2))'
	// }
} satisfies ChartConfig

export const ChartAreaStats = () => {
	const isMobile = useIsMobile()
	const [timeRange, setTimeRange] = useState('30d')

	useEffect(() => {
		if (isMobile) {
			setTimeRange('7d')
		}
	}, [isMobile])

	const filteredData = chartData.filter((item) => {
		const date = new Date(item.date)
		const referenceDate = new Date('2024-06-30')

		let daysToSubtract = 90

		if (timeRange === '30d') {
			daysToSubtract = 30
		} else if (timeRange === '7d') {
			daysToSubtract = 7
		}

		const startDate = new Date(referenceDate)
		startDate.setDate(startDate.getDate() - daysToSubtract)

		return date >= startDate
	})

	return (
		<Card className='@container/card'>
			<CardHeader className='relative'>
				<CardTitle>Рейтинг</CardTitle>
				<CardDescription>
					<span className='@[540px]/card:block hidden'>Всего за последние 3 месяца</span>
					<span className='@[540px]/card:hidden'>Последние 3 месяца</span>
				</CardDescription>
				<div className='absolute right-4 top-4'>
					<ToggleGroup
						className='@[767px]/card:flex hidden'
						type='single'
						value={timeRange}
						variant='outline'
						onValueChange={setTimeRange}
					>
						<ToggleGroupItem className='h-8 px-2.5' value='90d'>
							Последние 3 месяца
						</ToggleGroupItem>
						<ToggleGroupItem className='h-8 px-2.5' value='30d'>
							Последние 30 дней
						</ToggleGroupItem>
						<ToggleGroupItem className='h-8 px-2.5' value='7d'>
							Последние 7 дней
						</ToggleGroupItem>
					</ToggleGroup>
					<Select value={timeRange} onValueChange={setTimeRange}>
						<SelectTrigger aria-label='Select a value' className='@[767px]/card:hidden flex w-50'>
							<SelectValue placeholder='Last 3 months' />
						</SelectTrigger>
						<SelectContent className='rounded-xl'>
							<SelectItem className='rounded-lg' value='90d'>
								Последние 3 месяца
							</SelectItem>
							<SelectItem className='rounded-lg' value='30d'>
								Последние 30 дней
							</SelectItem>
							<SelectItem className='rounded-lg' value='7d'>
								Последние 7 дней
							</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</CardHeader>
			<CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
				<ChartContainer className='aspect-auto h-[250px] w-full' config={chartConfig}>
					<AreaChart data={filteredData}>
						<defs>
							<linearGradient id='fillMyOwn' x1='0' x2='0' y1='0' y2='1'>
								<stop offset='5%' stopColor='var(--color-my_own)' stopOpacity={1.0} />
								<stop offset='95%' stopColor='var(--color-my_own)' stopOpacity={0.1} />
							</linearGradient>
							{/* <linearGradient id='fillMobile' x1='0' y1='0' x2='0' y2='1'>
								<stop offset='5%' stopColor='var(--color-mobile)' stopOpacity={0.8} />
								<stop offset='95%' stopColor='var(--color-mobile)' stopOpacity={0.1} />
							</linearGradient> */}
						</defs>
						<CartesianGrid vertical={false} />
						<XAxis
							axisLine={false}
							dataKey='date'
							minTickGap={32}
							tickLine={false}
							tickMargin={8}
							tickFormatter={(value) => {
								const date = new Date(value)
								return date.toLocaleDateString('ru-RU', {
									month: 'short',
									day: 'numeric'
								})
							}}
						/>
						<ChartTooltip
							content={
								<ChartTooltipContent
									indicator='dot'
									labelFormatter={(value) =>
										new Date(value).toLocaleDateString('ru-RU', {
											month: 'short',
											day: 'numeric'
										})
									}
								/>
							}
							cursor={false}
						/>
						{/* <Area dataKey='mobile' type='natural' fill='url(#fillMobile)' stroke='var(--color-mobile)' stackId='a' /> */}
						<Area dataKey='my_own' fill='url(#fillMyOwn)' stackId='a' type='natural' stroke='var(--color-my_own)' />
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
