"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports/Variables
const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
const { customLog } = require("./customLog.js");
const { translateMessage } = require("./translateMessage.js");
const { detectLanguage } = require("./detectLanguage.js");
const config = require("../../config.json");
const { useLibreTranslate, useGoogleTranslate } = config.translationService;

///////////////////////////////////////////////////////////////////////////////
//////// Helper Functions
async function translateFormatAndRelayMessage(
  message,
  channelID,
  languageCode,
  originalLanguage,
  user,
  attachments
) {
  try {
    const targetChannel = await message.client.channels.cache.get(channelID);

    if (targetChannel) {
      const translatedMessage = await translateMessage(
        message,
        message.content,
        languageCode
      );

      if (translatedMessage === null) return;

      // const newTranslationEmbed = new EmbedBuilder()
      //   .setColor(0x0099ff)
      //   .setDescription(translatedMessage)
      //   .setFooter({
      //     text: `sent by: ${user.username} | translated from: ${originalLanguage}`,
      //     iconURL: `${user.displayAvatarURL()}`,
      //   });

      await targetChannel.send({
        content: `Sent by: ${message.author} | translated from: ${originalLanguage}\n${translatedMessage}`,
        files: attachments,
      });

      customLog(
        "success",
        `Translated Message: "${translatedMessage}" | User: ${user.username} | Channel: ${message.channel.name} | Sent to: ${targetChannel.name}`
      );
    } else {
      throw new Error(`Channel ID ${channelID} Not Found!`);
    }
  } catch (error) {
    customLog(
      "error",
      `Failed to auto translate, format and relay message`,
      "",
      error
    );
  }
}

async function relayMessageImageOnly(message, channelID, user, attachments) {
  try {
    const targetChannel = await message.client.channels.cache.get(channelID);

    if (targetChannel) {
      await targetChannel.send({
        content: `Sent by: ${message.author}`,
        files: attachments,
      });

      customLog(
        "success",
        `Relayed Image | User: ${user.username} | Channel: ${message.channel.name} | Sent to: ${targetChannel.name}`
      );
    } else {
      throw new Error(`Channel ID ${channelID} Not Found!`);
    }
  } catch (error) {
    customLog("error", `Failed to auto relay image`, "", error);
  }
}

function getLanguageFullName(languageCode, targetChannels) {
  for (const targetChannel in targetChannels) {
    if (targetChannels.hasOwnProperty(targetChannel)) {
      const language = targetChannels[targetChannel];
      if (language.languageCode === languageCode) {
        return language.language;
      }
    }
  }
  return null; // Return null if language code not found
}
///////////////////////////////////////////////////////////////////////////////
//////// Primary Function
async function autoTranslateAndRelayMessage(
  message,
  originalChannelID,
  originalLanguage,
  originalLanguageCode,
  targetChannels,
  user
) {
  if (message.channel.id === originalChannelID) {
    try {
      /////////////////////////
      ///// Prepare Attachments
      const attachments = message.attachments.map(attachment => {
        return new AttachmentBuilder(attachment.url, attachment.name);
      });

      /////////////////////////
      ///// Prepare stickers as attachments
      const stickerAttachments = message.stickers.map(sticker => {
        return new AttachmentBuilder(sticker.url, `${sticker.name}.png`);
      });

      /////////////////////////
      ///// Check for Stickers and Relay
      if (message.stickers.size > 0) {
        for (const { channelID } of targetChannels) {
          await relayMessageImageOnly(
            message,
            channelID,
            user,
            stickerAttachments
          );
        }
        customLog("info", "Relayed Sticker.");
        return;
      }

      /////////////////////////
      ///// Message Has No Inner Content
      if (!message.content && message.attachments.size > 0) {
        for (const { channelID } of targetChannels) {
          await relayMessageImageOnly(message, channelID, user, attachments);
        }
        return;
      }

      /////////////////////////
      ///// Translate Message From Source Channel Into Source Language
      const detectedLanguageCode = await detectLanguage(message.content);
      if (detectedLanguageCode !== originalLanguageCode) {
        //// Use Google Only to Detect Languages
        if (useGoogleTranslate === true && useLibreTranslate === false) {
          customLog("request", "Contacting Google Translate API for Detect");
        }

        //// Use Libre Only to Detect Languages
        if (
          (useLibreTranslate === true && useGoogleTranslate === false) ||
          (useGoogleTranslate === true && useLibreTranslate === true)
        ) {
          customLog("request", "Contacting Libre Translate API for Detect");
        }

        const languageFullName = getLanguageFullName(
          detectedLanguageCode,
          targetChannels
        );

        const originalMessageContent = message.content;

        await message.delete();

        const translatedMessageContent = await translateMessage(
          message,
          originalMessageContent,
          originalLanguageCode
        );

        if (translatedMessageContent === null) return;

        // const newTranslationEmbed = new EmbedBuilder()
        //   .setColor(0x0099ff)
        //   .setTitle(`Translation`)
        //   .setDescription(translatedMessageContent)
        //   .setFooter({
        //     text: `sent by: ${user.username} | translated from: ${languageFullName}`,
        //     iconURL: `${user.displayAvatarURL()}`,
        //   });

        const channel = await message.guild.channels.cache.get(
          originalChannelID
        );

        await channel.send({
          content: `Sent by: ${message.author} | translated from: ${languageFullName}\n${translatedMessageContent}`,
          files: attachments,
        });

        customLog(
          "success",
          `Translated Message: ${translatedMessageContent} | User: ${user.username} | From: ${channel} | To: ${message.channel.name}`
        );
      }

      /////////////////////////
      ///// Translate/Relay Message From Source Channel Into All Target Channels
      for (const { channelID, language, languageCode } of targetChannels) {
        await translateFormatAndRelayMessage(
          message,
          channelID,
          languageCode,
          originalLanguage,
          user,
          attachments
        );
      }
    } catch (error) {
      customLog(
        "error",
        `Failed to auto translate, format and relay message`,
        "",
        error
      );
    }
  }
}

///////////////////////////////////////////////////////////////////////////////
//////// Exports
module.exports = { autoTranslateAndRelayMessage };
