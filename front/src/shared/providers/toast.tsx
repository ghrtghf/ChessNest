'use client'

import { Toaster } from '../ui/sonner'

export function ToastProvider() {
	return <Toaster duration={6000} position='bottom-right' />
}
