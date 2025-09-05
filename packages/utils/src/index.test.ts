import { describe, it, expect } from 'vitest';
import * as utils from './index';

describe('Utils package exports', () => {
	it('exports formatDate function', () => {
		expect(utils.formatDate).toBeDefined();
		expect(typeof utils.formatDate).toBe('function');
	});

	it('exports titleCase function', () => {
		expect(utils.titleCase).toBeDefined();
		expect(typeof utils.titleCase).toBe('function');
	});
});
