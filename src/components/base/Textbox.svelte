<script lang="ts">
    export let label: string | undefined = undefined;
    export let value: string | number;
    export let html_input_type: "text" | "password" = "text";
    export let input_type: "integer" | "float" | undefined = undefined;
    export let name = label;
    export let maxlength = -1;

    function handleInput(event) {
        const val = (event.target as HTMLInputElement).value;
        if (input_type === "integer") {
            value = parseInt(val);
        } else if (input_type === "float") {
            value = parseFloat(val);
        } else {
            value = val;
        }
    }
</script>

<div class="input-group" class:unlabeled={label == undefined}>
    {#if label != undefined}
        <label class="input-label" for={name}>{label}</label>
    {/if}
    <input
        type={html_input_type}
        value={value ? value : ""}
        on:input={handleInput}
        {name}
        {maxlength}
    />
</div>

<style lang="scss">
    .input-group:not(.unlabeled) {
        display: grid;
        grid-template-columns: 1fr 8fr;
        gap: 0.5em;
        align-items: center;
    }

    .input-group.unlabeled {
        display: flex;

        input {
            width: 100%;
        }
    }

    input {
        background: var(--background-color-brighter);
        padding: 0.8em;
        color: var(--input-text-color);
        border-radius: 0.5em;
        margin: 0.3em 0;
        border: 2px solid var(--input-border);

        &:focus,
        &:focus-visible {
            outline: 0;
            border-color: var(--primary-color);
        }
    }
</style>
