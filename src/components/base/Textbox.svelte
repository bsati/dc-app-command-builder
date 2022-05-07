<script lang="ts">
    export let label: string;
    export let value: string;
    export let input_type: "text" | "password" = "text";
    export let name = label;
    export let maxlength = -1;

    function handleInput(event) {
        value = (event.target as HTMLInputElement).value;
    }
</script>

<div class="input-group">
    <label for={name}>{label}</label>
    <input
        type={input_type}
        {value}
        on:input={handleInput}
        {name}
        {maxlength}
    />
</div>

<style lang="scss">
    .input-group {
        display: flex;
        flex-direction: column;

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
    }
</style>
