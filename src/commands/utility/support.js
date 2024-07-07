"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports/Variables
const { SlashCommandBuilder } = require("discord.js");
const { customLog } = require("../../functions/customLog.js");
const { commandResponse } = require("../../functions/commandResponse.js");
const config = require("../../../config.json");
const { paypalEmails } = config;

///////////////////////////////////////////////////////////////////////////////
//////// Allow Users to Support The Bot
module.exports = {
  cooldown: 60,
  category: "utility",
  data: new SlashCommandBuilder()
    .setName("support")
    .setDescription("Support the bot."),
  async execute(interaction) {
    customLog("commandUsed", "", interaction);

    try {
      if (!paypalEmails.devtruce) {
        throw new Error("PayPal email is not configured.");
      }

      await interaction.reply(
        `If you would like to support the bot, please consider donating to **${paypalEmails.devtruce}** via PayPal. This money will be used to increase our API usage limits and pay for server costs.`
      );
    } catch (error) {
      await commandResponse(
        interaction,
        `There was an error while trying to use the support command\n\`${error.message}\``
      );
      customLog(
        "error",
        "There was an error while trying to use the support command",
        interaction,
        error
      );
    }
  },
};
