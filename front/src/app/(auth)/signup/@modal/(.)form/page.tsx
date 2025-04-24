import type { Metadata } from 'next'

import { SignupModal } from '@/entities/signup-modal'

export const metadata: Metadata = {
	title: 'Регистрация через форму'
}

export default function SignupFormInterceptorPage() {
	return <SignupModal />
}
