/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./node_modules/flowbite/**/*.js',
		'./public/pagefind/**/*.html', // Include Pagefind outputs if needed
	],

	theme: {
		extend: {
			fontFamily: {
				serif: ['Merriweather', 'serif'],
			},
			colors: {
				primary: '#1D4ED8',
				secondary: '#9333EA',
				accent: '#FACC15', // Add custom colors
			},
			spacing: {
				'72': '18rem',
				'84': '21rem',
				'96': '24rem', // Add custom spacing
			},
		},
	},

	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'), // Optional form plugin
		require('flowbite/plugin'),
	],
};