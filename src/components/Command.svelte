<script lang="ts">
    import Highlight from "svelte-highlight";
    import json from "svelte-highlight/languages/json";
    import atomOneDark from "svelte-highlight/styles/atom-one-dark";
    import type { ApplicationCommand } from "../models/app_command";
    import CommandOption from "./CommandOption.svelte";
    import Textbox from "./Textbox.svelte";

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
</script>

<svelte:head>
    {@html atomOneDark}
</svelte:head>

<div class="command-container">
    <Textbox label="Name" value={command.name} />
    <Textbox label="Description" value={command.description} />
    {#if command.options}
        {#each command.options as option}
            <CommandOption {option} />
        {/each}
    {/if}
    <div class="output-json-container">
        <Highlight language={json} code={command_json} />
        <button class="copy-button" on:click={copyJSONToClipboard}>Copy</button>
    </div>
    <div class="button-bar">
        <button on:click={addOption}>Add Option</button>
    </div>
</div>

<style lang="scss">
    .command-container {
        padding: 1.5em;
        box-shadow: 0px 0px 10px 3px #0f1011;
        border-radius: 0.5em;
        margin-bottom: 1em;
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
