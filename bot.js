"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports/Variables | Connect to Server
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");
const config = require("./config");
const { token } = config.bot;

///////////////////////////////////////////////////////////////////////////////
//////// Creating New Client Instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],

  // Options
  disableEveryone: false,
});

///////////////////////////////////////////////////////////////////////////////
//////// Creating Collections
client.commands = new Collection();
client.cooldowns = new Collection();

///////////////////////////////////////////////////////////////////////////////
//////// Loading Command Files
const foldersPath = path.join(__dirname, "src", "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter(file => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

///////////////////////////////////////////////////////////////////////////////
//////// Loading Event Files
const eventsPath = path.join(__dirname, "src", "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter(file => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

///////////////////////////////////////////////////////////////////////////////
//////// Log In To Discord
client.login(token);

///////////////////////////////////////////////////////////////////////////////
//////// Exports
module.exports = client;
