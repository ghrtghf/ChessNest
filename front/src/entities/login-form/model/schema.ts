import { z } from 'zod'

export const LoginSchema = z.object({
	email: z.string().email({
		message: 'Пожалуйста, введите корректный адрес электронной почты.'
	}),
	password: z.string().min(8, {
		message: 'Ваш пароль должен содержать минимум 8 символов.'
	})
})

export type TypeLoginSchema = z.infer<typeof LoginSchema>
