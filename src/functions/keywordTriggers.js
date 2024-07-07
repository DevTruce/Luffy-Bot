"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports/Variables
const color = require("./colors.js");
const { customLog } = require("../functions/customLog.js");

///////////////////////////////////////////////////////////////////////////////
//////// Allow The Bot to Help Users Based off Keywords
function keywordTriggers(message, phrase, response) {
  if (message.content.toLowerCase().includes(phrase)) {
    customLog(
      "discordAction",
      `Keyword Triggered | Phrase: ${phrase} | Response: ${response}`
    );

    message.reply(response);
  }
}

///////////////////////////////////////////////////////////////////////////////
//////// Exports
module.exports = { keywordTriggers };
