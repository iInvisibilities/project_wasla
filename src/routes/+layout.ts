import type { LayoutLoad } from './$types';
import { loadLocaleAsync } from '../i18n/i18n-util.async';
import { setLocale } from '../i18n/i18n-svelte';
import { configured_locales, default_lang } from '$lib/lang_config';
import type { Locales } from '../i18n/i18n-types';

export const load: LayoutLoad = async ( { data } ) => {
    for (const configured_locale in configured_locales) {
        await loadLocaleAsync(configured_locales[configured_locale].split(":")[0] as Locales)
    }

    setLocale(default_lang);

    return data;
};
