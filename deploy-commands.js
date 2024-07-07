"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports/Variables
const fs = require("node:fs");
const path = require("node:path");
const { REST, Routes } = require("discord.js");
const config = require("./config");
const { appID, token } = config.bot;
const { guildID } = config.discord;

///////////////////////////////////////////////////////////////////////////////
//////// Fetch & Load All Command Files
//// Grab all the command folders from the commands folder
const commands = [];
const foldersPath = path.join(__dirname, "src", "commands");
const commandFolders = fs.readdirSync(foldersPath);

//// Grab all the command files from the command folders
for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter(file => file.endsWith(".js"));

  // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
      commands.push(command.data.toJSON());
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

//// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

//// Deploy all commands for each guild
(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    // refreash all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationGuildCommands(appID, guildID),
      { body: commands }
    );
    console.log(
      `Successfully reloaded ${data.length} application (/) commands for guild ${guildID}.`
    );
  } catch (error) {
    console.error(error);
  }
})();
