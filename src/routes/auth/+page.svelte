<script lang="ts">
    import type { BuyerInfo, CourierInfo, SellerInfo, UserInfo } from "$lib/user_info";
    import LL from "../../i18n/i18n-svelte";

    let user_input: UserInfo = $state({
        type: 0,
        first_name: "",
        last_name: "",
        phone_number: "",
        user_info: undefined
    });

    let curr_step = $state(1);
    let citiesList: string[] = $state([]);
    const last_step_index = 3;

    $effect(() => {
        if (user_input.type == 0) {
            user_input.user_info = { residence: "" };
        } else if (user_input.type == 1) {
            user_input.user_info = {
                service_type: 0,
                service_title: "",
                service_description: "",
                residence: ""
            };
        } else if (user_input.type == 2) {
            user_input.user_info = {
                working_cities: [],
                working_hours: []
            };
            import("$lib/local_cities").then(data => (citiesList = data.citiesList));
        }
    });

    let curr_working_city_val: string = $state("");
    function submit_working_city(event: KeyboardEvent & { currentTarget: EventTarget & HTMLInputElement }) {
        if (event.key != "Enter") return;
        (user_input.user_info as CourierInfo).working_cities.push(curr_working_city_val);
        curr_working_city_val = "";
    }

    const roleIcons = ["🛍️", "🏪", "🚴"];
    const stepKeys = ["STEP_ROLE", "STEP_PROFILE", "STEP_DETAILS"] as const;
    const serviceTypeKeys = ["SERVICE_TYPE_SERVICE", "SERVICE_TYPE_LABOUR", "SERVICE_TYPE_PRODUCT"] as const;
</script>

<!-- Page wrapper -->
<div class="min-h-screen bg-stone-50 flex items-center justify-center px-4 py-12 font-[system-ui]"
     style="background-image: radial-gradient(circle at 20% 20%, #e0e7ff22 0%, transparent 50%), radial-gradient(circle at 80% 80%, #fef3c722 0%, transparent 50%);">

    <div class="w-full max-w-lg">

        <!-- Header -->
        <div class="mb-10 text-center">
            <h1 class="text-3xl font-bold tracking-tight text-stone-800">{$LL.SIGNUP_TITLE()}</h1>
            <p class="mt-2 text-sm text-stone-500">{$LL.SIGNUP_SUBTITLE()}</p>
        </div>

        <!-- Step indicator -->
        <div class="flex items-center justify-center gap-0 mb-10">
            {#each stepKeys as key, i}
                <div class="flex items-center">
                    <div class="flex flex-col items-center gap-1">
                        <div class="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300
                            {curr_step === i + 1
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-110'
                                : curr_step > i + 1
                                    ? 'bg-indigo-100 text-indigo-600 border-2 border-indigo-300'
                                    : 'bg-white text-stone-400 border-2 border-stone-200'}">
                            {#if curr_step > i + 1}
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                                </svg>
                            {:else}
                                {i + 1}
                            {/if}
                        </div>
                        <span class="text-xs font-medium transition-colors duration-200
                            {curr_step === i + 1 ? 'text-indigo-600' : 'text-stone-400'}">
                            {$LL[key]()}
                        </span>
                    </div>
                    {#if i < stepKeys.length - 1}
                        <div class="w-16 h-0.5 mx-2 mb-4 rounded-full transition-all duration-300
                            {curr_step > i + 1 ? 'bg-indigo-300' : 'bg-stone-200'}">
                        </div>
                    {/if}
                </div>
            {/each}
        </div>

        <!-- Card -->
        <div class="bg-white rounded-2xl shadow-xl shadow-stone-200/60 border border-stone-100 overflow-hidden">

            <div class="p-8">

                <!-- Step 1: Role Selection -->
                {#if curr_step == 1}
                    <div class="space-y-4">
                        <div class="mb-6">
                            <h2 class="text-xl font-semibold text-stone-800">{$LL.ROLE_STEP_TITLE()}</h2>
                            <p class="text-sm text-stone-400 mt-1">{$LL.ROLE_STEP_SUBTITLE()}</p>
                        </div>
                        {#each [
                            { labelKey: "BUYER" as const, descKey: "BUYER_DESC" as const },
                            { labelKey: "SELLER" as const, descKey: "SELLER_DESC" as const },
                            { labelKey: "COURIER" as const, descKey: "COURIER_DESC" as const }
                        ] as role, i}
                            <button
                                type="button"
                                onclick={() => (user_input.type = (i as 0 | 1 | 2))}
                                class="w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer
                                    {user_input.type === i
                                        ? 'border-indigo-500 bg-indigo-50 shadow-sm shadow-indigo-100'
                                        : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50'}">
                                <span class="text-2xl w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm border border-stone-100">
                                    {roleIcons[i]}
                                </span>
                                <div class="flex-1">
                                    <p class="font-semibold text-stone-800 text-sm">{$LL[role.labelKey]()}</p>
                                    <p class="text-xs text-stone-400 mt-0.5">{$LL[role.descKey]()}</p>
                                </div>
                                <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors duration-200
                                    {user_input.type === i ? 'border-indigo-500 bg-indigo-500' : 'border-stone-300'}">
                                    {#if user_input.type === i}
                                        <div class="w-2 h-2 rounded-full bg-white"></div>
                                    {/if}
                                </div>
                            </button>
                        {/each}
                    </div>
                {/if}

                <!-- Step 2: Personal Info -->
                {#if curr_step == 2}
                    <div class="space-y-5">
                        <div class="mb-6">
                            <h2 class="text-xl font-semibold text-stone-800">{$LL.PROFILE_STEP_TITLE()}</h2>
                            <p class="text-sm text-stone-400 mt-1">{$LL.PROFILE_STEP_SUBTITLE()}</p>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div class="space-y-1.5">
                                <label for="first_name" class="block text-xs font-semibold text-stone-500 uppercase tracking-wider">
                                    {$LL.FIRST_NAME()}
                                </label>
                                <input
                                    bind:value={user_input.first_name}
                                    type="text"
                                    id="first_name"
                                    placeholder={$LL.FIRST_NAME_PLACEHOLDER()}
                                    class="w-full px-4 py-3 rounded-xl border-2 border-stone-200 bg-stone-50 text-stone-800 text-sm placeholder-stone-300
                                           focus:outline-none focus:border-indigo-400 focus:bg-white transition-all duration-200"
                                />
                            </div>
                            <div class="space-y-1.5">
                                <label for="last_name" class="block text-xs font-semibold text-stone-500 uppercase tracking-wider">
                                    {$LL.LAST_NAME()}
                                </label>
                                <input
                                    bind:value={user_input.last_name}
                                    type="text"
                                    id="last_name"
                                    placeholder={$LL.LAST_NAME_PLACEHOLDER()}
                                    class="w-full px-4 py-3 rounded-xl border-2 border-stone-200 bg-stone-50 text-stone-800 text-sm placeholder-stone-300
                                           focus:outline-none focus:border-indigo-400 focus:bg-white transition-all duration-200"
                                />
                            </div>
                        </div>
                        <div class="space-y-1.5">
                            <label for="phone_number" class="block text-xs font-semibold text-stone-500 uppercase tracking-wider">
                                {$LL.PHONE_NUMBER()}
                            </label>
                            <div class="relative">
                                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-sm select-none">📞</span>
                                <input
                                    bind:value={user_input.phone_number}
                                    type="text"
                                    id="phone_number"
                                    placeholder={$LL.PHONE_NUMBER_PLACEHOLDER()}
                                    class="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-stone-200 bg-stone-50 text-stone-800 text-sm placeholder-stone-300
                                           focus:outline-none focus:border-indigo-400 focus:bg-white transition-all duration-200"
                                />
                            </div>
                        </div>
                    </div>
                {/if}

                <!-- Step 3: Role-specific Details -->
                {#if curr_step == 3}
                    <div class="space-y-5">
                        <div class="mb-6">
                            <h2 class="text-xl font-semibold text-stone-800">
                                {roleIcons[user_input.type]}
                                {#if user_input.type == 0}{$LL.BUYER()}
                                {:else if user_input.type == 1}{$LL.SELLER()}
                                {:else}{$LL.COURIER()}{/if}
                                {$LL.DETAILS_STEP_TITLE_SUFFIX()}
                            </h2>
                            <p class="text-sm text-stone-400 mt-1">{$LL.DETAILS_STEP_SUBTITLE()}</p>
                        </div>

                        <!-- Buyer -->
                        {#if user_input.type == 0}
                            <div class="space-y-1.5">
                                <label for="residence" class="block text-xs font-semibold text-stone-500 uppercase tracking-wider">
                                    {$LL.RESIDENCE()}
                                </label>
                                <div class="relative">
                                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-sm select-none">📍</span>
                                    <input
                                        bind:value={(user_input.user_info as BuyerInfo).residence}
                                        type="text"
                                        id="residence"
                                        placeholder={$LL.RESIDENCE_PLACEHOLDER()}
                                        class="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-stone-200 bg-stone-50 text-stone-800 text-sm placeholder-stone-300
                                               focus:outline-none focus:border-indigo-400 focus:bg-white transition-all duration-200"
                                    />
                                </div>
                            </div>
                        {/if}

                        <!-- Seller -->
                        {#if user_input.type == 1}
                            <div class="space-y-1.5">
                                <!-- svelte-ignore a11y_label_has_associated_control -->
                                <label class="block text-xs font-semibold text-stone-500 uppercase tracking-wider">
                                    {$LL.SERVICE_TYPE()}
                                </label>
                                <div class="grid grid-cols-3 gap-2">
                                    {#each serviceTypeKeys as key, i}
                                        <button
                                            type="button"
                                            onclick={() => ((user_input.user_info as SellerInfo).service_type = (i as 0 | 1 | 2))}
                                            class="py-2.5 px-3 rounded-xl text-xs font-semibold border-2 transition-all duration-200 cursor-pointer
                                                {(user_input.user_info as SellerInfo).service_type === i
                                                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                                                    : 'bg-white border-stone-200 text-stone-500 hover:border-stone-300'}">
                                            {$LL[key]()}
                                        </button>
                                    {/each}
                                </div>
                            </div>
                            <div class="space-y-1.5">
                                <label for="service_title" class="block text-xs font-semibold text-stone-500 uppercase tracking-wider">
                                    {$LL.SERVICE_TITLE()}
                                </label>
                                <input
                                    bind:value={(user_input.user_info as SellerInfo).service_title}
                                    type="text"
                                    id="service_title"
                                    placeholder={$LL.SERVICE_TITLE_PLACEHOLDER()}
                                    class="w-full px-4 py-3 rounded-xl border-2 border-stone-200 bg-stone-50 text-stone-800 text-sm placeholder-stone-300
                                           focus:outline-none focus:border-indigo-400 focus:bg-white transition-all duration-200"
                                />
                            </div>
                            <div class="space-y-1.5">
                                <label for="service_description" class="block text-xs font-semibold text-stone-500 uppercase tracking-wider">
                                    {$LL.SERVICE_DESCRIPTION()}
                                </label>
                                <textarea
                                    bind:value={(user_input.user_info as SellerInfo).service_description}
                                    id="service_description"
                                    placeholder={$LL.SERVICE_DESCRIPTION_PLACEHOLDER()}
                                    rows="3"
                                    class="w-full px-4 py-3 rounded-xl border-2 border-stone-200 bg-stone-50 text-stone-800 text-sm placeholder-stone-300 resize-none
                                           focus:outline-none focus:border-indigo-400 focus:bg-white transition-all duration-200"
                                ></textarea>
                            </div>
                            <div class="space-y-1.5">
                                <label for="seller_residence" class="block text-xs font-semibold text-stone-500 uppercase tracking-wider">
                                    {$LL.RESIDENCE()}
                                </label>
                                <div class="relative">
                                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-sm select-none">📍</span>
                                    <input
                                        bind:value={(user_input.user_info as SellerInfo).residence}
                                        type="text"
                                        id="seller_residence"
                                        placeholder={$LL.RESIDENCE_PLACEHOLDER()}
                                        class="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-stone-200 bg-stone-50 text-stone-800 text-sm placeholder-stone-300
                                               focus:outline-none focus:border-indigo-400 focus:bg-white transition-all duration-200"
                                    />
                                </div>
                            </div>
                        {/if}

                        <!-- Courier -->
                        {#if user_input.type == 2}
                            <div class="space-y-1.5">
                                <!-- svelte-ignore a11y_label_has_associated_control -->
                                <label class="block text-xs font-semibold text-stone-500 uppercase tracking-wider">
                                    {$LL.WORKING_CITIES()}
                                </label>
                                {#if (user_input.user_info as CourierInfo).working_cities.length > 0}
                                    <div class="flex flex-wrap gap-2 p-3 rounded-xl border-2 border-stone-100 bg-stone-50 min-h-[48px]">
                                        {#each (user_input.user_info as CourierInfo).working_cities as city, i}
                                            <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-lg">
                                                {city}
                                                <button
                                                    type="button"
                                                    aria-label={$LL.REMOVE_CITY({ city })}
                                                    onclick={() => (user_input.user_info as CourierInfo).working_cities.splice(i, 1)}
                                                    class="w-4 h-4 rounded-full bg-indigo-200 hover:bg-indigo-300 flex items-center justify-center text-indigo-600 transition-colors duration-150 cursor-pointer leading-none">
                                                    ×
                                                </button>
                                            </span>
                                        {/each}
                                    </div>
                                {/if}
                                <div class="relative">
                                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-sm select-none">🏙️</span>
                                    <input
                                        bind:value={curr_working_city_val}
                                        type="text"
                                        onkeyup={submit_working_city}
                                        name="cities"
                                        list="cities"
                                        placeholder={$LL.WORKING_CITIES_PLACEHOLDER()}
                                        class="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-stone-200 bg-stone-50 text-stone-800 text-sm placeholder-stone-300
                                               focus:outline-none focus:border-indigo-400 focus:bg-white transition-all duration-200"
                                    />
                                </div>
                                <datalist id="cities">
                                    {#each citiesList as city}
                                        <option
                                            disabled={city[0] == '_' ? true : undefined}
                                            value={city[0] == '_' ? city.substring(1) : city}>
                                            {city[0] == '_' ? city.substring(1) : city}
                                        </option>
                                    {/each}
                                </datalist>
                                <p class="text-xs text-stone-400 flex items-center gap-1">
                                    <span>⌨️</span> {$LL.WORKING_CITIES_HINT()}
                                </p>
                            </div>
                        {/if}

                    </div>
                {/if}

            </div>

            <!-- Footer navigation -->
            <div class="px-8 py-5 bg-stone-50 border-t border-stone-100 flex items-center justify-between gap-4">
                <button
                    type="button"
                    onclick={() => (curr_step = curr_step - 1 >= 1 ? curr_step - 1 : 1)}
                    disabled={curr_step === 1}
                    class="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border-2 border-stone-200 text-stone-500
                           hover:border-stone-300 hover:text-stone-700 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                    </svg>
                    {$LL.BACK()}
                </button>

                <div class="flex gap-1.5">
                    {#each Array(last_step_index) as _, i}
                        <div class="rounded-full transition-all duration-300
                            {curr_step === i + 1 ? 'w-6 h-2 bg-indigo-500' : 'w-2 h-2 bg-stone-200'}">
                        </div>
                    {/each}
                </div>

                <button
                    type="button"
                    onclick={() => (curr_step = curr_step + 1 <= last_step_index ? curr_step + 1 : last_step_index)}
                    class="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 text-white
                           hover:bg-indigo-700 active:scale-95 shadow-md shadow-indigo-200 transition-all duration-200">
                    {curr_step === last_step_index ? $LL.FINISH() : $LL.CONTINUE()}
                    {#if curr_step < last_step_index}
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                        </svg>
                    {:else}
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                        </svg>
                    {/if}
                </button>
            </div>
        </div>

        <p class="text-center text-xs text-stone-400 mt-6">
            {$LL.ALREADY_HAVE_ACCOUNT()} <a href="/login" class="text-indigo-500 font-medium hover:text-indigo-700 transition-colors">{$LL.SIGN_IN()}</a>
        </p>

    </div>
</div>