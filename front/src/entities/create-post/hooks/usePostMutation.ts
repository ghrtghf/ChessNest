import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { api } from '@/shared/api'
import { toastMessageHandler } from '@/shared/utils'

export function usePostMutation() {
	const createPost = useMutation({
		mutationKey: ['create post'],
		mutationFn: async (values: any) => {
			const response = await api.post('/post', values)
			return response.data
		},
		onSuccess(data) {
			if (data.message) {
				toastMessageHandler(data)
			} else {
				toast.success('Успешное добавление статьи')
			}
		},
		onError(error: Error) {
			toastMessageHandler(error)
		}
	})

	return createPost
}
