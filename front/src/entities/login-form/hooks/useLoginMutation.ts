import { useMutation } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import type { TypeLoginSchema } from '../model'

export function useLoginMutation() {
	const router = useRouter()

	const { mutate: login, isLoading: isLoadingLogin } = useMutation({
		mutationKey: ['login user'],
		mutationFn: async ({ values }: { values: TypeLoginSchema }) => {
			const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Origin: `${process.env.NEXT_PUBLIC_FRONTEND_URL}`
				},
				body: JSON.stringify(values)
			})
			return response.json()
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

				toast.success('Успешная авторизация')
			}
		},
		onError(error: Error) {
			toastMessageHandler(error)
		}
	})

	return { login, isLoadingLogin }
}
