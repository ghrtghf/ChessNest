'use client'

import { format } from 'date-fns'
import Image from 'next/image'

import { Button } from '@/shared/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/ui/dialog'
import { Skeleton } from '@/shared/ui/skeleton'

import { usePosts } from './hooks/usePosts'

export function Posts() {
	const posts = usePosts()

	if (posts.isError) {
		return null
	}

	return (
		<div className='grid grid-cols-2 gap-4'>
			{posts.isLoading &&
				Array.from({ length: 2 }).map((_, index) => (
					<div key={index} className='flex flex-col space-y-3 py-3'>
						<Skeleton className='h-[416px] w-[100%] rounded-xl' />
						<div className='space-y-2'>
							<Skeleton className='h-6 w-[400px]' />
							<Skeleton className='h-[80px] w-[350px]' />
						</div>
						<div className='flex items-center justify-between'>
							<Skeleton className='h-6 w-[100px]' />
							<Skeleton className='h-6 w-[50px]' />
						</div>
					</div>
				))}
			{!posts.isLoading &&
				posts.data.map((post: any) => (
					<div key={post.id} className='flex flex-col space-y-3 py-3'>
						<Image src={post.image_url} alt={post.title} width={100} height={56} style={{ width: '100%' }} />
						<div className='space-y-2'>
							<h2 className='h-6 w-[400px] overflow-hidden text-ellipsis whitespace-nowrap'>{post.title}</h2>
							<p className='h-[70px] w-[350px] overflow-hidden text-ellipsis'>{post.description}</p>
						</div>
						<div className='flex items-center justify-between'>
							<p className='h-6 w-[100px]'>{format(post.created_at, 'dd-MM-yyyy')}</p>
							<Dialog>
								<DialogTrigger asChild>
									<Button variant='outline'>Подробнее</Button>
								</DialogTrigger>
								<DialogContent className='sm:max-w-[700px]'>
									<DialogHeader>
										<DialogTitle>{post.title}</DialogTitle>
										<DialogTitle>Кол-во просмотров: {post.view}</DialogTitle>
									</DialogHeader>
									<div className='flex flex-col items-center space-x-2'>
										<Image src={'/'} alt={post.title} width={100} height={56} style={{ width: '100%' }} />
										{post.description}
									</div>
									<DialogFooter className='sm:justify-end'>
										<DialogClose asChild>
											<Button type='button' variant='secondary'>
												Закрыть
											</Button>
										</DialogClose>
									</DialogFooter>
								</DialogContent>
							</Dialog>
						</div>
					</div>
				))}
		</div>
	)
}
