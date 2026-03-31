<script lang="ts">
	import type { BuyerInfo, SellerInfo, UserInfo } from "$lib/user_info";
	import LL from "../../i18n/i18n-svelte";
    
    let user_input: UserInfo = $state({
        type: 0,
        first_name: "",
        last_name: "",
        phone_number: "",
        user_info: undefined
    });
    
    let curr_step = $state(1);
    const last_step_index = 3;

    $effect(() => {        
        if (user_input.type == 0) {
            user_input.user_info = { residence: "" };
        }
        else if(user_input.type == 1) {
            user_input.user_info = { 
                service_type: 0,
                service_title: "",
                service_description: "",
                residence: ""
            };
        }
        else if(user_input.type == 2) {
            user_input.user_info = {
                working_cities: [],
                working_hours: []
            };
        }
    });
</script>

<div>
{#if curr_step == 1}
    <select bind:value={user_input.type}>
        <option value=0>{$LL.BUYER()}</option>
        <option value=1>{$LL.SELLER()}</option>
        <option value=2>{$LL.COURIER()}</option>
    </select>
{/if}
{#if curr_step == 2}
    <label for="first_name">first_name</label> <input bind:value={user_input.first_name} type="text" id="first_name">
    <label for="last_name">last_name</label> <input bind:value={user_input.last_name} type="text" id="last_name">
    <label for="phone_number">phone_number</label> <input bind:value={user_input.phone_number} type="text" id="phone_number">
{/if}

{#if curr_step == 3}
    {#if user_input.type == 0}
        <label for="residence">residence</label> <input bind:value={(user_input.user_info as BuyerInfo).residence} type="text" id="residence">
    {/if}
    {#if  user_input.type == 1}
        <select bind:value={(user_input.user_info as SellerInfo).service_type}>
            <option value=0>Service</option>
            <option value=1>Labour</option>
            <option value=2>Product</option>
        </select>
        <label for="service_title">title</label> <input bind:value={(user_input.user_info as SellerInfo).service_title} type="text" id="service_title">
        <label for="service_description">description</label> <input bind:value={(user_input.user_info as SellerInfo).service_description} type="text" id="service_description">
        <label for="residence">residence</label> <input bind:value={(user_input.user_info as SellerInfo).residence} type="text" id="residence">
    {/if}
    {#if user_input.type == 2}
        <select multiple>
            
        </select>
    {/if}
{/if}
</div>

<button onclick={_ => curr_step = (curr_step - 1) >= 1 ? curr_step - 1 : 1}>back</button>
<button onclick={_ => curr_step = (curr_step + 1) >= last_step_index ? last_step_index : curr_step + 1}>next</button>