import { useQuery } from '@tanstack/react-query'

import { api } from '@/shared/api'
import { toastMessageHandler } from '@/shared/utils'

export function usePosts() {
	const posts = useQuery({
		queryKey: ['posts'],
		queryFn: async () => {
			const response = await api.get(`/posts`)
			return response.data
		},
		onError(error: Error) {
			toastMessageHandler(error)
		}
	})

	return posts
}
