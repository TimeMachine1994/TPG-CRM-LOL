<script lang='ts'>
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';

	let { data }: { data: PageData } = $props();
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-100">
	<div class="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
		<h1 class="text-2xl font-bold text-center">Welcome, {data.user.username}!</h1>
		<p class="text-center text-gray-600 mt-2">This is your personalized dashboard.</p>

		<form method="post" action="/logout" use:enhance class="mt-6 text-center">
			<button
				class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				type="submit"
			>
				Logout
			</button>
		</form>
	</div>
</div>