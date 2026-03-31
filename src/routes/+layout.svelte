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
<select name="lang_sel" bind:value={selLang} onchange={updateLang}>
	{#each configured_locales as configured_locale}
		<option selected={configured_locale.split(":")[0] == default_lang ? true : undefined} value={configured_locale.split(":")[0]}>{configured_locale.split(":")[1]}</option>
	{/each}
</select>
{@render children()}
