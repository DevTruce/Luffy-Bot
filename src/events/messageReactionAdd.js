"use strict";
///////////////////////////////////////////////////////////////////////////////
//////// Imports/Variables
const { EmbedBuilder } = require("discord.js");
const color = require("../functions/colors.js");
const { customLog } = require("../functions/customLog.js");
const { translateMessage } = require("../functions/translateMessage.js");
const { flagToLanguage } = require("../functions/flagToLanguage.js");
const config = require("../../config");
const { reactionTranslateWhitelistChannelIDs } = config.discord;
const translationCache = {};

///////////////////////////////////////////////////////////////////////////////
//////// Message Reaction Add Event
module.exports = {
  name: "messageReactionAdd",
  once: false,

  async execute(reaction, user) {
    ////////////////////////
    ////// Allow Users to Use Reaction Translation Feature In Select Channels
    if (
      reactionTranslateWhitelistChannelIDs.includes(
        reaction.message.channel.parentId
      ) ||
      (reactionTranslateWhitelistChannelIDs.includes(
        reaction.message.channel.id
      ) &&
        !user.bot &&
        reaction.message &&
        typeof reaction.message.content === "string" &&
        flagToLanguage.hasOwnProperty(reaction.emoji.name.toLowerCase()))
    ) {
      customLog(
        "discordAction",
        `Reaction Received: "${reaction.message.content}" | User: ${user.tag} | Channel: ${reaction.message.channel.name} | Reaction: ${reaction.emoji.name}`
      );

      const languageCode = flagToLanguage[reaction.emoji.name];
      const cacheKey = `${reaction.message.id}-${languageCode}`;

      ////////////////////////
      ////// Stop API Request If Translation Exists Already
      if (translationCache[cacheKey]) {
        customLog(
          "request",
          `Reaction Translation Denied: "${reaction.message.content}" | User: ${
            user.username
          } | Channel: ${
            reaction.message.channel.name
          } | Language: ${languageCode.toUpperCase()} - ${
            color.red
          }Reason: Message in Cache${color.reset}`
        );
        return null;
      }

      ////////////////////////
      ////// Allow API Request If Translation Does Not Already Exist
      if (!translationCache[cacheKey]) {
        const translatedMessage = await translateMessage(
          reaction.message,
          reaction.message.content,
          languageCode
        );

        if (translatedMessage) {
          translationCache[cacheKey] = translatedMessage;

          const newTranslation = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle(`Translation`)
            .setDescription(translatedMessage)
            .setFooter({
              text: `${user.username}`,
              iconURL: `${user.displayAvatarURL()}`,
            });

          customLog(
            "success",
            `Reaction Translation: "${translatedMessage}" | User: ${
              user.username
            } | Channel: ${
              reaction.message.channel.name
            } | Language: ${languageCode.toUpperCase()}`
          );

          await reaction.message.reply({ embeds: [newTranslation] });
        }
      }
    }
  },
};
