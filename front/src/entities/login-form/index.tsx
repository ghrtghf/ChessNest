'use client'

import { useForm } from 'react-hook-form'
import Link from 'next/link'

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
			<Button className='w-full' disabled={isLoadingLogin} variant='outline'>
				<svg height='100' width='100' x='0px' xmlns='http://www.w3.org/2000/svg' y='0px' viewBox='0 0 48 48'>
					<path
						d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'
						fill='#fbc02d'
					/>
					<path
						d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'
						fill='#e53935'
					/>
					<path
						d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'
						fill='#4caf50'
					/>
					<path
						d='M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z'
						fill='#1565c0'
					/>
				</svg>
				Войти с помощью Google
			</Button>
			<div className='mt-4 text-center text-sm'>
				{/* eslint-disable-next-line style/jsx-one-expression-per-line */}
				Нету аккаунта?{' '}
				<Link className='underline underline-offset-4' href='/signup'>
					Зарегистрироваться
				</Link>
			</div>
		</>
	)
}
