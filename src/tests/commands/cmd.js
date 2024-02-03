import { SlashCommand } from "../../structures/SlashCommand";

export default class TestCommand extends SlashCommand {

    constructor() {
        super();
        this.setName("test");
        this.setDescription("Test command");
    }

}