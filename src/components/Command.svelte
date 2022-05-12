<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import Highlight from "svelte-highlight";
    import json from "svelte-highlight/languages/json";
    import atomOneDark from "svelte-highlight/styles/atom-one-dark";
    import {
        ApplicationCommand,
        ApplicationCommandType,
        build_permissions,
        Permission,
    } from "../models/app_command";
    import { buildOptionsFromEnum } from "../util/enum_util";
    import Checkbox from "./base/Checkbox.svelte";
    import Collapsible from "./base/Collapsible.svelte";
    import Select from "./base/Select.svelte";
    import Textbox from "./base/Textbox.svelte";
    import CommandOption from "./CommandOption.svelte";
    import Icon from "./Icon.svelte";
    import Localization from "./Localization.svelte";

    export let command: Partial<ApplicationCommand>;
    $: command_json = JSON.stringify(command, null, 4);

    const dispatch = createEventDispatcher();

    function addOption() {
        if (!command.options) {
            command.options = [];
        }
        command.options = [...command.options, { name: "", description: "" }];
    }

    function copyJSONToClipboard() {
        navigator.clipboard.writeText(command_json);
    }

    let commandTypes = buildOptionsFromEnum(ApplicationCommandType);

    let defaultCommandType = 0;
    $: command.type = commandTypes[defaultCommandType].value;

    let permissions = buildOptionsFromEnum(Permission);

    function setPermissions(permissions) {
        command.default_member_permissions = build_permissions(
            permissions.map((p) => p.value)
        );
    }
</script>

<svelte:head>
    {@html atomOneDark}
</svelte:head>

<div class="command-container">
    <Collapsible>
        <div class="container-header" slot="header">
            <h2 class="heading">Command</h2>
            <div
                class="delete-icon-wrapper"
                on:click={() => dispatch("remove")}
            >
                <Icon name="delete" class="delete-icon" />
            </div>
        </div>
        <div class="content" slot="content">
            <Textbox label="GuildID" bind:value={command.guild_id} />
            <Textbox label="Name" bind:value={command.name} maxlength={32} />
            <Localization bind:localizations={command.name_localizations} />
            <Textbox
                label="Description"
                bind:value={command.description}
                maxlength={100}
            />
            <Localization
                bind:localizations={command.description_localizations}
            />
            <Select
                label="Type"
                options={commandTypes}
                bind:currentIndex={defaultCommandType}
            />
            <Select
                label="Permissions"
                options={permissions}
                selectionMode="multiple"
                on:selectionChanged={(event) =>
                    setPermissions(event.detail.values)}
            />
            {#if !command.guild_id}
                <Checkbox
                    label="DM Permission"
                    bind:value={command.dm_permission}
                />
            {/if}
            <div class="command-options">
                {#if command.options}
                    {#each command.options as option, i}
                        <CommandOption
                            bind:option
                            on:remove={() => {
                                command.options.splice(i, 1);
                                if (command.options.length === 0) {
                                    command.options = undefined;
                                } else {
                                    command.options = option.options;
                                }
                            }}
                        />
                    {/each}
                {/if}
            </div>
            <div class="button-bar">
                <button on:click={addOption}>
                    <Icon name="add" class="btn-icon" />Add Option
                </button>
            </div>
            <div class="output-json-container">
                <Highlight language={json} code={command_json} />
                <button class="copy-button" on:click={copyJSONToClipboard}>
                    <Icon name="copy" class="btn-icon" />Copy
                </button>
            </div>
        </div>
    </Collapsible>
</div>

<style lang="scss">
    .command-container {
        box-shadow: 0px 0px 10px 3px var(--box-shadow);
        border-radius: 0.5em;
        margin-bottom: 1em;

        .container-header {
            width: 100%;
        }

        .content {
            padding: 1em;
        }
    }

    .command-options {
        margin: 1em 0;
    }

    .output-json-container {
        position: relative;
    }

    .copy-button {
        position: absolute;
        top: 1em;
        right: 1em;
    }
</style>
