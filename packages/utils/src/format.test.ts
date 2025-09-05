import { describe, it, expect } from 'vitest';
import { formatDate, titleCase } from './format';

describe('format', () => {
	describe('formatDate', () => {
		it('formats Date object correctly', () => {
			const date = new Date('2024-01-15');
			const result = formatDate(date);
			expect(result).toBe('January 15, 2024');
		});

		it('formats string date correctly', () => {
			const result = formatDate('2024-01-15');
			expect(result).toBe('January 15, 2024');
		});
	});

	describe('titleCase', () => {
		it('converts text to title case', () => {
			expect(titleCase('hello world')).toBe('Hello World');
		});

		it('handles mixed case text', () => {
			expect(titleCase('hELLo WoRLD')).toBe('Hello World');
		});

		it('handles single word', () => {
			expect(titleCase('test')).toBe('Test');
		});

		it('handles empty string', () => {
			expect(titleCase('')).toBe('');
		});
	});
});
