import { useMutation } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import axios from 'axios'

import { toastMessageHandler } from '@/shared/utils'

import type { TypeSignupSchema } from '../model'

export function useSignupMutation() {
	const router = useRouter()

	const { mutate: signup, isLoading: isLoadingSignup } = useMutation({
		mutationKey: ['signup user'],
		mutationFn: async ({ values }: { values: TypeSignupSchema }) => {
			const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Origin: `${process.env.NEXT_PUBLIC_FRONTEND_URL}`
				},
				data: JSON.stringify(values)
			})
			return response.data
		},
		onSuccess(data: any) {
			if (data.message) {
				toastMessageHandler(data)
			} else {
				router.push('/home')

				console.log(data)

				Cookies.set('token', data?.data?.access_token, {
					expires: 30,
					sameSite: 'Lax'
				})

				toast.success('Успешная регистрация')
			}
		},
		onError(error: Error) {
			toastMessageHandler(error)
		}
	})

	return { signup, isLoadingSignup }
}
