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
	{ date: '2025-03-01', my_own: 0 },
	{ date: '2025-03-02', my_own: 0 },
	{ date: '2025-03-03', my_own: 0 },
	{ date: '2025-03-04', my_own: 0 },
	{ date: '2025-03-05', my_own: 0 },
	{ date: '2025-03-06', my_own: 0 },
	{ date: '2025-03-07', my_own: 0 },
	{ date: '2025-03-08', my_own: 0 },
	{ date: '2025-03-09', my_own: 0 },
	{ date: '2025-03-10', my_own: 0 },
	{ date: '2025-03-11', my_own: 0 },
	{ date: '2025-03-12', my_own: 0 },
	{ date: '2025-03-13', my_own: 0 },
	{ date: '2025-03-14', my_own: 0 },
	{ date: '2025-03-15', my_own: 0 },
	{ date: '2025-03-16', my_own: 0 },
	{ date: '2025-03-17', my_own: 0 },
	{ date: '2025-03-18', my_own: 0 },
	{ date: '2025-03-19', my_own: 0 },
	{ date: '2025-03-20', my_own: 0 },
	{ date: '2025-03-21', my_own: 0 },
	{ date: '2025-03-22', my_own: 0 },
	{ date: '2025-03-23', my_own: 0 },
	{ date: '2025-03-24', my_own: 0 },
	{ date: '2025-03-25', my_own: 0 },
	{ date: '2025-03-26', my_own: 0 },
	{ date: '2025-03-27', my_own: 0 },
	{ date: '2025-03-28', my_own: 0 },
	{ date: '2025-03-29', my_own: 0 },
	{ date: '2025-03-30', my_own: 0 },
	{ date: '2025-03-31', my_own: 0 },
	{ date: '2025-04-01', my_own: 0 },
	{ date: '2025-04-02', my_own: 0 },
	{ date: '2025-04-03', my_own: 0 },
	{ date: '2025-04-04', my_own: 0 },
	{ date: '2025-04-05', my_own: 0 },
	{ date: '2025-04-06', my_own: 0 },
	{ date: '2025-04-07', my_own: 0 },
	{ date: '2025-04-08', my_own: 0 },
	{ date: '2025-04-09', my_own: 0 },
	{ date: '2025-04-10', my_own: 0 },
	{ date: '2025-04-11', my_own: 0 },
	{ date: '2025-04-12', my_own: 0 },
	{ date: '2025-04-13', my_own: 0 },
	{ date: '2025-04-14', my_own: 0 },
	{ date: '2025-04-15', my_own: 0 },
	{ date: '2025-04-16', my_own: 0 },
	{ date: '2025-04-17', my_own: 0 },
	{ date: '2025-04-18', my_own: 0 },
	{ date: '2025-04-19', my_own: 0 },
	{ date: '2025-04-20', my_own: 0 },
	{ date: '2025-04-21', my_own: 0 },
	{ date: '2025-04-22', my_own: 0 },
	{ date: '2025-04-23', my_own: 0 },
	{ date: '2025-04-24', my_own: 0 },
	{ date: '2025-04-25', my_own: 0 },
	{ date: '2025-04-26', my_own: 0 },
	{ date: '2025-04-27', my_own: 0 },
	{ date: '2025-04-28', my_own: 0 },
	{ date: '2025-04-29', my_own: 0 },
	{ date: '2025-04-30', my_own: 0 },
	{ date: '2025-05-01', my_own: 0 },
	{ date: '2025-05-02', my_own: 0 },
	{ date: '2025-05-03', my_own: 0 },
	{ date: '2025-05-04', my_own: 0 },
	{ date: '2025-05-05', my_own: 0 },
	{ date: '2025-05-06', my_own: 0 },
	{ date: '2025-05-07', my_own: 0 },
	{ date: '2025-05-08', my_own: 0 },
	{ date: '2025-05-09', my_own: 0 },
	{ date: '2025-05-10', my_own: 0 },
	{ date: '2025-05-11', my_own: 0 },
	{ date: '2025-05-12', my_own: 0 },
	{ date: '2025-05-13', my_own: 0 },
	{ date: '2025-05-14', my_own: 1000 }
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
		const referenceDate = new Date('2025-05-14')

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
