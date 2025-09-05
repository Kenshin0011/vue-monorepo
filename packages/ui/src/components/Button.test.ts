import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Button from './Button.vue';

describe('Button', () => {
	it('renders slot content', () => {
		const wrapper = mount(Button, {
			slots: {
				default: 'Click me',
			},
		});
		expect(wrapper.text()).toContain('Click me');
	});

	it('applies primary variant by default', () => {
		const wrapper = mount(Button);
		expect(wrapper.classes()).toContain('from-blue-600');
	});

	it('applies secondary variant', () => {
		const wrapper = mount(Button, {
			props: { variant: 'secondary' },
		});
		expect(wrapper.classes()).toContain('from-gray-100');
	});

	it('handles disabled state', () => {
		const wrapper = mount(Button, {
			props: { disabled: true },
		});
		expect(wrapper.classes()).toContain('opacity-60');
		expect(wrapper.attributes('disabled')).toBeDefined();
	});

	it('handles loading state', () => {
		const wrapper = mount(Button, {
			props: { loading: true },
		});
		expect(wrapper.find('svg').exists()).toBe(true);
		expect(wrapper.attributes('disabled')).toBeDefined();
	});

	it('emits click event', async () => {
		const wrapper = mount(Button);
		await wrapper.trigger('click');
		expect(wrapper.emitted('click')).toBeTruthy();
	});

	it('shows icon when provided', () => {
		const wrapper = mount(Button, {
			props: { icon: '🚀' },
		});
		expect(wrapper.text()).toContain('🚀');
	});
});
