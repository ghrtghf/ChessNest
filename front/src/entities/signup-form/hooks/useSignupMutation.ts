import { useMutation } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import type { TypeSignupSchema } from '../model'

export function useSignupMutation() {
	const router = useRouter()

	const { mutate: signup, isLoading: isLoadingSignup } = useMutation({
		mutationKey: ['signup user'],
		mutationFn: async ({ values }: { values: TypeSignupSchema }) => {
			const response = await fetch(`http://localhost:8000/api/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Origin: 'http://localhost:3000'
				},
				body: JSON.stringify(values)
			})
			return response.json()
		},
		onSuccess(data: any) {
			if (data.message) {
				// toastMessageHandler(data)
			} else {
				router.push('/home')

				Cookies.set('token', data.data.user.access_token, {
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
