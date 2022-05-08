<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import Icon from "../Icon.svelte";

    interface SelectValue {
        display: string;
        value: any;
    }

    export let label: string | undefined = undefined;
    export let options: SelectValue[];
    export let currentIndex = -1;
    let opened = false;

    let selectElement: HTMLElement;
    let optionsElements: HTMLElement;

    function handleWindowClick(event) {
        if (
            event.target.parentNode != selectElement &&
            event.target.parentNode != optionsElements &&
            opened
        ) {
            opened = false;
        }
    }

    const dispatch = createEventDispatcher();
</script>

<svelte:window on:mousedown={handleWindowClick} />

<div
    class="select"
    class:unlabeled={label == undefined}
    bind:this={selectElement}
>
    {#if label != undefined}
        <span class="input-label">{label}</span>
    {/if}
    <div class="select-input" on:click={() => (opened = !opened)}>
        {#if currentIndex >= 0}
            {options[currentIndex].display}
        {:else}
            Select...
        {/if}
        <Icon name="chevron_down" class="select-chevron" />
        {#if opened}
            <div class="select-options" bind:this={optionsElements}>
                {#each options as option, i}
                    <div
                        class="option"
                        on:click={() => {
                            currentIndex = i;
                            dispatch("selectionChanged", {
                                newValue: options[i],
                            });
                        }}
                    >
                        {option.display}
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</div>

<style lang="scss">
    .select-input {
        background: var(--background-color-brighter);
        padding: 0.8em;
        color: var(--input-text-color);
        border-radius: 0.5em;
        margin: 0.3em 0;
        border: 2px solid var(--input-border);
        font-size: 10pt;
        position: relative;

        :global(.select-chevron) {
            position: absolute;
            width: 20px;
            right: 0.5em;
            color: var(--input-text-color);
        }
    }
    .select-options {
        position: absolute;
        top: 3.15em;
        left: 0;
        background: var(--background-color-brighter);
        z-index: 1;
        border-radius: 0.5em;
        width: 100%;
        max-height: 13em;
        overflow-y: scroll;

        .option {
            width: calc(100% - 1em);
            padding: 1em 0.5em;
            cursor: pointer;

            &:first-child {
                border-top-left-radius: 0.5em;
                border-top-right-radius: 0.5em;
            }

            &:last-child {
                border-bottom-left-radius: 0.5em;
                border-bottom-right-radius: 0.5em;
            }

            &:hover {
                background: rgb(255, 255, 255, 0.05);
            }
        }
    }

    .input-label {
        display: inline-block;
    }

    .select:not(.unlabeled) {
        display: grid;
        grid-template-columns: 1fr 8fr;
        gap: 0.5em;
        align-items: center;
    }

    .select.unlabeled {
        display: flex;

        .select-input {
            width: 100%;
        }
    }
</style>
