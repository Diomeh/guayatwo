import ExtendedClient from '../models/extended-client';
import fs from 'fs';

export default async (client: ExtendedClient): Promise<void> => {
    const commands = fs.readdirSync('./src/services/commands').filter(file => file.endsWith('.ts'));

    for (const commandFile of commands) {
        const command = require(`./commands/${commandFile}`);
        client.commands.set(command.data.name, command);
    }
};