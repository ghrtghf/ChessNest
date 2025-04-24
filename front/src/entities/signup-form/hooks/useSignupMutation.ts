import { useMutation } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import axios from 'axios'

import type { TypeSignupSchema } from '../model'

export function useSignupMutation() {
	const router = useRouter()

	const { mutate: signup, isLoading: isLoadingSignup } = useMutation({
		mutationKey: ['signup user'],
		mutationFn: async ({ values }: { values: TypeSignupSchema }) => {
			const response = await axios(`http://localhost:8000/api/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Origin: 'http://localhost:3000'
				},
				data: JSON.stringify(values)
			})
			return response.data
		},
		onSuccess(data: any) {
			if (data.message) {
				// toastMessageHandler(data)
			} else {
				router.push('/home')

				console.log(data)

				Cookies.set('token', data?.data?.access_token, {
					expires: 7,
					sameSite: 'Strict'
				})

				toast.success('Успешная регистрация')
			}
		},
		onError(error: Error) {
			// toastMessageHandler(error)
			console.log(error)
			toast.error(error.message)
		}
	})

	return { signup, isLoadingSignup }
}
