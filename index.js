require("dotenv").config();

const fs = require("fs");
const path = require("path");

const {
    Client,
    Collection,
    GatewayIntentBits,
    Partials
} = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages
    ],
    partials: [
        Partials.Channel
    ]
});

client.commands = new Collection();
client.buttons = new Collection();
client.modals = new Collection();

const folders = ["commands", "buttons", "modals", "events"];

for (const folder of folders) {

    const folderPath = path.join(__dirname, folder);

    if (!fs.existsSync(folderPath)) continue;

    const files = fs.readdirSync(folderPath).filter(file => file.endsWith(".js"));

    for (const file of files) {

        const filePath = path.join(folderPath, file);

        const module = require(filePath);

        if (folder === "commands") {
            client.commands.set(module.data.name, module);
        }

        if (folder === "buttons") {
            client.buttons.set(module.customId, module);
        }

        if (folder === "modals") {
            client.modals.set(module.customId, module);
        }

        if (folder === "events") {
            client.on(module.name, (...args) => module.execute(...args, client));
        }
    }
}

client.login(process.env.TOKEN);
