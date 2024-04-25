import { ButtonBuilder } from "discord.js";
import { ButtonMetadata } from "../types/types";

export class ButtonUtils {

    public static createButton(buttonMetadata: ButtonMetadata): ButtonBuilder {
        return new ButtonBuilder()
            .setCustomId(this.encodeButtonCustomdId(buttonMetadata.interactionHandler, buttonMetadata.data))
            .setLabel(buttonMetadata.label)
            .setStyle(buttonMetadata.style);
    }

    public static encodeButtonCustomdId(interactionHandler: string, data?: string): string {
        if (interactionHandler.length + (data ? data.length : 0) > 100) {
            throw new Error("The interaction handler and data combined must be less than 100 characters!");
        }
        return `${interactionHandler}${data ? `:${data}` : ""}`;
    }

    public static decodeButtonCustomId(customId: string): { interactionHandler: string, data?: string } {
        const [interactionHandler, data] = customId.split(":");
        return { interactionHandler, data };
    }
}