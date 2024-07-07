"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports/Variables
const { SlashCommandBuilder } = require("discord.js");
const { customLog } = require("../../functions/customLog.js");
const { commandResponse } = require("../../functions/commandResponse.js");
const path = require("path");

///////////////////////////////////////////////////////////////////////////////
//////// Provide Users With Download Links for The Game
module.exports = {
  cooldown: 60,
  category: "utility",
  data: new SlashCommandBuilder()
    .setName("downloads")
    .setDescription("List of download links."),
  async execute(interaction) {
    customLog("commandUsed", "", interaction);

    try {
      const configPath = path.resolve(__dirname, "../../../config.json");
      delete require.cache[require.resolve(configPath)];
      const config = require(configPath);
      const { links } = config;

      if (!links.fullGame) {
        throw new Error("Full game link is not configured.");
      }

      await interaction.reply(
        `**These links might be outdated because they are constantly updated but I try to keep them up to date as much as possible.** \n\nFull Game: ${links.fullGame}\nPatch: ${links.patch}`
      );
    } catch (error) {
      await commandResponse(
        interaction,
        `There was an error while trying to use the downloads command\n\`${error.message}\``
      );
      customLog(
        "error",
        "There was an error while trying to use the downloads command",
        interaction,
        error
      );
    }
  },
};
