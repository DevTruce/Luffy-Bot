"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports/Variables
const { SlashCommandBuilder } = require("discord.js");
const { customLog } = require("../../functions/customLog.js");
const { commandResponse } = require("../../functions/commandResponse.js");
const config = require("../../../config.json");
const { apiNinjasFactUrl, apiNinjasKey } = config;

///////////////////////////////////////////////////////////////////////////////
//////// Fetch a random fact from api ninjas
module.exports = {
  cooldown: 60,
  category: "fun",
  data: new SlashCommandBuilder()
    .setName("facts")
    .setDescription("Fetch a random fact."),
  async execute(interaction) {
    customLog("commandUsed", "", interaction);

    try {
      const response = await fetch(apiNinjasFactUrl, {
        method: "GET",
        contentType: "application/json",
        headers: { "X-Api-Key": apiNinjasKey },
      });

      if (!response.ok) {
        throw new Error(`There was an error while fetching`);
      }
      const data = await response.json();
      const fact = data[0].fact;

      await interaction.reply(fact);
    } catch (error) {
      await commandResponse(
        interaction,
        `There was an error while trying to use the Facts command\n\`${error.message}\``
      );
      customLog(
        "error",
        "There was an error while trying to use the Facts command",
        interaction,
        error
      );
    }
  },
};
