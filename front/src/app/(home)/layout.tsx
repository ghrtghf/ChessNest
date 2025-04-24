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
					<div className='@container/main flex flex-1 flex-col gap-2'>{children}</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
