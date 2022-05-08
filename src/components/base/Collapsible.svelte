<script lang="ts">
    import Icon from "../Icon.svelte";

    export let collapsed = false;

    $: icon = collapsed ? "chevron_right" : "chevron_down";
</script>

<div class="collapsible">
    <div
        class="collapsible-header"
        on:click={() => (collapsed = !collapsed)}
        class:collapsed-header={collapsed}
    >
        <Icon name={icon} class="collapse-icon" />
        <slot name="header" />
    </div>
    {#if !collapsed}
        <slot name="content" />
    {/if}
</div>

<style lang="scss">
    :global(.collapse-icon) {
        display: inline-block;
        width: 20px;
        padding-top: 2px;
        margin-right: 0.3em;
    }
    .collapsible-header {
        cursor: pointer;
        padding: 0 0.5em 0 0.5em;
        border-top-left-radius: 0.5em;
        border-top-right-radius: 0.5em;
        display: flex;
        align-items: center;
        flex-direction: row;

        &:hover {
            background: rgba(255, 255, 255, 0.05);
        }
    }

    .collapsed-header {
        border-bottom-left-radius: 0.5em;
        border-bottom-right-radius: 0.5em;
    }
</style>
