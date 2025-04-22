import type { Metadata } from 'next'
import Link from 'next/link'

import { signIn } from '@/auth'
import { Google } from '@/shared/assets/svg/google'
import { PAGES } from '@/shared/constants'
import { Button } from '@/shared/ui/button'

export const metadata: Metadata = {
	title: 'Регистрация'
}

export default function SignupPage({ modal }: { modal: React.ReactNode }) {
	return (
		<>
			<Button className='w-full mb-6' asChild>
				<Link href={PAGES.signupForm}>Создать аккаунт с помощью почты</Link>
			</Button>
			<div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border mb-6'>
				<span className='relative z-10 bg-background px-2 text-muted-foreground'>Или</span>
			</div>
			<form
				action={async () => {
					'use server'
					await signIn('google')
				}}
			>
				<Button className='w-full' variant='outline' type='submit'>
					<Google />
					Продолжить с Google
				</Button>
			</form>
			<div className='mt-4 text-center text-sm'>
				{/* eslint-disable-next-line style/jsx-one-expression-per-line */}
				Есть аккаунт?{' '}
				<Link className='underline underline-offset-4' href={PAGES.login}>
					Войти
				</Link>
			</div>
			{modal}
		</>
	)
}
