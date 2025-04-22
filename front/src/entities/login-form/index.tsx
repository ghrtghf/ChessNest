'use client'

import { signIn, useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'

import { Google } from '@/shared/assets/svg/google'
import { PAGES } from '@/shared/constants'
import { Button } from '@/shared/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'

import { useLoginMutation } from './hooks/useLoginMutation'
import { LoginSchema, type TypeLoginSchema } from './model'

export function LoginForm() {
	const form = useForm<TypeLoginSchema>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: ''
		},
		mode: 'onChange'
	})

	const { login, isLoadingLogin } = useLoginMutation()

	const onSubmit = (values: TypeLoginSchema) => {
		console.log(values)
		login({ values })
	}

	return (
		<>
			<Form {...form}>
				<form className='flex flex-col gap-6' onSubmit={form.handleSubmit(onSubmit)}>
					<div className='flex flex-col items-center gap-2 text-center'>
						<h1 className='text-2xl font-bold'>Войдите в свой аккаунт</h1>
						<p className='text-balance text-sm text-muted-foreground'>
							Введите свой адрес электронной почты ниже, чтобы войти в свою учетную запись
						</p>
					</div>
					<div className='grid gap-6'>
						<FormField
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Почта</FormLabel>
									<FormControl>
										<Input disabled={isLoadingLogin} type='email' placeholder='ivan@example.com' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
							control={form.control}
						/>
						<FormField
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Пароль</FormLabel>
									<FormControl>
										<Input disabled={isLoadingLogin} type='password' placeholder='********' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
							control={form.control}
						/>
						<Button disabled={isLoadingLogin} type='submit'>
							{isLoadingLogin && <div className='mr-2 h-4 w-4 animate-spin rounded-full border-2 border-x-white' />}
							Войти в аккаунт
						</Button>
						<div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border mb-6'>
							<span className='relative z-10 bg-background px-2 text-muted-foreground'>Или продолжить</span>
						</div>
					</div>
				</form>
			</Form>
			<Button className='w-full' disabled={isLoadingLogin} variant='outline' onClick={() => signIn('google')}>
				<Google />
				Войти с помощью Google
			</Button>
			<div className='mt-4 text-center text-sm'>
				{/* eslint-disable-next-line style/jsx-one-expression-per-line */}
				Нету аккаунта?{' '}
				<Link className='underline underline-offset-4' href={PAGES.signup}>
					Зарегистрироваться
				</Link>
			</div>
		</>
	)
}
