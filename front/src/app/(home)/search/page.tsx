/* eslint-disable simple-import-sort/imports */
'use client'

import { useEffect, useState, type ChangeEvent } from 'react'

import { useDebounce } from '@/shared/hooks/use-debounce'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'

// export const metadata: Metadata = {
// 	title: 'Поиск друга',
// 	description: 'Найдите своего друга, чтобы играть вместе'
// }

export default function Search() {
	const [inputValue, setInputValue] = useState('')
	const debouncedInputValue = useDebounce(inputValue, 500)

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value)
	}

	useEffect(() => {
		console.log('hello', debouncedInputValue)
	}, [debouncedInputValue])

	return (
		<div className='flex justify-center w-full mt-20'>
			<div className='flex w-full max-w-sm items-center space-x-2'>
				<Input type='text' value={inputValue} onChange={handleInputChange} placeholder='Поиск по нику пользователя' />
				{/* <Button type='submit'>Искать</Button> */}
			</div>
		</div>
	)
}
