<template>
	<Card variant="bordered" hover shadow="md">
		<template #header>
			<h3 class="text-lg font-semibold text-gray-800">✨ Rich Components</h3>
		</template>

		<div class="space-y-4">
			<p class="text-gray-600">Try out different button variants:</p>

			<div class="space-y-3">
				<div class="flex flex-wrap gap-2">
					<Button variant="success" size="sm" icon="✅">Success</Button>
					<Button variant="danger" size="sm" icon="🚨">Danger</Button>
					<Button variant="secondary" size="sm">Secondary</Button>
				</div>

				<div class="flex flex-wrap gap-2">
					<Button variant="primary" size="lg">Large Button</Button>
					<Button variant="outline" size="xl">Extra Large</Button>
				</div>

				<div class="flex flex-wrap gap-2">
					<Button
						variant="primary"
						:loading="loading"
						@click="handleLoadingTest"
					>
						{{ loading ? 'Loading...' : 'Test Loading' }}
					</Button>
					<Button variant="success" icon="💾">With Icon</Button>
				</div>
			</div>
		</div>
	</Card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Button, Card } from '@vue-monorepo/ui';

const loading = ref(false);

const handleLoadingTest = () => {
	loading.value = true;
	setTimeout(() => {
		loading.value = false;
	}, 2000);
};
</script>
