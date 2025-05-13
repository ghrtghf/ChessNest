'use client'

import * as React from 'react'
import { BarChartIcon, LayoutDashboardIcon, Pen, SearchIcon, SettingsIcon, StickyNote } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

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
		},
		{
			title: 'Шахматные статьи',
			url: PAGES.posts,
			icon: StickyNote
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
		},
		{
			title: 'Создание статьи',
			url: PAGES.createPost,
			icon: Pen
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
			<NavUser />
		</SidebarFooter>
	</Sidebar>
)
