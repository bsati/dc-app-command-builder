<script lang="ts">
    import type { ApplicationCommandOption } from "../models/app_command";
    import Textbox from "./Textbox.svelte";

    export let option: Partial<ApplicationCommandOption>;
</script>

<div class="command-option-container">
    <Textbox label="Name" value={option.name} />
    <Textbox label="Description" value={option.description} />
</div>
