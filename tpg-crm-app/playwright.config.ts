import { defineConfig } from '@playwright/test';

export default defineConfig({
	testDir: './tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	webServer: {
		command: 'npm run dev', // Command to start your SvelteKit dev server
		url: 'http://localhost:5173', // URL where your SvelteKit dev server runs
		reuseExistingServer: !process.env.CI,
	},
	use: {
		baseURL: 'http://localhost:5173',
	},
});