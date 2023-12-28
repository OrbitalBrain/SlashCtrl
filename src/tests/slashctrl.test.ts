import dotenv from 'dotenv';
import path from 'path';
import { SlashCtrl } from '..'
import { REST, Routes } from 'discord.js';

let slashCtrl: SlashCtrl;

describe('SlashCtrl', () => {
  beforeAll(() => {
    dotenv.config();
    //Init
    if(!process.env.APPLICATION_ID) throw new Error('APPLICATION_ID not found in .env');
    if(!process.env.TOKEN) throw new Error('TOKEN not found in .env');
    slashCtrl = new SlashCtrl({
        applicationId: process.env.APPLICATION_ID,
        token: process.env.TOKEN,
    });
  });

  test('publishCommandsFromFolder', async () => {
    slashCtrl.publishCommandsFromFolder(path.join(__dirname, '/commands'));

    const rest = new REST({ version: "10" }).setToken(
        process.env.TOKEN!
    );
    try {
        const commands = await rest.get(
            Routes.applicationCommands(process.env.APPLICATION_ID!));
        expect(commands).toContainEqual(expect.objectContaining({
            name: 'test',
        }));
    } catch (error) {
        console.error(error);
    }
  });

});
