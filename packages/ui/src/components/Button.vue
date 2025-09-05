<template>
	<button
		:class="buttonClasses"
		:disabled="disabled || loading"
		@click="$emit('click', $event)"
	>
		<!-- Loading spinner -->
		<svg
			v-if="loading"
			class="animate-spin h-5 w-5"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
		>
			<circle
				class="opacity-25"
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				stroke-width="4"
			/>
			<path
				class="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			/>
		</svg>

		<!-- Icon -->
		<span v-else-if="icon" class="text-lg">{{ icon }}</span>

		<!-- Content -->
		<span :class="{ 'opacity-0': loading }">
			<slot />
		</span>
	</button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type Props = {
	variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
	size?: 'sm' | 'md' | 'lg' | 'xl';
	disabled?: boolean;
	loading?: boolean;
	icon?: string;
};

const {
	variant = 'primary',
	size = 'md',
	disabled = false,
	loading = false,
	icon,
} = defineProps<Props>();

defineEmits<{
	click: [MouseEvent];
}>();

const buttonClasses = computed(() => {
	const base =
		'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-offset-2 shadow-lg hover:shadow-xl';

	const variants = {
		primary:
			'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 focus:ring-blue-500/50',
		secondary:
			'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 hover:from-gray-200 hover:to-gray-300 focus:ring-gray-500/50 border border-gray-300',
		danger:
			'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 focus:ring-red-500/50',
		success:
			'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 focus:ring-green-500/50',
		outline:
			'bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500/50',
	};

	const sizes = {
		sm: 'px-3 py-1.5 text-sm min-h-8',
		md: 'px-4 py-2 text-base min-h-10',
		lg: 'px-6 py-3 text-lg min-h-12',
		xl: 'px-8 py-4 text-xl min-h-14',
	};

	const disabledClass =
		disabled || loading
			? 'opacity-60 cursor-not-allowed shadow-none hover:shadow-none transform-none'
			: '';

	return `${base} ${variants[variant]} ${sizes[size]} ${disabledClass}`;
});
</script>
