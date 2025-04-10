'use client'

import { useForm } from 'react-hook-form'
import Link from 'next/link'

import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'

import { useSignupMutation } from './hooks/useSignupMutation'
import { SignupSchema, type TypeSignupSchema } from './model'

export function SignupForm() {
	const form = useForm<TypeSignupSchema>({
		resolver: zodResolver(SignupSchema),
		defaultValues: {
			username: '',
			email: '',
			password: '',
			confirmPassword: ''
		}
	})

	const { signup, isLoadingSignup } = useSignupMutation()

	const onSubmit = (values: TypeSignupSchema) => {
		console.log(values)
		signup({ values })
	}

	return (
		<Card className='w-[400px]'>
			<CardHeader className='space-y-2'>
				<CardTitle>Зарегистрироваться</CardTitle>
				<CardDescription>Зарегистрируйтесь, используя свой адрес электронной почты и пароль</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className='grid gap-2'>
							<div className='grid gap-1'>
								<FormField
									name='username'
									render={({ field }) => (
										<FormItem className='w-full pb-4'>
											<FormLabel htmlFor='username'>Имя</FormLabel>
											<div className='relative w-full'>
												<FormControl className='w-full'>
													<Input
														className='w-full'
														disabled={isLoadingSignup}
														id='username'
														type='text'
														autoCapitalize='none'
														autoCorrect='off'
														placeholder='ivan'
														{...field}
													/>
												</FormControl>
											</div>
											<FormMessage />
										</FormItem>
									)}
									control={form.control}
								/>

								<FormField
									name='email'
									render={({ field }) => (
										<FormItem className='w-full pb-4'>
											<FormLabel htmlFor='email'>Почта</FormLabel>
											<div className='relative w-full'>
												<FormControl className='w-full'>
													<Input
														className='w-full'
														disabled={isLoadingSignup}
														id='email'
														type='email'
														autoCapitalize='none'
														autoCorrect='off'
														placeholder='ivan@example.com'
														{...field}
													/>
												</FormControl>
											</div>
											<FormMessage />
										</FormItem>
									)}
									control={form.control}
								/>

								<FormField
									name='password'
									render={({ field }) => (
										<FormItem className='w-full pb-4'>
											<FormLabel htmlFor='password'>Пароль</FormLabel>
											<div className='relative w-full'>
												<FormControl className='w-full'>
													<Input
														className='w-full'
														disabled={isLoadingSignup}
														id='password'
														type='password'
														autoCapitalize='none'
														autoCorrect='off'
														placeholder='******'
														{...field}
													/>
												</FormControl>
											</div>
											<FormMessage />
										</FormItem>
									)}
									control={form.control}
								/>

								<FormField
									name='confirmPassword'
									render={({ field }) => (
										<FormItem className='w-full pb-4'>
											<FormLabel htmlFor='confirmPassword'>Подтвердить пароль</FormLabel>
											<div className='relative w-full'>
												<FormControl className='w-full'>
													<Input
														className='w-full'
														disabled={isLoadingSignup}
														id='confirmPassword'
														type='password'
														autoCapitalize='none'
														autoCorrect='off'
														placeholder='******'
														{...field}
													/>
												</FormControl>
											</div>
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
						</div>
					</form>
				</Form>
				<div className='mt-4 text-center text-sm'>
					Есть аккаунт?{' '}
					<Link className='underline underline-offset-4' href='/login'>
						Войти
					</Link>
				</div>
			</CardContent>
		</Card>
	)
}
