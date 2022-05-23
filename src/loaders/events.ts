import ExtendedClient from '../models/extended-client';
import fs from 'fs';

export default (client: ExtendedClient): void => {
    const path = './src/services/events';
    const events = fs.readdirSync(path).filter(file => file.endsWith('.ts'));

    for (const eventFile of events) {
        const event = require(`${path}/${eventFile}`);

        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }
};
