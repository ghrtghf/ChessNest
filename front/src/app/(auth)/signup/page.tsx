import type { Metadata } from 'next'

import { SignupForm } from '@/entities/signup-form'

export const metadata: Metadata = {
	title: 'Регистрация'
}

export default function SignupPage() {
	return (
		<div className='flex h-full items-center justify-center'>
			<SignupForm />
		</div>
	)
}
