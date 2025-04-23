import type { Metadata } from 'next'

import { ChartAreaStats } from '@/widgets/chart-area-stats'

export const metadata: Metadata = {
	title: 'Статистика'
}

export default function StatsPage() {
	return (
		<div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
			<div className='px-4 lg:px-6'>
				<ChartAreaStats />
			</div>
		</div>
	)
}
