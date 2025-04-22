'use client'

import { useSession } from 'next-auth/react'

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/shared/ui/sidebar'

export const NavUser = () => {
	const { data: session } = useSession()
	console.log(session)
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<SidebarMenuButton
					className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
					size='lg'
				>
					<Avatar className='h-8 w-8 rounded-lg'>
						<AvatarImage alt={session?.user?.name ?? ''} src={session?.user?.image ?? ''} />
						<AvatarFallback className='rounded-lg'>{session?.user?.name}</AvatarFallback>
					</Avatar>
					<div className='grid flex-1 text-left text-sm leading-tight'>
						<span className='truncate font-medium'>{session?.user?.name}</span>
						<span className='truncate text-xs text-muted-foreground'>{session?.user?.email}</span>
					</div>
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
