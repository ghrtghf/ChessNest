import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Страница не найдена'
}

export default function NotFound() {
	return (
		<div className='flex h-screen w-full items-center justify-center'>
			<div className='flex flex-col items-center justify-center gap-2'>
				<p className='text-[30px]'>Такой страницы не существует</p>
			</div>
		</div>
	)
}
