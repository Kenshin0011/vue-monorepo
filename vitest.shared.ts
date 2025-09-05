import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		globals: true,
		coverage: {
			provider: 'v8',
			reporter: [
				'text',
				'json-summary',
				'json',
				'html',
				'lcov',
				'text-summary',
			],
			exclude: [
				'coverage/**',
				'dist/**',
				'packages/*/test{,s}/**',
				'**/*.d.ts',
				'**/*.config.{js,ts,mjs}',
				'**/*{.,-}test.{js,ts}',
				'**/*{.,-}spec.{js,ts}',
				'**/node_modules/**',
				'**/[.]**',
				'**/main.{js,ts}',
			],
		},
	},
});
