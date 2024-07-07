"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports/Variables
const { SlashCommandBuilder } = require("discord.js");
const { customLog } = require("../../functions/customLog.js");
const { commandResponse } = require("../../functions/commandResponse.js");
const path = require("path");

///////////////////////////////////////////////////////////////////////////////
//////// Help Users Check The Status of The Game Server
module.exports = {
  cooldown: 60,
  category: "utility",
  data: new SlashCommandBuilder()
    .setName("game-status")
    .setDescription("Check the game server status."),
  async execute(interaction) {
    customLog("commandUsed", "", interaction);

    try {
      const configPath = path.resolve(__dirname, "../../../config.json");
      delete require.cache[require.resolve(configPath)];
      const config = require(configPath);
      const { links } = config;

      if (!links.gameStatus) {
        throw new Error("Game status link is not configured.");
      }

      await interaction.reply(`${links.gameStatus}`);
    } catch (error) {
      await commandResponse(
        interaction,
        `There was an error while trying to use the game-status command\n\`${error.message}\``
      );
      customLog(
        "error",
        "There was an error while trying to use the game-status command",
        interaction,
        error
      );
    }
  },
};
