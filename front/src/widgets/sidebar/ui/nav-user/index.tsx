'use client'

import { LogOutIcon } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/shared/ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/shared/ui/sidebar'

export const NavUser = () => {
	const { data: session } = useSession()
	const { isMobile } = useSidebar()

	console.log(session)

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
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
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
						side={isMobile ? 'bottom' : 'right'}
						align='end'
						sideOffset={4}
					>
						<DropdownMenuLabel className='p-0 font-normal'>
							<div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
								<Avatar className='h-8 w-8 rounded-lg'>
									<AvatarImage src={session?.user?.image ?? ''} alt={session?.user?.name ?? ''} />
									<AvatarFallback className='rounded-lg'>CN</AvatarFallback>
								</Avatar>
								<div className='grid flex-1 text-left text-sm leading-tight'>
									<span className='truncate font-medium'>{session?.user?.name}</span>
									<span className='truncate text-xs text-muted-foreground'>{session?.user?.email}</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={() => signOut()}>
							<LogOutIcon />
							Выйти
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
