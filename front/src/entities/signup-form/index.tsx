'use client'

import { useForm } from 'react-hook-form'
import Link from 'next/link'

import { PAGES } from '@/shared/constants'
import { Button } from '@/shared/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'

import { useSignupMutation } from './hooks/useSignupMutation'
import { SignupSchema, type TypeSignupSchema } from './model'

export function SignupForm({ footer = true, header = true }: { footer?: boolean; header?: boolean }) {
	const form = useForm<TypeSignupSchema>({
		resolver: zodResolver(SignupSchema),
		defaultValues: {
			username: '',
			email: '',
			password: '',
			confirmPassword: ''
		},
		mode: 'onChange'
	})

	const { signup, isLoadingSignup } = useSignupMutation()

	const onSubmit = (values: TypeSignupSchema) => {
		console.log(values)
		signup({ values })
	}

	return (
		<>
			<Form {...form}>
				<form className='flex flex-col gap-6' onSubmit={form.handleSubmit(onSubmit)}>
					{header && (
						<div className='flex flex-col items-center gap-2 text-center'>
							<h1 className='text-2xl font-bold'>Зарегистрироваться</h1>
							<p className='text-balance text-sm text-muted-foreground'>
								Введите свой адрес электронной почты ниже, чтобы войти в свою учетную запись
							</p>
						</div>
					)}
					<div className='grid gap-6'>
						<FormField
							name='username'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Логин</FormLabel>
									<FormControl>
										<Input disabled={isLoadingSignup} type='text' placeholder='ivan' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
							control={form.control}
						/>

						<FormField
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Почта</FormLabel>
									<FormControl>
										<Input disabled={isLoadingSignup} type='email' placeholder='ivan@example.com' {...field} />
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
										<Input disabled={isLoadingSignup} type='password' placeholder='********' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
							control={form.control}
						/>

						<FormField
							name='confirmPassword'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Подтвердить пароль</FormLabel>
									<FormControl>
										<Input disabled={isLoadingSignup} type='password' placeholder='********' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
							control={form.control}
						/>
					</div>
					<Button disabled={isLoadingSignup}>
						{isLoadingSignup && <div className='mr-2 h-4 w-4 animate-spin rounded-full border-2 border-x-white' />}
						Зарегистрироваться
					</Button>
				</form>
			</Form>
			{footer && (
				<div className='mt-4 text-center text-sm'>
					{/* eslint-disable-next-line style/jsx-one-expression-per-line */}
					Есть аккаунт?{' '}
					<Link className='underline underline-offset-4' href={PAGES.login}>
						Войти
					</Link>
				</div>
			)}
		</>
	)
}
