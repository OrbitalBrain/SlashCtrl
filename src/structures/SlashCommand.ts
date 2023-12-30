import { CommandInteraction, SlashCommandBuilder } from "discord.js";

/**
 * A slash command
 */
export class SlashCommand extends SlashCommandBuilder {

    /**
     * The guilds that the command is available in
     */
    public guilds?: string[];
    /**
     * Whether the command is enabled
     * @defaultValue true 
     */
    public enabled: boolean = true;

    /**
     * Create a new slash command
     */
    constructor() {
        super();
    }

    /**
     * Function to execute when the command is triggered
     * @param interaction The interaction that triggered the command
     * @returns A promise that resolves when the command is finished executing
     */
    public async execute(interaction: CommandInteraction): Promise<unknown> {
        await interaction.reply("This command has not been implemented yet!");
        throw new Error("Method not implemented.");
    }

}