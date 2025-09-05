import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Card from './Card.vue';

describe('Card', () => {
	it('renders slot content', () => {
		const wrapper = mount(Card, {
			slots: {
				default: 'Card content',
			},
		});
		expect(wrapper.text()).toContain('Card content');
	});

	it('applies default variant', () => {
		const wrapper = mount(Card);
		expect(wrapper.classes()).toContain('bg-white');
		expect(wrapper.classes()).toContain('border-gray-200');
	});

	it('applies bordered variant', () => {
		const wrapper = mount(Card, {
			props: { variant: 'bordered' },
		});
		expect(wrapper.classes()).toContain('border-2');
		expect(wrapper.classes()).toContain('border-blue-200');
	});

	it('applies gradient variant', () => {
		const wrapper = mount(Card, {
			props: { variant: 'gradient' },
		});
		expect(wrapper.classes()).toContain('bg-gradient-to-br');
		expect(wrapper.classes()).toContain('from-blue-50');
	});

	it('applies shadow classes', () => {
		const wrapper = mount(Card, {
			props: { shadow: 'lg' },
		});
		expect(wrapper.classes()).toContain('shadow-lg');
	});

	it('applies rounded classes by default', () => {
		const wrapper = mount(Card);
		expect(wrapper.classes()).toContain('rounded-xl');
	});

	it('removes rounded when rounded is false', () => {
		const wrapper = mount(Card, {
			props: { rounded: false },
		});
		expect(wrapper.classes()).not.toContain('rounded-xl');
	});

	it('applies hover classes when hover is true', () => {
		const wrapper = mount(Card, {
			props: { hover: true },
		});
		expect(wrapper.classes()).toContain('hover:shadow-xl');
		expect(wrapper.classes()).toContain('cursor-pointer');
	});

	it('renders header slot when provided', () => {
		const wrapper = mount(Card, {
			slots: {
				header: 'Card Header',
				default: 'Card content',
			},
		});
		expect(wrapper.text()).toContain('Card Header');
		expect(wrapper.find('.border-b').exists()).toBe(true);
	});

	it('renders footer slot when provided', () => {
		const wrapper = mount(Card, {
			slots: {
				footer: 'Card Footer',
				default: 'Card content',
			},
		});
		expect(wrapper.text()).toContain('Card Footer');
		expect(wrapper.find('.border-t').exists()).toBe(true);
	});

	it('renders image when image prop is provided', () => {
		const wrapper = mount(Card, {
			props: {
				image: 'https://example.com/image.jpg',
				imageAlt: 'Test image',
			},
		});
		const img = wrapper.find('img');
		expect(img.exists()).toBe(true);
		expect(img.attributes('src')).toBe('https://example.com/image.jpg');
		expect(img.attributes('alt')).toBe('Test image');
	});

	it('renders badge slot when provided with image', () => {
		const wrapper = mount(Card, {
			props: { image: 'https://example.com/image.jpg' },
			slots: {
				badge: 'New',
			},
		});
		expect(wrapper.text()).toContain('New');
		expect(wrapper.find('.absolute.top-2.right-2').exists()).toBe(true);
	});

	it('applies correct padding classes to content area', () => {
		const wrapper = mount(Card, {
			props: { padding: 'lg' },
			slots: {
				default: 'Content',
			},
		});
		// The content area should have padding classes applied
		const html = wrapper.html();
		expect(html).toContain('px-8');
		expect(html).toContain('py-6');
	});

	it('applies no padding when padding is none', () => {
		const wrapper = mount(Card, {
			props: { padding: 'none' },
			slots: {
				default: 'Content',
			},
		});
		// Content should not have default padding classes
		const html = wrapper.html();
		expect(html).not.toContain('px-6');
		expect(html).not.toContain('py-4');
	});
});
