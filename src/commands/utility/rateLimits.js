"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports/Variables
const { SlashCommandBuilder } = require("discord.js");
const { customLog } = require("../../functions/customLog.js");
const { commandResponse } = require("../../functions/commandResponse.js");
const path = require("path");

///////////////////////////////////////////////////////////////////////////////
//////// Allow Users to Check The Rate Limits for Translation API
module.exports = {
  cooldown: 60,
  category: "utility",
  data: new SlashCommandBuilder()
    .setName("ratelimits")
    .setDescription("Check the rate limits."),
  async execute(interaction) {
    customLog("commandUsed", "", interaction);

    try {
      const configPath = path.resolve(__dirname, "../../../config.json");
      delete require.cache[require.resolve(configPath)];
      const {
        monthlyCharacterLimit,
        totalCharactersSent,
        minuteRequestLimit,
        requestThisMinute,
      } = require(configPath);

      await interaction.reply(
        `Minute Request Limit: ${requestThisMinute}/${minuteRequestLimit}\nMonthly Character Limit: ${totalCharactersSent}/${monthlyCharacterLimit}\n\nWhen the monthly character limit is reached we will stop using Google Translate API & start using LibreTranslate API for the remainder of the month. If you would like to increase the monthly character limit, you can do so by supporting the bot. **"/support"**`
      );
    } catch (error) {
      await commandResponse(
        interaction,
        `There was an error while trying to use the rateLimits command\n\`${error.message}\``
      );
      customLog(
        "error",
        "There was an error while trying to use the rateLimits command",
        interaction,
        error
      );
    }
  },
};
