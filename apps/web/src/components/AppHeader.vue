<template>
	<header class="bg-white border-b border-gray-200 shadow-sm">
		<div class="max-w-6xl mx-auto px-4 py-8 text-center">
			<h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
				{{ title }}
			</h1>
			<p class="text-lg text-gray-600">{{ subtitle }}</p>
		</div>
	</header>
</template>

<script setup lang="ts">
type Props = {
	title: string;
	subtitle: string;
};

const { title, subtitle } = defineProps<Props>();
</script>
