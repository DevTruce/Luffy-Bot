"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports/Variables
const { SlashCommandBuilder } = require("discord.js");
const { customLog } = require("../../functions/customLog.js");
const { commandResponse } = require("../../functions/commandResponse.js");
const { isAllowedUser } = require("../../functions/isAllowedUser.js");

///////////////////////////////////////////////////////////////////////////////
//////// Pretend to be Luffy If You Want
module.exports = {
  cooldown: 0,
  category: "development",
  data: new SlashCommandBuilder()
    .setName("luffy")
    .setDescription("Send a message as luffy")
    .addStringOption(option =>
      option
        .setName("content")
        .setDescription("Content of the message")
        .setRequired(true)
    ),
  async execute(interaction) {
    ////////////////////////
    ////// Stop Unauthorized Use of Command
    if (!isAllowedUser(interaction.user, 0)) {
      customLog("commandUseDenied", "", interaction);

      return await commandResponse(
        interaction,
        "You do not have permission to use this command."
      );
    }

    ////////////////////////
    ////// Allow Authorized Use of Command
    customLog("commandUsed", "", interaction);

    const content = interaction.options.getString("content");
    try {
      await interaction.channel.send(content);

      await commandResponse(
        interaction,
        `Message sent successfully: "${content}"`
      );
    } catch (error) {
      await commandResponse(
        interaction,
        `There was an error while trying to use the luffy command\n\`${error.message}\``
      );
      customLog(
        "error",
        "There was an error while trying to use the luffy command",
        interaction,
        error
      );
    }
  },
};
