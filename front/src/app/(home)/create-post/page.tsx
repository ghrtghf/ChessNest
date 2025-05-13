import type { Metadata } from 'next'

import { CreatePostForm } from '@/entities/create-post'

export const metadata: Metadata = {
	title: 'Создание шахматной статьи'
}

export default function CreatePostPage() {
	return (
		<div className='flex items-center justify-center h-full'>
			<CreatePostForm />
		</div>
	)
}
