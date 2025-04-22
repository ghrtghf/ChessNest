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
						<svg height='24px' width='24px' version='1.1' viewBox='0 0 16 16'>
							<g id='surface1'>
								<path
									d='M 2.75 0.0976562 C 2.285156 0.144531 1.769531 0.335938 1.355469 0.617188 C 0.917969 0.914062 0.472656 1.476562 0.28125 1.976562 C 0.0625 2.539062 0.078125 2.058594 0.078125 8 C 0.078125 13.015625 0.0820312 13.371094 0.132812 13.574219 C 0.273438 14.132812 0.53125 14.59375 0.917969 14.992188 C 1.207031 15.289062 1.476562 15.480469 1.851562 15.652344 C 2.414062 15.914062 1.867188 15.890625 7.984375 15.890625 L 13.421875 15.890625 L 13.671875 15.824219 C 14.742188 15.539062 15.585938 14.664062 15.828125 13.601562 L 15.90625 13.265625 L 15.90625 8.015625 C 15.90625 2.367188 15.914062 2.574219 15.75 2.089844 C 15.445312 1.179688 14.617188 0.417969 13.667969 0.171875 C 13.566406 0.148438 13.359375 0.109375 13.210938 0.09375 C 12.902344 0.0585938 3.089844 0.0585938 2.75 0.0976562 Z M 12.6875 2.671875 C 12.6875 2.679688 12.460938 2.949219 12.179688 3.269531 L 11.671875 3.851562 L 11.65625 6.507812 L 11.640625 9.160156 L 10.53125 9.160156 L 9.421875 9.15625 L 6.867188 6.578125 L 8.890625 6.5625 L 9.46875 7.140625 C 9.875 7.546875 10.070312 7.71875 10.117188 7.71875 L 10.1875 7.71875 L 10.1875 4.09375 L 9.332031 4.09375 C 8.617188 4.09375 8.414062 4.101562 8.113281 4.15625 C 7.292969 4.296875 6.523438 4.703125 5.929688 5.304688 C 5.558594 5.679688 5.304688 6.03125 5.117188 6.421875 L 5.03125 6.609375 L 11.765625 13.34375 L 3.246094 13.34375 L 3.257812 10.507812 C 3.269531 7.746094 3.273438 7.664062 3.335938 7.289062 C 3.660156 5.484375 4.800781 3.984375 6.453125 3.1875 C 6.953125 2.945312 7.679688 2.726562 8.15625 2.679688 C 8.324219 2.660156 12.6875 2.652344 12.6875 2.671875 Z M 12.6875 2.671875 '
									style={{
										stroke: 'none',
										fillRule: 'nonzero',
										fill: 'rgb(0%,0%,0%)',
										fillOpacity: 1
									}}
								/>
								<path
									d='M 4.6875 10.125 L 4.6875 11.90625 L 8.296875 11.90625 L 6.515625 10.125 C 5.539062 9.144531 4.726562 8.34375 4.710938 8.34375 C 4.695312 8.34375 4.6875 9.144531 4.6875 10.125 Z M 4.6875 10.125 '
									style={{
										stroke: 'none',
										fillRule: 'nonzero',
										fill: 'rgb(0%,0%,0%)',
										fillOpacity: 1
									}}
								/>
							</g>
						</svg>
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
