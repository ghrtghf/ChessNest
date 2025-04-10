'use client'

import type { ReactNode } from 'react'

import { TanstackQueryProvider, ThemeProvider, ToastProvider } from './index'

export function MainProvider({ children }: { children: ReactNode }) {
	return (
		<TanstackQueryProvider>
			<ThemeProvider attribute='class' defaultTheme='light' disableTransitionOnChange>
				<ToastProvider />
				{children}
			</ThemeProvider>
		</TanstackQueryProvider>
	)
}
