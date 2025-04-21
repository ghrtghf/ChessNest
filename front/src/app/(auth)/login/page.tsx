import { GalleryVerticalEnd } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { LoginForm } from '@/entities/login-form'

export const metadata: Metadata = {
	title: 'Авторизация'
}

export default function LoginPage() {
	return (
		<div className='grid min-h-svh lg:grid-cols-2'>
			<div className='flex flex-col gap-4 p-6 md:p-10'>
				<div className='flex justify-center gap-2 md:justify-start'>
					<Link className='flex items-center gap-2 font-medium' href='#'>
						<div className='flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground'>
							<GalleryVerticalEnd className='size-4' />
						</div>
						Knight.com
					</Link>
				</div>
				<div className='flex flex-1 items-center justify-center'>
					<div className='w-full max-w-xs'>
						<LoginForm />
					</div>
				</div>
			</div>
			<div className='relative hidden bg-muted lg:block'>
				<Image
					alt='Image'
					className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inset-0 object-cover dark:brightness-[0.2] dark:grayscale rounded-lg'
					height={500}
					src='/login_play.gif'
					width={500}
					priority
				/>
			</div>
		</div>
	)
}
