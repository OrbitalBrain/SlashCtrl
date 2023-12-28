# SlashCtrl

SlashCtrl is a package that makes it easier to create and manage slash commands with DiscordJS.

## Features

-   Easy to use
-   Fast and reliable
-   Integrated with DiscordJS

SlashCtrl creates a simple framework to easily create and manage slash commands with DiscordJS, it also handles all the necessary checks for you, so you don't have to worry about that.

## Installation

To install, simply run the following command:

```bash
npm install slashctrl
```
 or
```bash
yarn add slashctrl
```
or
```bash
pnpm add slashctrl
```

## Usage

First, you'll need to initialize the SlashCtrl class, like so:

```js
const { SlashCtrl } = require('slashctrl');

const slashCtrl = new SlashCtrl({
    token: 'your bot token',
    applicationId: 'your bot application id'
});
```

Then, you'll need to register your commands, you can use the `publishCommandsFromFolder` method to do so:

```js
slashCtrl.publishCommandsFromFolder(path.join(__dirname, 'commands'));
```

Here is an example of a command file

```js
export default class ExampleCOmmand extends SlashCommand {

    constructor() {
        super();
        this.setName("example");
        this.setDescription("This is an example command");
    }

}
```

Since the SlashCommand class extends DiscordJS's [SlashCommandBuilder](https://discord.js.org/docs/packages/builders/main/SlashCommandBuilder:Class), you can use all of its methods to build your command.

Finally, SlashCtrl will need to know when to execute your commands, you can do so by using the `handleCommands` method in your InteractionCreate event, the package will take care of the rest and necessary checks:

```js
client.on('interactionCreate', async interaction => {
    slashCtrl.handleCommands(interaction);
});
```

That's it! You're all set up!

**NOTE**: SlashCtrl is still being worked on with more features coming. Some features may not be fully implemented yet.
