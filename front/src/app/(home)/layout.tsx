// import data from './data.json'

import type { ReactNode } from 'react'

import { SidebarInset, SidebarProvider } from '@/shared/ui/sidebar'
import { AppSidebar } from '@/widgets/sidebar'
import { SiteHeader } from '@/widgets/sidebar/ui/header'

export default function LayoutHome({ children }: { children: ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebar variant='inset' />
			<SidebarInset>
				<SiteHeader />
				<div className='flex flex-1 flex-col'>
					<div className='@container/main flex flex-1 flex-col gap-2'>
						{children}
						{/* <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
							<div className='px-4 lg:px-6'>
								<ChartAreaInteractive />
							</div>
						</div> */}
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
