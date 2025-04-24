import type { Metadata } from 'next'

import { SignupForm } from '@/entities/signup-form'

export const metadata: Metadata = {
	title: 'Регистрация через форму'
}

export default function SignupFormPage() {
	return <SignupForm />
}
