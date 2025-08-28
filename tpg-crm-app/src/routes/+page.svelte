<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-100">
	<div class="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
		{#if data.user}
			<h1 class="text-2xl font-bold text-center">Welcome back, {data.user.username}!</h1>
			<p class="text-center text-gray-600 mt-2">You are logged in.</p>
			<div class="mt-6 text-center">
				<a
					href="/dashboard"
					class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
					Go to Dashboard
				</a>
			</div>
		{:else}
			<h1 class="text-2xl font-bold text-center">Welcome to Tributestream!</h1>
			<p class="text-center text-gray-600 mt-2">Please log in or register to continue.</p>
			<div class="mt-6 text-center">
				<a
					href="/login"
					class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
					Login / Register
				</a>
			</div>
		{/if}
	</div>
</div>
