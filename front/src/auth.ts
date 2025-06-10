import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [Google],
	debug: process.env.NODE_ENV === 'development',
	callbacks: {
		async signIn({ account, profile }) {
			if (account?.provider === 'google') {
				try {
					console.log('@запрос')
					await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/google`, {
						method: 'POST',
						headers: { 'Content-Type': 'application/json', Origin: `${process.env.NEXT_PUBLIC_FRONTEND_URL}` },
						body: JSON.stringify({
							picture: profile?.picture,
							name: profile?.name,
							email: profile?.email,
							token: account.id_token
						})
					})
				} catch (error) {
					console.log(error)
				}

				return true
			}
			return true
		},
		async session({ session }) {
			return session
		}
	},
	cookies: {
		sessionToken: {
			name: 'token'
		}
	}
})
