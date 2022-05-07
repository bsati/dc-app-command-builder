<script lang="ts">
    import Highlight from "svelte-highlight";
    import json from "svelte-highlight/languages/json";
    import atomOneDark from "svelte-highlight/styles/atom-one-dark";
    import {
        ApplicationCommand,
        ApplicationCommandType,
    } from "../models/app_command";
    import Select from "./base/Select.svelte";
    import Textbox from "./base/Textbox.svelte";
    import CommandOption from "./CommandOption.svelte";
    import Icon from "./Icon.svelte";

    export let command: Partial<ApplicationCommand>;
    $: command_json = JSON.stringify(command, null, 4);

    function addOption() {
        if (!command.options) {
            command.options = [];
        }
        command.options = [...command.options, { name: "", description: "" }];
    }

    function copyJSONToClipboard() {
        navigator.clipboard.writeText(command_json);
    }

    let commandTypes = [];
    const entries = Object.entries(ApplicationCommandType);
    entries.splice(0, entries.length / 2);
    for (let commandType of entries) {
        let display = commandType[0].toLowerCase();
        const split = display.split("_");
        display = split
            .map((str) => str[0].toUpperCase() + str.slice(1))
            .join(" ");
        commandTypes.push({
            display: display,
            value: commandType[1],
        });
    }

    let defaultCommandType = 0;
    $: command.type = commandTypes[defaultCommandType].value;
</script>

<svelte:head>
    {@html atomOneDark}
</svelte:head>

<div class="command-container">
    <Textbox label="Name" bind:value={command.name} maxlength={32} />
    <Textbox
        label="Description"
        bind:value={command.description}
        maxlength={100}
    />
    <Select
        label="Type"
        options={commandTypes}
        bind:currentIndex={defaultCommandType}
    />
    <div class="command-options">
        {#if command.options}
            {#each command.options as option}
                <CommandOption bind:option />
            {/each}
        {/if}
    </div>
    <div class="button-bar">
        <button on:click={addOption}>
            <Icon name="add" class="btn-icon" />Add Option
        </button>
    </div>
    <div class="output-json-container">
        <Highlight language={json} code={command_json} />
        <button class="copy-button" on:click={copyJSONToClipboard}>
            <Icon name="copy" class="btn-icon" />Copy
        </button>
    </div>
</div>

<style lang="scss">
    .command-container {
        padding: 1em 1.5em;
        box-shadow: 0px 0px 10px 3px var(--box-shadow);
        border-radius: 0.5em;
        margin-bottom: 1em;
    }

    .command-options {
        margin: 1em 0;
    }

    .output-json-container {
        position: relative;
    }

    .copy-button {
        position: absolute;
        top: 1em;
        right: 1em;
    }
</style>
