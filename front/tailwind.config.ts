import type { Config } from 'tailwindcss'

export default {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)'
			},
			gridTemplateColumns: {
				'8-tiles': 'repeat(8, var(--tile-size))'
			},
			gridTemplateRows: {
				'8-tiles': 'repeat(8, var(--tile-size))'
			}
			// backgroundColor: {
			// 	'light-tile': 'var(--light-tile)',
			// 	'dark-tile': 'var(--dark-tile)'
			// }
		}
	},
	plugins: []
} satisfies Config
