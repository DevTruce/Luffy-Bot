"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports/Variables
const { SlashCommandBuilder } = require("discord.js");
const { customLog } = require("../../functions/customLog.js");
const { commandResponse } = require("../../functions/commandResponse.js");
const config = require("../../../config.json");
const { apiNinjasDadJokeUrl, apiNinjasKey } = config;

///////////////////////////////////////////////////////////////////////////////
//////// Fetch a random dad joke from api ninjas
module.exports = {
  cooldown: 60,
  category: "fun",
  data: new SlashCommandBuilder()
    .setName("dad-jokes")
    .setDescription("Fetch a random dad joke."),
  async execute(interaction) {
    customLog("commandUsed", "", interaction);

    try {
      const response = await fetch(apiNinjasDadJokeUrl, {
        method: "GET",
        contentType: "application/json",
        headers: { "X-Api-Key": apiNinjasKey },
      });

      if (!response.ok) {
        throw new Error(`There was an error while fetching`);
      }
      const data = await response.json();
      const joke = data[0].joke;

      await interaction.reply(joke);
    } catch (error) {
      await commandResponse(
        interaction,
        `There was an error while trying to use the Dad Jokes command\n\`${error.message}\``
      );
      customLog(
        "error",
        "There was an error while trying to use the Dad Jokes command",
        interaction,
        error
      );
    }
  },
};
