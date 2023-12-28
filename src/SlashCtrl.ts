import fs from "fs";
import path from "path";
import { BaseInteraction, Collection, CommandInteraction, REST, Routes } from "discord.js";
import { SlashCommand } from "./structures/SlashCommand";
import { SlashCtrlSettings } from "./types/types";

/**
 * The SlashCtrl class
 * @class SlashCtrl
 */
class SlashCtrl {

    /**
     * The application id of the bot
     * @private
     * @readonly
     * @type {string}
     */ 
    private readonly _applicationId: string;
    /**
     * The token of the bot
     * @private
     * @readonly
     * @type {string}
     */
    private readonly _token: string;

    /**
     * The commands
     * @private
     * @type {Collection<string, SlashCommand>}
     */
    private _commands: Collection<string, SlashCommand>;

    /**
     * Create a new SlashCtrl instance
     * @param {SlashCtrlSettings} settings The settings for the SlashCtrl instance
     */
    constructor(settings: SlashCtrlSettings) {
        this._applicationId = settings.applicationId;
        this._token = settings.token;
    }

    /**
     * Publish commands from a folder
     * @param commandsPath The path to the folder containing the commands
     */
    public async publishCommandsFromFolder(commandsPath: string) {
        const commandFiles = fs
            .readdirSync(commandsPath)
            .filter((file) => file.endsWith(".ts"));
        const commands = new Collection<string, SlashCommand>();
        for (const file of commandFiles) {
            const cmdDir = path.join(commandsPath, file);
            const command = new (require(cmdDir).default)();
            commands.set(command.name, command);
        }
        this.publishCommands(commands);
    }

    /**
     * Publish commands
     * @param commands The commands to publish
     */
    public async publishCommands(commands: Collection<string, SlashCommand>) {
        if (commands.size === 0) return;
        this._commands = commands;
        const rest = new REST({ version: "10" }).setToken(
            this._token
        );
        try {
            rest.put(
                Routes.applicationCommands(this._applicationId),
                { body: commands.filter((command => command.enabled)).map((command) => command.toJSON()) }
            );
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Handle commands
     * @param interaction The interaction to handle
     */
    public handleCommands(interaction: BaseInteraction) {
        if (interaction.isCommand()) {
            this.executeCommand(interaction as CommandInteraction);
        }
    }

    /**
     * Execute a command
     * @param interaction The interaction that triggered the command
     * @private
     */
    private executeCommand(interaction: CommandInteraction) {
        const command = this.commands.get(interaction.commandName);
        if (!command)
            return interaction.reply({
                content: "There was an error while executing this command!",
                ephemeral: true,
            });
        try {
            command.execute(interaction);
        } catch (error) {
            console.error(error);
            interaction.reply({
                content: "There was an error while executing this command!",
                ephemeral: true,
            });
        }
    }

    public get commands(): Collection<string, SlashCommand> {
        return this._commands;
    }

}

export { SlashCtrl }

export default SlashCtrl;