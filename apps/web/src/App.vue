<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';
import WelcomeCard from './components/WelcomeCard.vue';
import ComponentShowcase from './components/ComponentShowcase.vue';
import AppFooter from './components/AppFooter.vue';
import { formatDate, titleCase } from '@vue-monorepo/utils';

const currentDate = formatDate(new Date());
const appTitle = titleCase('vue monorepo example');

const handleGetStarted = () => {
	alert('🎯 Ready to start building amazing apps!');
};

const handleLearnMore = () => {
	alert('📚 Check out the documentation for more details!');
};
</script>

<template>
	<div class="min-h-screen bg-gray-50">
		<AppHeader :title="appTitle" :subtitle="currentDate" />

		<main class="max-w-6xl mx-auto px-4 py-8">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<WelcomeCard
					@get-started="handleGetStarted"
					@learn-more="handleLearnMore"
				/>

				<ComponentShowcase />
			</div>
		</main>

		<AppFooter />
	</div>
</template>
