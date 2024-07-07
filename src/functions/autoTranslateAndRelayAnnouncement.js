"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports/Variables
const { AttachmentBuilder } = require("discord.js");
const { customLog } = require("./customLog.js");
const { translateMessage } = require("./translateMessage.js");

///////////////////////////////////////////////////////////////////////////////
//////// Helper Functions
async function translateAndRelayAnnouncement(
  message,
  channelID,
  languageCode,
  roleID,
  user,
  attachments
) {
  try {
    const targetChannel = await message.client.channels.fetch(channelID);

    if (targetChannel) {
      const translatedMessage = await translateMessage(
        message,
        message.content,
        languageCode
      );

      if (translatedMessage === null) return;

      await targetChannel.send({
        content: `<@&${roleID}> \n${translatedMessage}`,
        files: attachments,
      });

      customLog(
        "success",
        `Translated Announcement: "${translatedMessage}" | User: ${user.username} | Channel: ${message.channel.name} | Sent to: ${targetChannel.name}`
      );
    } else {
      throw new Error(`Channel ID ${channelID} Not Found!`);
    }
  } catch (error) {
    customLog(
      "error",
      `Failed to auto translate and relay announcement`,
      "",
      error
    );
  }
}

async function relayAnnouncementImageOnly(
  message,
  channelID,
  roleID,
  user,
  attachments
) {
  try {
    const targetChannel = await message.client.channels.fetch(channelID);

    if (targetChannel) {
      await targetChannel.send({
        content: `<@&${roleID}>`,
        files: attachments,
      });

      customLog(
        "success",
        `Relayed Announcement Image | User: ${user.username} | Channel: ${message.channel.name} | Sent to: ${targetChannel.name}`
      );
    } else {
      throw new Error(`Channel ID ${channelID} Not Found!`);
    }
  } catch (error) {
    customLog("error", `Failed to auto relay announcement image`, "", error);
  }
}

///////////////////////////////////////////////////////////////////////////////
//////// Allow Staff to Easily Communicate Announcements
async function autoTranslateAndRelayAnnouncement(
  message,
  originalChannelID,
  targetChannels,
  user
) {
  if (message.channel.id === originalChannelID) {
    try {
      /////////////////////////
      ///// Prepare Attachments
      const attachments = await Promise.all(
        message.attachments.map(async attachment => {
          return new AttachmentBuilder(attachment.url, {
            name: attachment.name,
          });
        })
      );

      /////////////////////////
      ///// Message Has No Inner Content
      if (!message.content && message.attachments.size > 0) {
        for (const { channelID, roleID } of targetChannels) {
          await relayAnnouncementImageOnly(
            message,
            channelID,
            roleID,
            user,
            attachments
          );
        }
        return;
      }

      /////////////////////////
      ///// Message Has Inner Content
      if (message.content) {
        for (const {
          channelID,
          language,
          languageCode,
          roleID,
        } of targetChannels) {
          await translateAndRelayAnnouncement(
            message,
            channelID,
            languageCode,
            roleID,
            user,
            attachments
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

///////////////////////////////////////////////////////////////////////////////
//////// Exports
module.exports = { autoTranslateAndRelayAnnouncement };
