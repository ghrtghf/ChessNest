import { useMutation } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import type { TypeLoginSchema } from '../model'

export function useLoginMutation() {
	const router = useRouter()

	const { mutate: login, isLoading: isLoadingLogin } = useMutation({
		mutationKey: ['login user'],
		mutationFn: async ({ values }: { values: TypeLoginSchema }) => {
			const response = await fetch(`http://localhost:8000/api/login`, {
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

				Cookies.set('token', data.data.access_token, {
					expires: 7,
					sameSite: 'Strict'
				})

				toast.success('Успешная авторизация')
			}
		},
		onError(error: Error) {
			// toastMessageHandler(error)
			toast.error(error.message)
		}
	})

	return { login, isLoadingLogin }
}
