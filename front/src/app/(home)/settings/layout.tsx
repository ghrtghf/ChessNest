'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { PAGES } from '@/shared/constants'
import { Button } from '@/shared/ui/button'
import { cn } from '@/shared/utils/cn'

const items = [
	{ label: 'Доска и фигуры', url: PAGES.settings },
	{ label: 'Профиль', url: PAGES.profile }
]

export default function LayoutSetting({ children }: { children: ReactNode }) {
	const pathname = usePathname()

	const isActive = (url: string) => pathname === url

	return (
		<div className='py-4 md:gap-6 md:py-6 px-4 lg:px-6  h-full'>
			<div className='grid grid-cols-10 gap-8 h-full rounded-xl py-6 pr-6'>
				<div className='flex flex-col col-span-3 border-r-2 border-sidebar-border'>
					{items.map((item, index) => {
						const active = isActive(item.url)
						return (
							<Button
								key={item.url}
								variant={active ? 'secondary' : 'ghost'}
								className={cn(
									'h-14',
									active ? 'border-r-4 border-black' : '',
									index === 0 ? 'rounded-r-none rounded-bl-none' : '',
									index !== 0 ? 'rounded-none' : '',
									index === items.length - 1 ? 'rounded-r-none rounded-tl-none' : ''
								)}
							>
								<Link href={item.url}>{item.label}</Link>
							</Button>
						)
					})}
				</div>
				<div className='col-span-7'>{children}</div>
			</div>
		</div>
	)
}
