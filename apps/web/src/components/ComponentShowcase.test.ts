import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import ComponentShowcase from './ComponentShowcase.vue';

// Mock setTimeout
vi.useFakeTimers();

describe('ComponentShowcase', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.runOnlyPendingTimers();
		vi.useRealTimers();
		vi.useFakeTimers();
	});

	it('renders properly', () => {
		const wrapper = mount(ComponentShowcase);
		expect(wrapper.exists()).toBe(true);
	});

	it('contains Rich Components text', () => {
		const wrapper = mount(ComponentShowcase);
		expect(wrapper.text()).toContain('Rich Components');
	});

	it('handles loading state correctly', async () => {
		const wrapper = mount(ComponentShowcase);

		// Find the "Test Loading" button
		const loadingButton = wrapper
			.findAll('button')
			.find((btn) => btn.text().includes('Test Loading'));
		expect(loadingButton?.exists()).toBe(true);

		// Initial state should show "Test Loading"
		expect(loadingButton?.text()).toContain('Test Loading');

		// Click the button to start loading
		await loadingButton?.trigger('click');
		await nextTick();

		// Check that loading state is active
		expect(loadingButton?.text()).toContain('Loading...');

		// Fast-forward time to complete the loading
		vi.advanceTimersByTime(2000);
		await nextTick();

		// Loading should be finished
		expect(loadingButton?.text()).toContain('Test Loading');
	});
});
