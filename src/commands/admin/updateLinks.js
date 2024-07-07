"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports/Variables
const { SlashCommandBuilder } = require("discord.js");
const { customLog } = require("../../functions/customLog.js");
const { commandResponse } = require("../../functions/commandResponse.js");
const { isAllowedUser } = require("../../functions/isAllowedUser.js");
const fs = require("fs");
const path = require("path");
const configPath = path.resolve(__dirname, "../../../config.json");

///////////////////////////////////////////////////////////////////////////////
//////// Allow Admins to Udpate Game Links Directly from Discord
module.exports = {
  cooldown: 60,
  category: "admin",
  data: new SlashCommandBuilder()
    .setName("updatelinks")
    .setDescription("Update the links in the config file")
    .addStringOption(option =>
      option
        .setName("fullgame")
        .setDescription("New full game link")
        .setRequired(false)
    )
    .addStringOption(option =>
      option
        .setName("patch")
        .setDescription("New patch link")
        .setRequired(false)
    )
    .addStringOption(option =>
      option
        .setName("gamestatus")
        .setDescription("New game status link")
        .setRequired(false)
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

    const newFullGameLink = interaction.options.getString("fullgame");
    const newPatchLink = interaction.options.getString("patch");
    const newGameStatusLink = interaction.options.getString("gamestatus");

    try {
      const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

      let updates = [];

      if (newFullGameLink !== null) {
        config.links.fullGame = newFullGameLink;
        updates.push(`Full Game: ${newFullGameLink}`);
      }
      if (newPatchLink !== null) {
        config.links.patch = newPatchLink;
        updates.push(`Patch File: ${newPatchLink}`);
      }
      if (newGameStatusLink !== null) {
        config.links.gameStatus = newGameStatusLink;
        updates.push(`Game Status: ${newGameStatusLink}`);
      }

      // Write the updated config back to the file
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf-8");

      const updateMessage =
        updates.length > 0 ? updates.join("\n") : "No links were updated.";

      await commandResponse(
        interaction,
        `Links updated successfully:\n${updateMessage}`
      );

      customLog(
        "info",
        `Links updated by ${interaction.user.tag}:\n${updateMessage}`,
        interaction
      );
    } catch (error) {
      await commandResponse(
        interaction,
        `There was an error updating the links: ${error.message}`
      );
      customLog("error", "Error updating links", interaction, error);
    }
  },
};
