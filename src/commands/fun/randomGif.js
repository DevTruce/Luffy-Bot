"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports/Variables
const { SlashCommandBuilder } = require("discord.js");
const { customLog } = require("../../functions/customLog.js");
const { commandResponse } = require("../../functions/commandResponse.js");
const config = require("../../../config.json");
const { giphyApiUrl, giphyApiKey } = config;

///////////////////////////////////////////////////////////////////////////////
//////// Fetch Random Gif from GIPHY
module.exports = {
  cooldown: 60,
  category: "fun",
  data: new SlashCommandBuilder()
    .setName("random-gif")
    .setDescription("Fetch a random Gif.")
    .addStringOption(option =>
      option
        .setName("keyword")
        .setDescription("Keyword to search for GIF")
        .setRequired(true)
    ),
  async execute(interaction) {
    customLog("commandUsed", "", interaction);

    try {
      const keyword = interaction.options.getString("keyword");
      const apiUrl = `${giphyApiUrl}/gifs/random?api_key=${giphyApiKey}&tag=${encodeURIComponent(
        keyword
      )}&rating=g`;

      const response = await fetch(apiUrl);
      const data = await response.json();
      const gifUrl = data.data.url;

      await interaction.reply(gifUrl);
    } catch (error) {
      await commandResponse(
        interaction,
        `There was an error while trying to use the randomGif command\n\`${error.message}\``
      );
      customLog(
        "error",
        "There was an error while trying to use the randomGif command",
        interaction,
        error
      );
    }
  },
};
