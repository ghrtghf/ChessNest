'use client'

import { useRouter } from 'next/navigation'

import { SignupForm } from '@/entities/signup-form'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/ui/dialog'

export const SignupModal = () => {
	const router = useRouter()

	return (
		<Dialog open onOpenChange={() => router.back()}>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Зарегистрироваться</DialogTitle>
					<DialogDescription>Введите свой адрес электронной почты ниже, чтобы войти в свою учетную запись</DialogDescription>
				</DialogHeader>
				<SignupForm footer={false} header={false} />
			</DialogContent>
		</Dialog>
	)
}
