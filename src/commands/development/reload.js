"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports/Variables
const { SlashCommandBuilder } = require("discord.js");
const { customLog } = require("../../functions/customLog.js");
const { commandResponse } = require("../../functions/commandResponse.js");
const { isAllowedUser } = require("../../functions/isAllowedUser.js");

///////////////////////////////////////////////////////////////////////////////
//////// Refreash a Command File for Quick Update/Fix w/o a Full Restart
module.exports = {
  cooldown: 0,
  category: "development",
  data: new SlashCommandBuilder()
    .setName("reload")
    .setDescription("Reloads command. [dev use only]")
    .addStringOption(option =>
      option
        .setName("command")
        .setDescription("The command to reload.")
        .setRequired(true)
    ),
  async execute(interaction) {
    ////////////////////////
    ////// Stop Unauthorized Use of Command
    if (!isAllowedUser(interaction.user, 0)) {
      customLog("commandUseDenied", interaction);

      return await commandResponse(
        interaction,
        "You do not have permission to use this command."
      );
    }

    ////////////////////////
    ////// Allow Authorized Use of Command
    customLog("commandUsed", "", interaction);

    const commandName = interaction.options
      .getString("command", true)
      .toLowerCase();
    const command = interaction.client.commands.get(commandName);
    if (!command) {
      return await commandResponse(
        interaction,
        `There is no command with name \`${commandName}\`!`
      );
    }

    delete require.cache[
      require.resolve(`../${command.category}/${command.data.name}.js`)
    ];

    try {
      interaction.client.commands.delete(command.data.name);
      const newCommand = require(`../${command.category}/${command.data.name}.js`);
      interaction.client.commands.set(newCommand.data.name, newCommand);

      await commandResponse(
        interaction,
        `Command \`${newCommand.data.name}\` was reloaded!`
      );
    } catch (error) {
      await commandResponse(
        interaction,
        `There was an error while trying to use the reload command\n\`${error.message}\``
      );
      customLog(
        "error",
        "There was an error while trying to use the reload  command",
        interaction,
        error
      );
    }
  },
};
