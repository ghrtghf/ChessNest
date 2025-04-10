import { z } from 'zod'

export const SignupSchema = z
	.object({
		username: z
			.string()
			.min(1, { message: 'Это поле обязательно.' })
			.max(30, { message: 'Ваше имя должно содержать максимум 30 символов.' }),
		email: z.string().email({
			message: 'Пожалуйста, введите корректный адрес электронной почты.'
		}),
		password: z.string().min(8, { message: 'Ваш пароль должен содержать минимум 8 символов.' }),
		confirmPassword: z.string()
	})
	.refine((values) => values.password === values.confirmPassword, {
		message: 'Пароли не совпадают',
		path: ['confirmPassword']
	})

export type TypeSignupSchema = z.infer<typeof SignupSchema>
