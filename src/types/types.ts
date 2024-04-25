import { ButtonStyle } from "discord.js";

/**
 * The settings for the SlashCtrl class.
 * @interface SlashCtrlSettings
 * @property {string} applicationId The application id of the bot.
 * @property {string} token The token of the bot.
 */
export interface SlashCtrlSettings {
    applicationId: string;
    token: string;
    handleInteractions?: boolean;
}

export interface ButtonMetadata {
    interactionHandler: string;
    label: string;
    style: ButtonStyle;
    data?: string;
}