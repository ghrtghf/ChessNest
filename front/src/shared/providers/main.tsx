'use client'

import type { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'

import { TanstackQueryProvider, ThemeProvider, ToastProvider } from './index'

export function MainProvider({ children }: { children: ReactNode }) {
	return (
		<SessionProvider>
			<TanstackQueryProvider>
				<ThemeProvider attribute='class' defaultTheme='light' disableTransitionOnChange>
					<ToastProvider />
					{children}
				</ThemeProvider>
			</TanstackQueryProvider>
		</SessionProvider>
	)
}
