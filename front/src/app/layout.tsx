import { Ubuntu } from 'next/font/google'

import '../shared/styles/globals.css'
import '../shared/styles/pieces.css'

const ubuntu = Ubuntu({
	variable: '--font-ubuntu',
	weight: ['400', '500', '700'],
	subsets: ['latin', 'cyrillic']
})

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html className='dark' lang='en'>
			<body className={`${ubuntu.variable} antialiased`}>{children}</body>
		</html>
	)
}
