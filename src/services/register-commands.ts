const { REST } = require('@discord.js/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('node:fs');

(async () => {
    const path = './src/services/commands';
    const commands = [];
    const commandFiles = fs.readdirSync(path).filter((file: string) => file.endsWith('.ts'));

    for (const file of commandFiles) {
        const command = require(`${path}/${file}`);
        commands.push(command.data.toJSON());
    }

    const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);

    console.log('Registering slash commands.');
    
    try {
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands },
        );

        console.log('Slash commands registered.');
    } catch (error) {
        console.error(error);
    }
})();
