<template>
	<Card variant="gradient" hover shadow="lg">
		<template #header>
			<h2 class="text-xl font-bold text-gray-800">
				🚀 Welcome to Vue Monorepo
			</h2>
		</template>

		<div class="space-y-4">
			<p class="text-gray-600">
				This example demonstrates the usage of shared packages:
			</p>
			<div class="grid gap-2">
				<div
					v-for="pkg in packages"
					:key="pkg.name"
					class="flex items-center space-x-2"
				>
					<span :class="`w-2 h-2 ${pkg.color} rounded-full`"></span>
					<span
						><strong>{{ pkg.name }}</strong> - {{ pkg.description }}</span
					>
				</div>
			</div>
		</div>

		<template #footer>
			<div class="flex flex-wrap gap-3">
				<Button
					variant="primary"
					size="lg"
					icon="🎯"
					@click="$emit('getStarted')"
				>
					Get Started
				</Button>
				<Button variant="outline" @click="$emit('learnMore')">
					Learn More
				</Button>
			</div>
		</template>
	</Card>
</template>

<script setup lang="ts">
import { Button, Card } from '@vue-monorepo/ui';

const packages = [
	{
		name: '@vue-monorepo/ui',
		description: 'Rich UI components',
		color: 'bg-blue-500',
	},
	{
		name: '@vue-monorepo/utils',
		description: 'Utility functions',
		color: 'bg-green-500',
	},
];

defineEmits<{
	getStarted: [];
	learnMore: [];
}>();
</script>
