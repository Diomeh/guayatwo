import { Client, ClientOptions, Collection } from 'discord.js';

export default class ExtendedClient extends Client {
    public commands: Collection<string, any>;
    public events: Collection<string, any>;

    constructor(options: ClientOptions) {
        super(options);

        this.commands = new Collection();
        this.events = new Collection();
    }
}
