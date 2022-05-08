type Snowflake = string;

export interface ApplicationCommand {
    id: Snowflake,
    type?: ApplicationCommandType,
    application_id: Snowflake,
    guild_id?: Snowflake,
    name: string,
    name_localizations?: Localization
    description: string,
    description_localizations?: Localization,
    options?: Partial<ApplicationCommandOption>[], // max 25
    default_member_permissions?: string,
    dm_permission?: boolean
    version: Snowflake
}

export interface ApplicationCommandOption {
    type: ApplicationCommandOptionType,
    name: string, // 1-32 chars
    name_localizations?: Localization,
    description: string, // 1-100 chars
    description_localizations: Localization,
    required?: boolean,
    choices?: Partial<ApplicationCommandOptionChoice>[], // max 25
    options?: Partial<ApplicationCommandOption>[], // max 25
    channel_types?: ChannelType[],
    min_value?: number,
    max_value?: number,
    autocomplete?: boolean
}

export interface ApplicationCommandOptionChoice {
    name: string, // max 100 chars
    name_localizations: Localization,
    value: string | number; // max 100 chars
}

export enum ApplicationCommandOptionType {
    SUB_COMMAND = 1,
    SUB_COMMAND_GROUP = 2,
    STRING = 3,
    INTEGER = 4,
    BOOLEAN = 5,
    USER = 6,
    CHANNEL = 7,
    ROLE = 8,
    MENTIONABLE = 9,
    NUMBER = 10,
    ATTACHMENT = 11,
}

export enum ChannelType {
    GUILD_TEXT = 0,
    DM = 1,
    GUILD_VOICE = 2,
    GROUP_DM = 3,
    GUILD_CATEGORY = 4,
    GUILD_NEWS = 5,
    GUILD_NEWS_THREAD = 10,
    GUILD_PUBLIC_THREAD = 11,
    GUILD_PRIVATE_THREAD = 12,
    GUILD_STAGE_VOICE = 13,
    GUILD_DIRECTORY = 14,
    GUILD_FORUM = 15,
}

export interface Localization {
    [key: string]: string;
}

export enum Locale {
    Danish = 'da',
    German = 'de',
    English_UK = 'en-GB',
    English_US = 'en-US',
    Spanish = 'es-ES',
    French = 'fr',
    Croatian = 'hr',
    Italian = 'it',
    Lithuanian = 'lt',
    Hungarian = 'hu',
    Dutch = 'nl',
    Norwegian = 'no',
    Polish = 'pl',
    Portuguese_Brazilian = 'pt-BR',
    Romanian = 'ro',
    Finnish = 'fi',
    Swedish = 'sv-SE',
    Vietnamese = 'vi',
    Turkish = 'tr',
    Czech = 'cs',
    Greek = 'el',
    Bulgarian = 'bg',
    Russian = 'ru',
    Ukrainian = 'uk',
    Hindi = 'hi',
    Thai = 'th',
    Chinese_China = 'zh-CN',
    Japanese = 'ja',
    Chinese_Taiwan = 'zh-TW',
    Korean = 'ko',
}

export enum ApplicationCommandType {
    CHAT_INPUT = 1,
    USER = 2,
    MESSAGE = 3
}

export function build_permissions(permissions: Permission[]): string {
    let result = 0;
    for (let permission of permissions) {
        result |= permission;
    }
    return result.toString();
}

export enum Permission {
    CREATE_INSTANT_INVITE = (1 << 0),
    KICK_MEMBERS = (1 << 1),
    BAN_MEMBERS = (1 << 2),
    ADMINISTRATOR = (1 << 3),
    MANAGE_CHANNELS = (1 << 4),
    MANAGE_GUILD = (1 << 5),
    ADD_REACTIONS = (1 << 6),
    VIEW_AUDIT_LOG = (1 << 7),
    PRIORITY_SPEAKER = (1 << 8),
    STREAM = (1 << 9),
    VIEW_CHANNEL = (1 << 10),
    SEND_MESSAGES = (1 << 11),
    SEND_TTS_MESSAGES = (1 << 12),
    MANAGE_MESSAGES = (1 << 13),
    EMBED_LINKS = (1 << 14),
    ATTACH_FILES = (1 << 15),
    READ_MESSAGE_HISTORY = (1 << 16),
    MENTION_EVERYONE = (1 << 17),
    USE_EXTERNAL_EMOJIS = (1 << 18),
    VIEW_GUILD_INSIGHTS = (1 << 19),
    CONNECT = (1 << 20),
    SPEAK = (1 << 21),
    MUTE_MEMBERS = (1 << 22),
    DEAFEN_MEMBERS = (1 << 23),
    MOVE_MEMBERS = (1 << 24),
    USE_VAD = (1 << 25),
    CHANGE_NICKNAME = (1 << 26),
    MANAGE_NICKNAMES = (1 << 27),
    MANAGE_ROLES = (1 << 28),
    MANAGE_WEBHOOKS = (1 << 29),
    MANAGE_EMOJIS_AND_STICKERS = (1 << 30),
    USE_APPLICATION_COMMANDS = (1 << 31),
    REQUEST_TO_SPEAK = (1 << 32),
    MANAGE_EVENTS = (1 << 33),
    MANAGE_THREADS = (1 << 34),
    CREATE_PUBLIC_THREADS = (1 << 35),
    CREATE_PRIVATE_THREADS = (1 << 36),
    USE_EXTERNAL_STICKERS = (1 << 37),
    SEND_MESSAGES_IN_THREADS = (1 << 38),
    USE_EMBEDDED_ACTIVITIES = (1 << 39),
    MODERATE_MEMBERS = (1 << 40)
}