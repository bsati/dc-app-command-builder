export function buildOptionsFromEnum(enumType) {
    let options = [];
    const entries = Object.entries(enumType);
    entries.splice(0, entries.length / 2);
    for (let entry of entries) {
        let display = entry[0].toLowerCase();
        const split = display.split("_");
        display = split
            .map((str) => str[0].toUpperCase() + str.slice(1))
            .join(" ");
        options.push({
            display: display,
            value: entry[1],
        });
    }
    return options;
}