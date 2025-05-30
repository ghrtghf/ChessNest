import { useQuery } from '@tanstack/react-query'

import { api } from '@/shared/api'
import { toastMessageHandler } from '@/shared/utils'
import { toast } from 'sonner'

export function usePosts() {
	const posts = useQuery({
		queryKey: ['posts'],
		queryFn: async () => {
			const response = await api.get(`/posts`)
			return response.data
		},
		onError(error: Error) {
			console.log(error)
			// toastMessageHandler(error.response.data.message)
			toast.message(error.response.data.message)
		}
	})

	return posts
}
