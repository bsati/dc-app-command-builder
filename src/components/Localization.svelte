<script lang="ts">
    import { Locale, Localization } from "../models/app_command";
    import Select from "./base/Select.svelte";
    import Textbox from "./base/Textbox.svelte";
    import Icon from "./Icon.svelte";

    export let localizations: Localization | undefined;
    let keys: string[];
    $: if (localizations) {
        keys = Object.keys(localizations);
    }

    const locales = [];
    const locale_keys = [];
    const entries = Object.entries(Locale);
    for (let commandType of entries) {
        locale_keys.push(commandType[1]);
        let display = commandType[0].toLowerCase();
        const split = display.split("_");
        display = split
            .map((str) => str[0].toUpperCase() + str.slice(1))
            .join(" ");
        locales.push({
            display: display,
            value: commandType[1],
        });
    }

    function addLocale() {
        if (!localizations) {
            localizations = {};
        }
        const index = keys ? keys.length : 0;
        localizations[locales[index].value] = "";
    }

    function selectionChanged(event, locale: string) {
        localizations = Object.fromEntries(
            Object.entries(localizations).map(([key, value]) => {
                if (key === locale) {
                    return [event.detail.newValue.value, value];
                }
                return [key, value];
            })
        );
    }

    function deleteLocale(locale: string) {
        localizations = Object.fromEntries(
            Object.entries(localizations).filter(([key, _]) => key !== locale)
        );
    }
</script>

<div class="localization-input">
    <span class="label">Localization</span>
    <div class="localizations">
        {#if keys}
            {#each keys as locale}
                <div class="locale">
                    <Select
                        options={locales}
                        currentIndex={locale_keys.findIndex(
                            (l) => l === locale
                        )}
                        on:selectionChanged={(event) =>
                            selectionChanged(event, locale)}
                    />
                    <Textbox bind:value={localizations[locale]} />
                    <div
                        class="delete-locale"
                        on:click={() => deleteLocale(locale)}
                    >
                        <Icon name="delete" class="btn-icon" />
                    </div>
                </div>
            {/each}
        {/if}
        <button class="btn-text" on:click={addLocale}
            ><Icon name="add" class="btn-icon" />Add Localization</button
        >
    </div>
</div>

<style lang="scss">
    .localization-input {
        display: grid;
        gap: 0.5em;
        grid-template-columns: 1fr 8fr;

        .label {
            margin: 0.5em 0 0.3em 0;
            display: block;
        }

        .locale {
            display: grid;
            grid-template-columns: 1fr 1fr 0.05fr;
            gap: 0.5em;
            align-items: center;
        }
    }

    .delete-locale {
        cursor: pointer;
    }
</style>
