import type { NextRequest } from 'next/server'

import { auth, handlers } from '@/auth' // Referring to the auth.ts we just created

export const { POST, GET } = handlers

// export async function GET(req: NextRequest) {
// 	const res = await handlers.GET(req)
// 	const cloned = res.clone()
// 	// const data = await cloned.json()
// 	const session = await auth()

// 	console.log('@cloned', cloned)
// 	console.log('@session', session)
// 	const url = new URL(req.url)
// 	if (url.searchParams.get('provider') === 'google') {
// 		const pictureUrl = session?.user?.image
// 		// if (pictureUrl) {
// 		// 	await fetch(`${process.env.BACKEND_URL}/api/user/profile-picture`, {
// 		// 		method: 'POST',
// 		// 		headers: { 'Content-Type': 'application/json' },
// 		// 		body: JSON.stringify({ picture: pictureUrl })
// 		// 	})
// 		// }
// 	}

// 	// 5. Возвращаем оригинальныї ответ Auth.js
// 	return res
// }
