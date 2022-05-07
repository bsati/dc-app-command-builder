<script lang="ts">
    import type { ApplicationCommand } from "../models/app_command";
    import Command from "./Command.svelte";

    let commands: Partial<ApplicationCommand>[] = [];

    function createCommand() {
        commands = [...commands, { name: "", description: "" }];
    }
</script>

<div class="command-list-container">
    <div class="command-list">
        {#each commands as command}
            <Command {command} />
        {/each}
    </div>
    <div class="button-bar">
        <button on:click={createCommand}>New command</button>
    </div>
</div>
