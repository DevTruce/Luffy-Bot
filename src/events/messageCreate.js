"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports/Variables
const { customLog } = require("../functions/customLog.js");
const { keywordTriggers } = require("../functions/keywordTriggers.js");
const config = require("../../config");
const { languageSections } = config.discord;
const {
  autoTranslateAndRelayAnnouncement,
} = require("../functions/autoTranslateAndRelayAnnouncement.js");
const {
  autoTranslateAndRelayMessage,
} = require("../functions/autoTranslateAndRelayMessage.js");

///////////////////////////////////////////////////////////////////////////////
//////// Message Create Event
module.exports = {
  name: "messageCreate",
  once: false,

  async execute(message) {
    ////////////////////////
    ////// Ignore Bot Messages
    if (message.author.bot) return;

    ////////////////////////
    ////// Checking Content for Logs
    if (!message.content) {
      customLog(
        "discordAction",
        `Image Only Received | User: ${message.author.tag} | Channel: ${message.channel.name}`
      );
    }

    if (message.content) {
      customLog(
        "discordAction",
        `Message Received: "${message.content}" | User: ${message.author.tag} | Channel: ${message.channel.name}`
      );
    }

    ////////////////////////
    ////// NOT CURRENTLY ACTIVE!
    // keywordTriggers(message, "phrase", "response");

    ////////////////////////
    ////// Translation & Relay, Help w/User Communication
    try {
      await autoTranslateAndRelayAnnouncement(
        message,
        languageSections.english.announcementChannelID,
        [
          // send to spanish announcements channel
          {
            channelID: languageSections.spanish.announcementChannelID,
            language: languageSections.spanish.language,
            languageCode: languageSections.spanish.languageCode,
            roleID: languageSections.spanish.roleID,
          },
          // send to swedish announcements channel
          {
            channelID: languageSections.swedish.announcementChannelID,
            language: languageSections.swedish.language,
            languageCode: languageSections.swedish.languageCode,
            roleID: languageSections.swedish.roleID,
          },
          // send to arabic announcements channel
          {
            channelID: languageSections.arabic.announcementChannelID,
            language: languageSections.arabic.language,
            languageCode: languageSections.arabic.languageCode,
            roleID: languageSections.arabic.roleID,
          },
          // Add more language sections as needed
        ],
        message.author
      );
    } catch (error) {
      customLog(
        "error",
        "There was an error while trying to process autoTranslateAndRelayAnnouncement",
        "",
        error
      );
    }

    ////////////////////////
    ////// Synchronize Chat Channels, Help w/User Communication
    try {
      ////// English -> Others
      await autoTranslateAndRelayMessage(
        message,
        languageSections.english.chatChannelID,
        languageSections.english.language,
        languageSections.english.languageCode,
        [
          {
            // send to spanish chat channel
            channelID: languageSections.spanish.chatChannelID,
            language: languageSections.spanish.language,
            languageCode: languageSections.spanish.languageCode,
          },
          {
            // send to swedish chat channel
            channelID: languageSections.swedish.chatChannelID,
            language: languageSections.swedish.language,
            languageCode: languageSections.swedish.languageCode,
          },
          {
            // send to arabic chat channel
            channelID: languageSections.arabic.chatChannelID,
            language: languageSections.arabic.language,
            languageCode: languageSections.arabic.languageCode,
          },
          // Add more language sections as needed
        ],
        message.author
      );

      ////// Spanish -> Others
      await autoTranslateAndRelayMessage(
        message,
        languageSections.spanish.chatChannelID,
        languageSections.spanish.language,
        languageSections.spanish.languageCode,
        [
          {
            channelID: languageSections.english.chatChannelID,
            language: languageSections.english.language,
            languageCode: languageSections.english.languageCode,
          },
          {
            channelID: languageSections.swedish.chatChannelID,
            language: languageSections.swedish.language,
            languageCode: languageSections.swedish.languageCode,
          },
          {
            channelID: languageSections.arabic.chatChannelID,
            language: languageSections.arabic.language,
            languageCode: languageSections.arabic.languageCode,
          },
          // Add more language sections as needed
        ],
        message.author
      );

      ////// Swedish -> Others
      await autoTranslateAndRelayMessage(
        message,
        languageSections.swedish.chatChannelID,
        languageSections.swedish.language,
        languageSections.swedish.languageCode,
        [
          {
            channelID: languageSections.english.chatChannelID,
            language: languageSections.english.language,
            languageCode: languageSections.english.languageCode,
          },
          {
            channelID: languageSections.spanish.chatChannelID,
            language: languageSections.spanish.language,
            languageCode: languageSections.spanish.languageCode,
          },
          {
            channelID: languageSections.arabic.chatChannelID,
            language: languageSections.arabic.language,
            languageCode: languageSections.arabic.languageCode,
          },
          // Add more language sections as needed
        ],
        message.author
      );

      ////// Arabic -> Others
      await autoTranslateAndRelayMessage(
        message,
        languageSections.arabic.chatChannelID,
        languageSections.arabic.language,
        languageSections.arabic.languageCode,
        [
          {
            channelID: languageSections.english.chatChannelID,
            language: languageSections.english.language,
            languageCode: languageSections.english.languageCode,
          },
          {
            channelID: languageSections.spanish.chatChannelID,
            language: languageSections.spanish.language,
            languageCode: languageSections.spanish.languageCode,
          },
          {
            channelID: languageSections.swedish.chatChannelID,
            language: languageSections.swedish.language,
            languageCode: languageSections.swedish.languageCode,
          },
          // Add more language sections as needed
        ],
        message.author
      );
    } catch (error) {
      customLog(
        "error",
        "There was an error while trying to process autoTranslateAndRelayMessage",
        "",
        error
      );
    }
  },
};
