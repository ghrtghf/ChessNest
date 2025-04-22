'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/shared/ui/sidebar'

export const NavUser = ({
	user
}: {
	user: {
		name: string
		email: string
		avatar: string
	}
}) => (
	<SidebarMenu>
		<SidebarMenuItem>
			<SidebarMenuButton
				className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
				size='lg'
			>
				<Avatar className='h-8 w-8 rounded-lg grayscale'>
					<AvatarImage alt={user.name} src={user.avatar} />
					<AvatarFallback className='rounded-lg'>{user.name}</AvatarFallback>
				</Avatar>
				<div className='grid flex-1 text-left text-sm leading-tight'>
					<span className='truncate font-medium'>{user.name}</span>
					<span className='truncate text-xs text-muted-foreground'>{user.email}</span>
				</div>
			</SidebarMenuButton>
		</SidebarMenuItem>
	</SidebarMenu>
)
