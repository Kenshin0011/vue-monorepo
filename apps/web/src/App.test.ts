import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import App from './App.vue';

// Mock alert function
global.alert = vi.fn();

describe('App', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders properly', () => {
		const wrapper = mount(App);
		expect(wrapper.exists()).toBe(true);
	});

	it('displays formatted title', () => {
		const wrapper = mount(App);
		expect(wrapper.text()).toContain('Vue Monorepo Example');
	});

	it('displays current date', () => {
		const wrapper = mount(App);
		// Should contain some date format
		expect(wrapper.html()).toMatch(/\w+ \d{1,2}, \d{4}/);
	});

	it('triggers get started handler', async () => {
		const wrapper = mount(App);
		const welcomeCard = wrapper.findComponent({ name: 'WelcomeCard' });

		if (welcomeCard.exists()) {
			await welcomeCard.vm.$emit('get-started');
			expect(global.alert).toHaveBeenCalledWith(
				'🎯 Ready to start building amazing apps!',
			);
		}
	});

	it('triggers learn more handler', async () => {
		const wrapper = mount(App);
		const welcomeCard = wrapper.findComponent({ name: 'WelcomeCard' });

		if (welcomeCard.exists()) {
			await welcomeCard.vm.$emit('learn-more');
			expect(global.alert).toHaveBeenCalledWith(
				'📚 Check out the documentation for more details!',
			);
		}
	});
});
