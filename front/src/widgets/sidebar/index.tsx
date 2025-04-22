'use client'

import * as React from 'react'
import { BarChartIcon, LayoutDashboardIcon, SearchIcon, SettingsIcon } from 'lucide-react'
import Link from 'next/link'

import { Logo } from '@/shared/assets/svg/logo'
import { PAGES } from '@/shared/constants'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from '@/shared/ui/sidebar'

import { NavMain, NavSecondary, NavUser } from './ui'

const data = {
	user: {
		name: 'shadcn',
		email: 'm@example.com',
		avatar: '/avatars/shadcn.jpg'
	},
	navMain: [
		{
			title: 'Главная',
			url: PAGES.home,
			icon: LayoutDashboardIcon
		},
		{
			title: 'Статистика',
			url: PAGES.stats,
			icon: BarChartIcon
		}
	],
	navSecondary: [
		{
			title: 'Настройки',
			url: PAGES.settings,
			icon: SettingsIcon
		},
		{
			title: 'Найти друга',
			url: PAGES.search,
			icon: SearchIcon
		}
	]
}

export const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => (
	<Sidebar collapsible='offcanvas' {...props}>
		<SidebarHeader>
			<SidebarMenu>
				<SidebarMenuItem>
					<SidebarMenuButton className='data-[slot=sidebar-menu-button]:!p-1.5' asChild>
						<Link href={PAGES.home}>
							<Logo />
							<span className='text-base font-semibold'>Knight.com</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarHeader>
		<SidebarContent>
			<NavMain items={data.navMain} />
			<NavSecondary className='mt-auto' items={data.navSecondary} />
		</SidebarContent>
		<SidebarFooter>
			<NavUser user={data.user} />
		</SidebarFooter>
	</Sidebar>
)
