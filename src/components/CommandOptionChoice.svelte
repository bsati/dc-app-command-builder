<script lang="ts">
    import type { ApplicationCommandOptionChoice } from "../models/app_command";
    import Textbox from "./base/Textbox.svelte";
    export let choice: Partial<ApplicationCommandOptionChoice>;
</script>

<div class="command-choice-container">
    <Textbox label="Name" bind:value={choice.name} />
    <Textbox label="Value" bind:value={choice.value} />
</div>

<style>
    .command-choice-container {
        padding: 0.5em;
        box-shadow: 0px 0px 5px 0px var(--box-shadow);
        border-radius: 0.5em;
        min-width: 5em;
    }
</style>
