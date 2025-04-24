import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Logo } from '@/shared/assets/svg/logo'
import { PAGES } from '@/shared/constants'

export default function LayoutHome({ children }: { children: ReactNode }) {
	return (
		<div className='grid min-h-svh lg:grid-cols-2'>
			<div className='flex flex-col gap-4 p-6 md:p-10'>
				<div className='flex justify-center gap-2 md:justify-start'>
					<Link className='flex items-center gap-2 font-medium' href={PAGES.login}>
						<Logo height='24px' width='24px' />
						Knight.com
					</Link>
				</div>
				<div className='flex flex-1 items-center justify-center'>
					<div className='w-full max-w-xs'>{children}</div>
				</div>
			</div>
			<div className='relative hidden bg-muted lg:block'>
				<Image
					alt='play-chess'
					className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inset-0 object-cover dark:brightness-[0.2] dark:grayscale rounded-lg'
					height={500}
					src='/login_play.gif'
					width={500}
					priority
					unoptimized={true}
				/>
			</div>
		</div>
	)
}
