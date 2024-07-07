"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports/Variables
const { SlashCommandBuilder } = require("discord.js");
const { customLog } = require("../../functions/customLog.js");
const { commandResponse } = require("../../functions/commandResponse.js");
const config = require("../../../config.json");
const { pokemonApiUrl } = config;

///////////////////////////////////////////////////////////////////////////////
//////// Fetch data on a specified Pokemon using pokeapi
module.exports = {
  cooldown: 60,
  category: "fun",
  data: new SlashCommandBuilder()
    .setName("pokemon")
    .setDescription("Fetch image of a pokemon.")
    .addStringOption(option =>
      option
        .setName("pokemon")
        .setDescription("What pokemon do you want to fetch?")
        .setRequired(true)
    ),
  async execute(interaction) {
    customLog("commandUsed", "", interaction);

    try {
      const pokemon = interaction.options.getString("pokemon");

      const response = await fetch(`${pokemonApiUrl}${pokemon}`);
      if (!response.ok) {
        throw new Error(`That is not a Pokemon...`);
      }
      const data = await response.json();
      console.log(data);
      const pokemonImage = data.sprites.front_default;

      await interaction.reply(pokemonImage);
    } catch (error) {
      await commandResponse(
        interaction,
        `There was an error while trying to use the Pokemon command\n\`${error.message}\``
      );
      customLog(
        "error",
        "There was an error while trying to use the Pokemon command",
        interaction,
        error
      );
    }
  },
};
