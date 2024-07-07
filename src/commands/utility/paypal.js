"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports/Variables
const { SlashCommandBuilder } = require("discord.js");
const { customLog } = require("../../functions/customLog.js");
const { commandResponse } = require("../../functions/commandResponse.js");
const config = require("../../../config.json");
const { paypalEmails } = config;

///////////////////////////////////////////////////////////////////////////////
//////// Help Users Order GP
module.exports = {
  cooldown: 60,
  category: "utility",
  data: new SlashCommandBuilder()
    .setName("paypal")
    .setDescription("PayPal email for GP purchases"),
  async execute(interaction) {
    customLog("commandUsed", "", interaction);

    try {
      if (!paypalEmails.devtruce) {
        throw new Error("PayPal email is not configured.");
      }

      await interaction.reply(
        `Please send payments for GP to **${paypalEmails.warner}** via PayPal`
      );
    } catch (error) {
      await commandResponse(
        interaction,
        `There was an error while trying to use the paypal command\n\`${error.message}\``
      );
      customLog(
        "error",
        "There was an error while trying to use the paypal command",
        interaction,
        error
      );
    }
  },
};
