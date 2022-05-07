<script lang="ts">
    import type { ApplicationCommandOption } from "../models/app_command";
    import Textbox from "./base/Textbox.svelte";

    export let option: Partial<ApplicationCommandOption>;
</script>

<div class="command-option-container">
    <div class="command-option-info">
        <Textbox label="Name" value={option.name} maxlength={30} />
        <Textbox
            label="Description"
            value={option.description}
            maxlength={100}
        />
    </div>
</div>

<style lang="scss">
    .command-option-container {
        padding: 1.5em;
        box-shadow: 0px 0px 5px 0px var(--box-shadow);
        border-radius: 0.5em;
        margin-bottom: 1em;
    }
</style>
