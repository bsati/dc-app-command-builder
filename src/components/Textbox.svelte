<script lang="ts">
    export let label: string;
    export let value: string;
    export let input_type: "text" | "password" = "text";
    export let name = label;
</script>

<div class="input-group">
    <label for={name}>{label}</label>
    <input type={input_type} {value} {name} />
</div>

<style>
    .input-group {
        display: flex;
        flex-direction: column;
    }
</style>
