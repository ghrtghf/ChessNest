import type { Metadata } from 'next'

import { Posts } from '@/entities/posts'

export const metadata: Metadata = {
	title: 'Шахматные статьи'
}

export default function PostsPage() {
	return (
		<div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
			<div className='px-4 lg:px-6'>
				<Posts />
			</div>
		</div>
	)
}
