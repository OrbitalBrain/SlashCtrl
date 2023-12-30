import { SlashCommand } from "../../structures/SlashCommand";

export default class TestCommand extends SlashCommand {

    constructor() {
        super();
        this.setName("testtwo");
        this.setDescription("Test command");
        this.guilds = ["1189866403285717082"];
    }

}