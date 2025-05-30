'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { Textarea } from '@/shared/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'

import { usePostMutation } from './hooks/usePostMutation'

export const PostSchema = z.object({
	title: z
		.string()
		.min(1, { message: 'Это поле обязательно' })
		.max(30, { message: 'Ваше название занятия должно содержать максимум 30 символов.' }),
	description: z.string().min(1, { message: 'Это поле обязательно' }),
	image: z.string().min(1, { message: 'Это поле обязательно' })
})

export type TypePostSchema = z.infer<typeof PostSchema>

export function CreatePostForm() {
	const [currentImage, setCurrentImage] = useState<File | null>(null)

	const form = useForm<TypePostSchema>({
		resolver: zodResolver(PostSchema),
		defaultValues: {
			title: '',
			description: '',
			image: ''
		}
	})
	const createPost = usePostMutation()

	const onSubmit = (values: any) => {
		const formData = new FormData()

		formData.append('image', currentImage!)
		formData.append('title', values.title)
		formData.append('description', values.description)

		createPost.mutate(formData)
		form.reset()
	}

	return (
		<Card className='w-[400px]'>
			<CardHeader className='space-y-2'>
				<CardTitle>Создайте статью</CardTitle>
				<CardDescription>Можно создать статью, о шахматах</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-2 space-y-2'>
						<FormField
							control={form.control}
							name='title'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Название</FormLabel>
									<FormControl>
										<Input placeholder='Дебют...' disabled={createPost.isLoading} type='text' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='description'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Описание</FormLabel>
									<FormControl>
										<Textarea placeholder='В этой статье...' disabled={createPost.isLoading} {...field} className='resize-none' />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='image'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Картинка</FormLabel>
									<FormControl>
										<Input
											type='file'
											accept='image/png, image/jpeg'
											disabled={createPost.isLoading}
											{...field}
											onChange={(e) => {
												const file = e.target.files?.[0]
												if (file) {
													setCurrentImage(file)
													field.onChange(e)
												}
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button className='w-full' variant='outline'>
							Создать статью
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}
