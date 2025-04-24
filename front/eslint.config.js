import { eslint } from '@afpia/eslint'

export default eslint(
	{ react: false, next: true },
	{
		name: '@afpia/fix-eslint-rules',
		rules: {
			'n/prefer-global/process': 'off'
		}
	}
)
