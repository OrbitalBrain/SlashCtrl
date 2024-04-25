import fs from "fs";
import path from "path";
import { BaseInteraction, Collection, CommandInteraction, REST, Routes } from "discord.js";
import { SlashCommand } from "./structures/SlashCommand";
import { SlashCtrlSettings } from "./types/types";

class SlashCtrl {


    private readonly _applicationId: string;

    private readonly _token: string;

    private _commands: Collection<string, SlashCommand>;

    constructor(settings: SlashCtrlSettings) {
        this._applicationId = settings.applicationId;
        this._token = settings.token;
    }

    public async publishCommandsFromFolder(commandsPath: string) {
        const commandFiles = fs
            .readdirSync(commandsPath)
            .filter((file) => (file.endsWith(".ts") || file.endsWith(".js")));
        const commands = new Collection<string, SlashCommand>();
        for (const file of commandFiles) {
            const cmdDir = path.join(commandsPath, file);
            const command = new (require(cmdDir).default)();
            commands.set(command.name, command);
        }
        this.publishCommands(commands);
    }

    public async publishCommands(commands: Collection<string, SlashCommand>) {
        if (commands.size === 0) return;
        this._commands = commands;
        const rest = new REST({ version: "10" }).setToken(
            this._token
        );
        const guildCommands = commands.filter((command) => command.guilds !== undefined && command.enabled);
        const globalCommands = commands.filter((command) => command.guilds === undefined && command.enabled);
        try {

            if (guildCommands.size > 0) {
                console.log("Publishing guild commands")
                guildCommands.forEach((command) => {
                    command.guilds?.forEach((guild) => {
                        console.log("Publishing guild commands")
                        console.log(command.toJSON())
                        rest.post(
                            Routes.applicationGuildCommands(this._applicationId, guild),
                            { body: command.toJSON() }
                        );
                    });
                });
            }
            if (globalCommands.size > 0) {
                rest.put(
                    Routes.applicationCommands(this._applicationId),
                    { body: globalCommands.map((command) => command.toJSON()) }
                );
            }
        } catch (error) {
            console.error(error);
        }
    }

    public handleCommands(interaction: BaseInteraction) {
        if (interaction.isCommand()) {
            this.executeCommand(interaction as CommandInteraction);
        }
    }

    public s(interaction: BaseInteraction) {
        if (interaction.isCommand()) {
            this.executeCommand(interaction as CommandInteraction);
        }
    }

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