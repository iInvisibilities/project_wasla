<script lang="ts">
	import './layout.css';
	import { setLocale } from '../i18n/i18n-svelte';
	import type { Locales } from '../i18n/i18n-types';
	import { configured_locales, default_lang } from '$lib/lang_config';
	import { onMount } from 'svelte';

	let { children } = $props();
	let selLang: string | Locales | null = $state(default_lang);
	
	onMount(() => {
		selLang = localStorage.getItem("lang");
		if (selLang == null) {
			localStorage.setItem("lang", default_lang);
			selLang = default_lang;
		}

    	setLocale(selLang as Locales);
	});

	const updateLang = () => {
		setLocale(selLang as Locales);
		localStorage.setItem("lang", selLang as Locales);
	}
</script>

<!--<svelte:head><link rel="icon" href={favicon} /></svelte:head> -->
<div class="fixed top-3 right-3">
	<select
		name="lang_sel"
		bind:value={selLang}
		onchange={updateLang}
		aria-label="Select language"
		class="appearance-none rounded-xl border border-gray-300 bg-white px-4 py-2 pr-10 text-sm font-medium text-gray-800 shadow-sm transition duration-200 outline-none hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
	>
		{#each configured_locales as configured_locale}
			<option value={configured_locale.split(':')[0]}>
				{configured_locale.split(':')[1]}
			</option>
		{/each}
	</select>

	<div class="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-4 w-4"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			stroke-width="2"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
		</svg>
	</div>
</div>
{@render children()}
