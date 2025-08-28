import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, mergeConfig } from 'vite';
import type { UserConfig } from 'vitest/config';

export default defineConfig(config => {
	const testConfig: UserConfig = {
		test: {
			globals: true,
			include: ['src/**/*.{test,spec}.{js,ts}'],
			environment: 'jsdom',
			setupFiles: ['./vitest-setup.ts'],
			deps: {
				inline: ['@sveltejs/kit']
			},
			alias: {
				'$lib': './src/lib',
				'$env': './src/env' // Assuming $env maps to src/env, adjust if different
			}
		}
	};

	return mergeConfig(config, {
		plugins: [tailwindcss(), sveltekit()],
		...testConfig
	});
});
