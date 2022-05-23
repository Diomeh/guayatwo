import { Intents } from 'discord.js';
import ExtendedClient from '../models/extended-client';

import commandsLoader from './commands';
import eventsLoader from './events';

export default async (): Promise<ExtendedClient> => {
    const client = new ExtendedClient({
        intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
            Intents.FLAGS.GUILD_MESSAGE_TYPING,
            Intents.FLAGS.DIRECT_MESSAGES,
            Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
            Intents.FLAGS.DIRECT_MESSAGE_TYPING,
        ]
    });

    await commandsLoader(client);
    await eventsLoader(client);

    client.once('ready', () => {
        console.log('Ready!');
    });

    await client.login(process.env.BOT_TOKEN);

    return client;
}
