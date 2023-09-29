module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
	ignorePatterns: ['node_modules/'],
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	plugins: ['react', 'prettier'],
	rules: {
		// eslint와 같이 사용하는 부분에 있어, 내부적인 이슈가 있어서, 임의로 두 설정을 꺼야 함.
		'arrow-body-style': 'off',
		'prefer-arrow-callback': 'off',
		'no-console': 'off',
		'no-alert': 'off',
		'react/button-has-type': 'off',
		'react/jsx-filename-extension': [
			1,
			{
				extensions: ['.js', '.jsx'],
			},
		],
		'react/react-in-jsx-scope': 'off',
	},
	settings: {
		'import/resolver': {
			node: {
				moduleDirectory: ['src', 'node_modules'],
			},
		},
	},
};
