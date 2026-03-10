import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		viteSingleFile()
	],
	base: './', // fixed index.html having sources start with "/" instead of "./" which breaks everything except root deployment
	css: {
		modules: {
			localsConvention: 'camelCaseOnly',
			// or: 'camelCase' (keeps kebab-case too)
		},
	},
})
