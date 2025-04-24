// eslint-disable-next-line simple-import-sort/imports
import { NextResponse, type NextRequest } from 'next/server'

export default function middleware(request: NextRequest) {
	const { url, cookies } = request

	const session = cookies.get('token')?.value

	const isAuthPage = url.includes('/login') || url.includes('/signup')

	if (request.nextUrl.pathname === '/') {
		return NextResponse.redirect(new URL('/home', url))
	}

	if (isAuthPage) {
		if (session) {
			return NextResponse.redirect(new URL('/home', url))
		}

		return NextResponse.next()
	}

	if (!session) {
		return NextResponse.redirect(new URL('/login', url))
	}
}

export const config = {
	matcher: [
		'/login',
		'/signup',
		'/home',
		'/',
		'/signup/form',
		'/game/:id',
		'/settings/profile',
		'/settings/board',
		'/search',
		'/stats'
	]
}
