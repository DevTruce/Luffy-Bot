"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports/Variables
const { SlashCommandBuilder } = require("discord.js");
const { customLog } = require("../../functions/customLog.js");
const { commandResponse } = require("../../functions/commandResponse.js");
const { isAllowedUser } = require("../../functions/isAllowedUser.js");

///////////////////////////////////////////////////////////////////////////////
//////// Clear Any BS From Chat Quickly
module.exports = {
  cooldown: 60,
  category: "admin",
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clear chat history")
    .addIntegerOption(option =>
      option
        .setName("amount")
        .setDescription("Number of messages to delete")
        .setRequired(true)
    ),
  async execute(interaction) {
    ////////////////////////
    ////// Stop Unauthorized Use of Command
    if (!isAllowedUser(interaction.user, 1)) {
      customLog("commandUseDenied", "", interaction);

      return await commandResponse(
        interaction,
        "You do not have permission to use this command."
      );
    }

    ////////////////////////
    ////// Allow Authorized Use of Command
    customLog("commandUsed", "", interaction);

    const amount = interaction.options.getInteger("amount");
    if (amount <= 0 || amount > 500) {
      return await commandResponse(
        interaction,
        "Please provide a number between 1 and 500 as the amount of messages to delete."
      );
    }

    try {
      const fetched = await interaction.channel.messages.fetch({
        limit: amount,
      });

      const deletedMessages = await interaction.channel.bulkDelete(fetched);

      await commandResponse(
        interaction,
        `Successfully deleted ${deletedMessages.size} messages.`
      );
    } catch (error) {
      await commandResponse(
        interaction,
        `There was an error while trying to use the clear command\n\`${error.message}\``
      );
      customLog(
        "error",
        "There was an error while trying to use the clear command",
        interaction,
        error
      );
    }
  },
};
