import { Ubuntu } from 'next/font/google'

import '../styles/globals.css'

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
		<html lang='en'>
			<body className={`${ubuntu.variable} antialiased`}>{children}</body>
		</html>
	)
}
