module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'airbnb',
		'airbnb/hooks',
		'prettier',
		'plugin:import/errors',
		'plugin:import/warnings',
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['react', 'prettier'],
	rules: {
		'prettier/prettier': ['error'],
		'react/jsx-filename-extension': [
			1,
			{
				extensions: ['.js', '.jsx'],
			},
		],
		'no-unused-vars': 'warn',
		'import/prefer-default-export': 'off',
	},
};
