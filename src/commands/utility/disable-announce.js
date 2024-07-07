"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports/Variables
const { SlashCommandBuilder } = require("discord.js");
const { customLog } = require("../../functions/customLog.js");
const { commandResponse } = require("../../functions/commandResponse.js");

///////////////////////////////////////////////////////////////////////////////
//////// Help Users Disable The Annoying ASF Announcement Window In Game Client
module.exports = {
  cooldown: 60,
  category: "utility",
  data: new SlashCommandBuilder()
    .setName("disable-announce")
    .setDescription("How to disable announcements section on game client."),
  async execute(interaction) {
    customLog("commandUsed", "", interaction);

    try {
      await interaction.reply({
        content:
          "Here are the instructions to disable announcements section on game clients:",
        embeds: [
          {
            title: "Disable Announcements Instructions",
            description: "Follow these steps:",
            fields: [
              {
                name: "Step 1:",
                value: "Navigate to game file location.",
              },
              {
                name: "Step 2:",
                value: "Right-click and create a new file.",
              },
              {
                name: "Step 3:",
                value: "Name the file `disableAnnounce.txt`.",
              },
            ],
            image: {
              url: "https://media.discordapp.net/attachments/1139654094932422711/1236920383748177920/image.png?ex=663db7e0&is=663c6660&hm=baa29e304ecf46ee54c53564e21edae0e66ee43c4233ad44cf78e15674b41b3d&=&format=webp&quality=lossless",
            },
          },
        ],
      });
    } catch (error) {
      await commandResponse(
        interaction,
        `There was an error while trying to use the disable-announce command\n\`${error.message}\``
      );
      customLog(
        "error",
        "There was an error while trying to use the disable-announce  command",
        interaction,
        error
      );
    }
  },
};
