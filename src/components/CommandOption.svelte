<script lang="ts">
    import {
        ApplicationCommandOption,
        ApplicationCommandOptionType,
    } from "../models/app_command";
    import Select from "./base/Select.svelte";
    import Textbox from "./base/Textbox.svelte";
    import Icon from "./Icon.svelte";

    export let option: Partial<ApplicationCommandOption>;

    function addOption() {
        if (!option.options) {
            option.options = [];
        }
        option.options = [...option.options, { name: "", description: "" }];
    }

    let commandOptionTypes = [];
    const entries = Object.entries(ApplicationCommandOptionType);
    entries.splice(0, entries.length / 2);
    for (let commandType of entries) {
        let display = commandType[0].toLowerCase();
        const split = display.split("_");
        display = split
            .map((str) => str[0].toUpperCase() + str.slice(1))
            .join(" ");
        commandOptionTypes.push({
            display: display,
            value: commandType[1],
        });
    }

    let defaultOptionType = 2;
    $: option.type = commandOptionTypes[defaultOptionType].value;
    $: if (
        option.type != ApplicationCommandOptionType.SUB_COMMAND &&
        option.type != ApplicationCommandOptionType.SUB_COMMAND_GROUP &&
        option.options
    ) {
        option.options = undefined;
    }
</script>

<div class="command-option-container">
    <div class="command-option-info">
        <Textbox label="Name" bind:value={option.name} maxlength={32} />
        <Textbox
            label="Description"
            bind:value={option.description}
            maxlength={100}
        />
        <Select
            label="Type"
            options={commandOptionTypes}
            bind:currentIndex={defaultOptionType}
        />
        {#if option.type === ApplicationCommandOptionType.SUB_COMMAND || option.type === ApplicationCommandOptionType.SUB_COMMAND_GROUP}
            {#if option.options}
                {#each option.options as child_option}
                    <svelte:self option={child_option} />
                {/each}
            {/if}
            <div class="button-bar">
                <button on:click={addOption}>
                    <Icon name="add" class="btn-icon" />Add Option
                </button>
            </div>
        {/if}
    </div>
</div>

<style lang="scss">
    .command-option-container {
        padding: 1em 1.5em;
        box-shadow: 0px 0px 5px 0px var(--box-shadow);
        border-radius: 0.5em;
        margin-bottom: 1em;
    }
</style>
