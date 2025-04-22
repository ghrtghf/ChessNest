'use client'

import type { LucideIcon } from 'lucide-react'

import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/shared/ui/sidebar'

export const NavMain = ({
	items
}: {
	items: {
		title: string
		url: string
		icon?: LucideIcon
	}[]
}) => (
	<SidebarGroup>
		<SidebarGroupContent className='flex flex-col gap-2'>
			<SidebarMenu>
				{items.map((item) => (
					<SidebarMenuItem key={item.title}>
						<SidebarMenuButton tooltip={item.title}>
							{item.icon && <item.icon />}
							<span>{item.title}</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroupContent>
	</SidebarGroup>
)
