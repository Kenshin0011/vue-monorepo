import { defineProject, mergeConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import configShared from '../../vitest.shared';

export default mergeConfig(
	configShared,
	defineProject({
		plugins: [vue()],
		test: {
			environment: 'jsdom',
		},
	}),
);
