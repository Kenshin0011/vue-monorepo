<template>
	<div :class="cardClasses">
		<!-- Header -->
		<div v-if="$slots.header" :class="headerClasses">
			<slot name="header" />
		</div>

		<!-- Image -->
		<div v-if="image" class="relative overflow-hidden">
			<img
				:src="image"
				:alt="imageAlt"
				class="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
			/>
			<div v-if="$slots.badge" class="absolute top-2 right-2">
				<slot name="badge" />
			</div>
		</div>

		<!-- Content -->
		<div :class="contentClasses">
			<slot />
		</div>

		<!-- Footer -->
		<div v-if="$slots.footer" :class="footerClasses">
			<slot name="footer" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type Props = {
	shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
	rounded?: boolean;
	hover?: boolean;
	padding?: 'none' | 'sm' | 'md' | 'lg';
	image?: string;
	imageAlt?: string;
	variant?: 'default' | 'bordered' | 'elevated' | 'gradient';
};

const {
	shadow = 'md',
	rounded = true,
	hover = false,
	padding = 'md',
	image,
	imageAlt = '',
	variant = 'default',
} = defineProps<Props>();

const cardClasses = computed(() => {
	const base = 'overflow-hidden transition-all duration-300 transform';

	const variants = {
		default: 'bg-white border border-gray-200',
		bordered: 'bg-white border-2 border-blue-200',
		elevated: 'bg-white',
		gradient:
			'bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200',
	};

	const shadows = {
		none: '',
		sm: 'shadow-sm',
		md: 'shadow-md',
		lg: 'shadow-lg',
		xl: 'shadow-xl',
		'2xl': 'shadow-2xl',
	};

	const roundedClass = rounded ? 'rounded-xl' : '';
	const hoverClass = hover
		? 'hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] cursor-pointer'
		: '';

	return `${base} ${variants[variant]} ${shadows[shadow]} ${roundedClass} ${hoverClass}`;
});

const headerClasses = computed(() => {
	const base =
		'border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100';
	const paddingClasses = {
		none: '',
		sm: 'px-4 py-3',
		md: 'px-6 py-4',
		lg: 'px-8 py-6',
	};
	return `${base} ${paddingClasses[padding]}`;
});

const contentClasses = computed(() => {
	const paddingClasses = {
		none: '',
		sm: 'px-4 py-3',
		md: 'px-6 py-4',
		lg: 'px-8 py-6',
	};
	return paddingClasses[padding];
});

const footerClasses = computed(() => {
	const base =
		'border-t border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100';
	const paddingClasses = {
		none: '',
		sm: 'px-4 py-3',
		md: 'px-6 py-4',
		lg: 'px-8 py-6',
	};
	return `${base} ${paddingClasses[padding]}`;
});
</script>
