"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports/Variables
const { SlashCommandBuilder } = require("discord.js");
const { customLog } = require("../../functions/customLog.js");
const { commandResponse } = require("../../functions/commandResponse.js");

///////////////////////////////////////////////////////////////////////////////
//////// Help Users Learn About Commands
module.exports = {
  cooldown: 60,
  category: "utility",
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("List of all commands."),
  async execute(interaction) {
    customLog("commandUsed", "", interaction);

    try {
      await interaction.reply(
        `__**User Commands List**__\n**/help** - List of all commands.\n**/game-status** - Check the game server status.\n**/downloads** - List of game download links.\n**/disable-announce** - How to disable announcements in game client.\n**/paypal** - PayPal email for gp purchases.\n**/ratelimits** - Current rate limits\n**/support** - Support the bot.\n**/pokemon** - Fetch image of a pokemon.\n**/randomGif** - Fetch a random Gif.\n**/facts** - Fetch a random fact.\n**/dadJokes** - Fetch a random dad joke.`
      );
    } catch (error) {
      await commandResponse(
        interaction,
        `There was an error while trying to use the help command\n\`${error.message}\``
      );
      customLog(
        "error",
        "There was an error while trying to use the help command",
        interaction,
        error
      );
    }
  },
};
