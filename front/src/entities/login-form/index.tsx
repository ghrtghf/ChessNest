'use client'

import { useForm } from 'react-hook-form'
import Link from 'next/link'

import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
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
		}
	})

	const { login, isLoadingLogin } = useLoginMutation()

	const onSubmit = (values: TypeLoginSchema) => {
		console.log(values)
		login({ values })
	}

	return (
		<Card className='w-[400px]'>
			<CardHeader className='space-y-2'>
				<CardTitle>Войти</CardTitle>
				<CardDescription>Чтобы войти на сайт введите ваш email и пароль</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form className='grid gap-2 space-y-2' onSubmit={form.handleSubmit(onSubmit)}>
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
										<Input disabled={isLoadingLogin} type='password' placeholder='******' {...field} />
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
						{/* <Button variant='outline' className='w-full' disabled={isLoadingLogin}>
							<Google className='fill-black dark:fill-white' />
							Войти с помощью Google
						</Button> */}
					</form>
				</Form>
				<div className='mt-4 text-center text-sm'>
					Нету аккаунта?{' '}
					<Link className='underline underline-offset-4' href='/signup'>
						Зарегистрироваться
					</Link>
				</div>
			</CardContent>
		</Card>
	)
}
