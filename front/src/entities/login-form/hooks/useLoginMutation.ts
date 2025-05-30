import { useMutation } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import axios from 'axios'

import { api } from '@/shared/api'
import { toastMessageHandler } from '@/shared/utils'

import type { TypeLoginSchema } from '../model'

export function useLoginMutation() {
	const router = useRouter()

	const { mutate: login, isLoading: isLoadingLogin } = useMutation({
		mutationKey: ['login user'],
		mutationFn: async ({ values }: { values: TypeLoginSchema }) => {
			const response = await api.post('/login', values)
			return response.data
		},
		onSuccess(data) {
			if (data?.message) {
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
			console.log(error)
			// toastMessageHandler(error.response.data.message)
			toast.message(error.response.data.message)
		}
	})

	return { login, isLoadingLogin }
}
