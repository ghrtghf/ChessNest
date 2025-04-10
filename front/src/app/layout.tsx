import type { Metadata } from 'next'
import { Ubuntu } from 'next/font/google'

import { MainProvider } from '@/shared/providers'

import '../shared/styles/globals.css'
import '../shared/styles/pieces.css'

const ubuntu = Ubuntu({
	variable: '--font-ubuntu',
	weight: ['400', '500', '700'],
	subsets: ['latin', 'cyrillic']
})

export const metadata: Metadata = {
	title: {
		absolute: 'Knight.com',
		template: '%s | Knight.com'
	}
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru' suppressHydrationWarning>
			<body className={`${ubuntu.variable} antialiased`}>
				<MainProvider>
					<div className='h-screen w-full'>{children}</div>
				</MainProvider>
			</body>
		</html>
	)
}
