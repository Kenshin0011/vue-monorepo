import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import WelcomeCard from './WelcomeCard.vue';

describe('WelcomeCard', () => {
	it('renders properly', () => {
		const wrapper = mount(WelcomeCard);
		expect(wrapper.exists()).toBe(true);
	});

	it('displays welcome title', () => {
		const wrapper = mount(WelcomeCard);
		expect(wrapper.text()).toContain('Welcome to Vue Monorepo');
	});

	it('displays package information', () => {
		const wrapper = mount(WelcomeCard);
		expect(wrapper.text()).toContain('@vue-monorepo/ui');
		expect(wrapper.text()).toContain('Rich UI components');
		expect(wrapper.text()).toContain('@vue-monorepo/utils');
		expect(wrapper.text()).toContain('Utility functions');
	});

	it('emits getStarted event when Get Started button is clicked', async () => {
		const wrapper = mount(WelcomeCard);

		// Find the "Get Started" button
		const getStartedButton = wrapper
			.findAll('button')
			.find((btn) => btn.text().includes('Get Started'));
		expect(getStartedButton?.exists()).toBe(true);

		// Click the button
		await getStartedButton?.trigger('click');

		// Check that the event was emitted
		expect(wrapper.emitted('getStarted')).toBeTruthy();
		expect(wrapper.emitted('getStarted')).toHaveLength(1);
	});

	it('emits learnMore event when Learn More button is clicked', async () => {
		const wrapper = mount(WelcomeCard);

		// Find the "Learn More" button
		const learnMoreButton = wrapper
			.findAll('button')
			.find((btn) => btn.text().includes('Learn More'));
		expect(learnMoreButton?.exists()).toBe(true);

		// Click the button
		await learnMoreButton?.trigger('click');

		// Check that the event was emitted
		expect(wrapper.emitted('learnMore')).toBeTruthy();
		expect(wrapper.emitted('learnMore')).toHaveLength(1);
	});

	it('displays package indicators with correct colors', () => {
		const wrapper = mount(WelcomeCard);
		const html = wrapper.html();

		// Check for colored indicators
		expect(html).toContain('bg-blue-500');
		expect(html).toContain('bg-green-500');
	});
});
