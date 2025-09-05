import { describe, it, expect } from 'vitest';
import * as uiComponents from './index';

describe('UI package exports', () => {
	it('exports Button component', () => {
		expect(uiComponents.Button).toBeDefined();
	});

	it('exports Card component', () => {
		expect(uiComponents.Card).toBeDefined();
	});
});
