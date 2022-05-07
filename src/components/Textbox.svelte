<script lang="ts">
    export let label: string;
    export let value: string;
    export let input_type: "text" | "password" = "text";
    export let name = label;
    export let maxlength = -1;
</script>

<div class="input-group">
    <label for={name}>{label}</label>
    <input type={input_type} {value} {name} {maxlength} />
</div>

<style lang="scss">
    .input-group {
        display: flex;
        flex-direction: column;

        input {
            background: var(--background-color-brighter);
            padding: 0.8em;
            color: rgba(255, 255, 255, 0.7);
            border-radius: 0.5em;
            margin: 0.3em 0;
            border: 2px solid rgba(255, 255, 255, 0.1);

            &:focus,
            &:focus-visible {
                outline: 0;
                border-color: var(--primary-color);
            }
        }
    }
</style>
