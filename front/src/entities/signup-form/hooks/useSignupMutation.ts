import { useMutation } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import axios from 'axios'

import { api } from '@/shared/api'
import { toastMessageHandler } from '@/shared/utils'

import type { TypeSignupSchema } from '../model'

export function useSignupMutation() {
	const router = useRouter()

	const { mutate: signup, isLoading: isLoadingSignup } = useMutation({
		mutationKey: ['signup user'],
		mutationFn: async ({ values }: { values: TypeSignupSchema }) => {
			const response = await api.post('/register', values)
			return response.data
		},
		onSuccess(data) {
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
