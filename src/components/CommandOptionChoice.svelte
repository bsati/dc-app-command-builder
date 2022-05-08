<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import {
        ApplicationCommandOptionChoice,
        ApplicationCommandOptionType,
    } from "../models/app_command";
    import Textbox from "./base/Textbox.svelte";
    import Icon from "./Icon.svelte";
    export let choice: Partial<ApplicationCommandOptionChoice>;
    export let optionType: ApplicationCommandOptionType;

    const dispatch = createEventDispatcher();

    let input_type: "integer" | "float" | undefined;
    $: switch (optionType) {
        case ApplicationCommandOptionType.STRING:
            input_type = undefined;
            break;
        case ApplicationCommandOptionType.INTEGER:
            input_type = "integer";
            break;
        case ApplicationCommandOptionType.NUMBER:
            input_type = "float";
    }
</script>

<div class="command-choice-container">
    <div class="container-header">
        <h4 class="heading">Choice</h4>
        <div class="delete-icon-wrapper" on:click={() => dispatch("remove")}>
            <Icon name="delete" class="delete-icon" />
        </div>
    </div>
    <Textbox label="Name" bind:value={choice.name} />
    <Textbox label="Value" bind:value={choice.value} {input_type} />
</div>

<style lang="scss">
    .command-choice-container {
        padding: 0 0.5em 0.5em 0.5em;
        box-shadow: 0px 0px 5px 0px var(--box-shadow);
        border-radius: 0.5em;
        min-width: 5em;
        position: relative;

        :global(.delete-icon) {
            right: 0;
        }
    }
</style>
