import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export class SlashCommand extends SlashCommandBuilder {

    private _guilds?: string[];

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

    /**
     * The guilds that the command is available in
     * @returns An array of guild ids
     */
    public get guilds(): string[] | undefined {
        return this._guilds;
    }

    /**
     * Set the guilds that the command is available in
     * @param guilds An array of guild ids
     */
    public set guilds(guilds: string[] | undefined) {
        this._guilds = guilds;
    }

}