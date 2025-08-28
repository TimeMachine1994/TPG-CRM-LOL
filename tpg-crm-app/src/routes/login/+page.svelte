<script lang='ts'>
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();

	// Log the form object when it changes (after server response)
	$effect(() => {
		if (form) {
			console.log('Frontend: Form data received from server:', form);
		}
	});

	const handleSubmit = ({
		form,
		data,
		action,
		cancel
	}: {
		form: HTMLFormElement;
		data: FormData;
		action: URL;
		cancel: () => void;
	}) => {
		console.log('Frontend: Submitting form to action:', action);
		console.log('Frontend: Form data:', Object.fromEntries(new FormData(form)));
		// You can also log `data` here if you want to see the response data
		// console.log('Frontend: Response data:', data);
	};
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-100">
	<div class="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
		<h1 class="text-2xl font-bold text-center">Login or Register</h1>
		<form method="post" action="?/authenticate" use:enhance={handleSubmit} class="mt-4">
			<div class="mb-4">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="username">
					Username
				</label>
				<input
					name="username"
					id="username"
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					type="text"
					placeholder="Username"
				/>
			</div>
			<div class="mb-6">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="password">
					Password
				</label>
				<input
					type="password"
					name="password"
					id="password"
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
					placeholder="********"
				/>
			</div>
			<div class="flex items-center justify-between">
				<button
					class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					type="submit"
					name="actionType"
					value="login"
				>
					Login
				</button>
				<button
					formaction="?/authenticate"
					class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					type="submit"
					name="actionType"
					value="register"
				>
					Register
				</button>
			</div>
		</form>
		{#if form?.message}
			<p class="text-red-500 text-xs italic mt-4 text-center">{form.message}</p>
		{/if}
	</div>
</div>