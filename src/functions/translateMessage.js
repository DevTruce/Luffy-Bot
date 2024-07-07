"use strict";

/*
This got messy very fast and I got too lazy to fix it, logic works but the code is trash... :shrugs: 
*/

///////////////////////////////////////////////////////////////////////////////
//////// Imports/Variables
const color = require("./colors.js");
const { customLog } = require("./customLog.js");
const { updateConfigFile } = require("./updateConfigFile.js");
const config = require("../../config");
const { useLibreTranslate, useGoogleTranslate } = config.translationService;
const { monthlyCharacterLimit, minuteRequestLimit } = config;

////////////////////////
////// For Google Translate Rate Limits
let {
  totalCharactersSent: initialtotalCharactersSent,
  lastResetMonth: initialLastResetMonth,
} = require("../../config.json");
let totalCharactersSent = initialtotalCharactersSent || 0;
let lastResetMonth = initialLastResetMonth || new Date().getMonth();

////////////////////////
////// For Libre Translate Rate Limits
let {
  lastResetMinute: initialLastResetMinute,
  requestThisMinute: initialRequestThisMinute,
} = require("../../config.json");
let lastResetMinute = initialLastResetMinute || new Date().getMinutes();
let requestThisMinute = initialRequestThisMinute || 0;

///////////////////////////////////////////////////////////////////////////////
//////// Dynamically Import The Fetch Module for Making HTTP Requests
let fetch;
try {
  fetch = require("node-fetch");
} catch (error) {
  if (error.code === "ERR_REQUIRE_ESM") {
    fetch = (...args) =>
      import("node-fetch").then(({ default: fetch }) => fetch(...args));
  } else {
    throw error;
  }
}

///////////////////////////////////////////////////////////////////////////////
///////// Helper Functions
async function translateUsingLibreTranslate(
  cleanMessageContent,
  targetLanguage,
  apiUrl,
  apiKey,
  requestBody,
  messageLength,
  mentions
) {
  customLog("request", `Contacting LibreTranslate API`);

  apiUrl = config.translationService.libreTranslate.apiUrl;
  apiKey = config.translationService.libreTranslate.apiKey;
  requestBody = {
    q: cleanMessageContent,
    source: "auto",
    target: targetLanguage,
    format: "text",
    api_key: apiKey,
  };

  try {
    const response = await fetch(`${apiUrl}`, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      requestThisMinute++;
      totalCharactersSent += messageLength;
      const translatedMessage = data.translatedText;

      customLog(
        "success",
        `Contacted LibreTranslate API! | Requests This Minute: ${requestThisMinute}/${minuteRequestLimit} | Total Characters Sent to API: ${totalCharactersSent}/${monthlyCharacterLimit}`
      );

      updateConfigFile({
        totalCharactersSent,
        lastResetMinute,
        lastResetMonth,
        requestThisMinute,
      });

      let translatedMessageWithMentions = "";
      mentions.forEach(({ userId, channelId, roleId, mention }) => {
        if (userId) {
          translatedMessageWithMentions += `<@${userId}> `;
        }
        if (channelId) {
          translatedMessageWithMentions += `<#${channelId}> `;
        }
        if (roleId) {
          translatedMessageWithMentions += `<@&${roleId}>`;
        }
      });

      translatedMessageWithMentions += translatedMessage;
      return translatedMessageWithMentions;
    } else {
      throw new Error("Failed translating message");
    }
  } catch (error) {
    customLog("error", `Failed translating message`, "", error);
    return null;
  }
}

async function translateUsingGoogleTranslate(
  cleanMessageContent,
  targetLanguage,
  apiUrl,
  apiKey,
  requestBody,
  messageLength,
  mentions
) {
  customLog("request", `Contacting Google Translate API`);

  apiUrl = config.translationService.googleTranslate.apiUrl;
  apiKey = config.translationService.googleTranslate.apiKey;

  const messageLines = cleanMessageContent.split("\n");
  requestBody = {
    q: messageLines,
    target: targetLanguage,
  };

  try {
    const response = await fetch(`${apiUrl}+${apiKey}`, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      requestThisMinute++;
      totalCharactersSent += messageLength;

      customLog(
        "success",
        `Contacted Google Translate API! | Requests This Minute: ${requestThisMinute}/${minuteRequestLimit} | Total Characters Sent to API: ${totalCharactersSent}/${monthlyCharacterLimit}`
      );

      updateConfigFile({
        totalCharactersSent,
        lastResetMonth,
        lastResetMinute,
        requestThisMinute,
      });

      const translatedMessageLines = data.data.translations.map(
        translation => translation.translatedText
      );
      const translatedMessage = translatedMessageLines.join("\n");

      let translatedMessageWithMentions = "";
      mentions.forEach(({ userId, channelId, roleId, mention }) => {
        if (userId) {
          translatedMessageWithMentions += `<@${userId}> `;
        }
        if (channelId) {
          translatedMessageWithMentions += `<#${channelId}> `;
        }
        if (roleId) {
          translatedMessageWithMentions += `<@&${roleId}> `;
        }
      });

      translatedMessageWithMentions += translatedMessage;
      return translatedMessageWithMentions;
    } else {
      throw new Error("Failed translating message");
    }
  } catch (error) {
    customLog("error", `Failed translating message`, "", error);

    return null;
  }
}

function resetCharacterLimitOnNewMonth(totalCharactersSent, lastResetMonth) {
  const now = new Date();
  const currentMonth = now.getMonth();

  if (currentMonth === lastResetMonth) return;

  const lastMonthTotalCharactersSent = totalCharactersSent;
  totalCharactersSent = 0;
  lastResetMonth = currentMonth;

  customLog(
    "info",
    `New Month Detected | Total Characters Sent Last Month: ${lastMonthTotalCharactersSent}/${monthlyCharacterLimit} | Total Characters Sent Reset: ${totalCharactersSent}/${monthlyCharacterLimit}`
  );

  updateConfigFile({ totalCharactersSent, lastResetMonth });

  return { totalCharactersSent, lastResetMonth };
}

function resetRequestLimitOnNewMinute(lastResetMinute, requestThisMinute) {
  const currentMinute = new Date().getMinutes();
  if (currentMinute !== lastResetMinute) {
    const lastMinuteRequestsSent = requestThisMinute;
    requestThisMinute = 0;
    lastResetMinute = currentMinute;

    customLog(
      "info",
      `New Minute Detected | Requests Last Minute: ${lastMinuteRequestsSent}/${minuteRequestLimit} | Minute Requests Reset: ${requestThisMinute}/${minuteRequestLimit}`
    );

    updateConfigFile({
      lastResetMinute,
      requestThisMinute,
    });

    return { lastResetMinute, requestThisMinute };
  }
}

function exceedsMinuteRequestLimit(
  message,
  requestThisMinute,
  minuteRequestLimit
) {
  if (requestThisMinute >= minuteRequestLimit) {
    message.channel.send(
      `Minute request limit reached! ${requestThisMinute}/${minuteRequestLimit}`
    );

    customLog(
      "request",
      `Translation Denied: "${message.content}" | User: ${message.author.username} | Channel: ${message.channel.name} - ${color.red}Reason: Minute Request Limit Reached: ${requestThisMinute}/${minuteRequestLimit}${color.reset}`
    );

    return true; // NOT Allowed To Request From Translate API
  }

  return false; // Allowed To Request From Translate API
}

function exceedsMonthlyCharacterLimit(
  message,
  messageLength,
  totalCharactersSent,
  monthlyCharacterLimit
) {
  if (
    totalCharactersSent > monthlyCharacterLimit ||
    totalCharactersSent + messageLength > monthlyCharacterLimit
  ) {
    message.channel.send(
      `Monthly Character Limit Reached: ${totalCharactersSent}/${monthlyCharacterLimit}`
    );

    customLog(
      "request",
      `Translation Denied: "${message.content}" | User: ${message.author.username} | Channel: ${message.channel.name} - ${color.red}Reason: Monthly Character Limit Reached: ${totalCharactersSent}/${monthlyCharacterLimit}${color.reset}`
    );

    return true; // NOT Allowed To Request From Translate API
  }

  return false; // Allowed To Request From Translate API
}

function parsingMentions(messageContent) {
  const mentionRegex = /<@(!?|#)?(\d+)>|<#(\d+)>|<@&(\d+)>/g;
  const mentions = [];
  let cleanMessageContent = messageContent.replace(
    mentionRegex,
    (mention, userSymbol, userId, channelId, roleId) => {
      if (userId) {
        mentions.push({ userId, mention });
        return ""; // Remove user mentions for translation
      }
      if (channelId) {
        mentions.push({ channelId, mention });
        return ""; // Remove channel mentions for translation
      }
      if (roleId) {
        mentions.push({ roleId, mention });
        return ""; // Remove role mentions for translation
      }
    }
  );

  return { cleanMessageContent, mentions };
}

///////////////////////////////////////////////////////////////////////////////
//////// Allow for Translations Using Google/Libre API
async function translateMessage(message, messageContent, targetLanguage) {
  let { apiUrl, apiKey } = "";
  let requestBody = {};
  const { cleanMessageContent, mentions } = parsingMentions(messageContent);
  const messageLength = cleanMessageContent.length;

  /////////////////////////
  ///// Resets!
  ({ totalCharactersSent, lastResetMonth } = resetCharacterLimitOnNewMonth(
    totalCharactersSent,
    lastResetMonth
  ) || { totalCharactersSent, lastResetMonth });

  ({ lastResetMinute, requestThisMinute } = resetRequestLimitOnNewMinute(
    lastResetMinute,
    requestThisMinute
  ) || { lastResetMinute, requestThisMinute });

  ////////////////////////
  ////// Use Google Translate API + Libre Translate API After 500k Chars/Month
  if (useGoogleTranslate === true && useLibreTranslate === true) {
    if (
      exceedsMinuteRequestLimit(message, requestThisMinute, minuteRequestLimit)
    )
      return null;

    if (totalCharactersSent + messageLength < monthlyCharacterLimit) {
      return await translateUsingGoogleTranslate(
        cleanMessageContent,
        targetLanguage,
        apiUrl,
        apiKey,
        requestBody,
        messageLength,
        mentions
      );
    }

    if (totalCharactersSent + messageLength >= monthlyCharacterLimit) {
      return await translateUsingLibreTranslate(
        cleanMessageContent,
        targetLanguage,
        apiUrl,
        apiKey,
        requestBody,
        messageLength,
        mentions
      );
    }
  }

  ////////////////////////
  ////// Use LibreTranslate API Only
  if (useLibreTranslate === true && useGoogleTranslate === false) {
    if (
      exceedsMinuteRequestLimit(message, requestThisMinute, minuteRequestLimit)
    )
      return null;

    return await translateUsingLibreTranslate(
      cleanMessageContent,
      targetLanguage,
      apiUrl,
      apiKey,
      requestBody,
      messageLength,
      mentions
    );
  }

  ////////////////////////
  ////// Use Google Translate API Only
  if (useGoogleTranslate === true && useLibreTranslate === false) {
    if (
      exceedsMinuteRequestLimit(message, requestThisMinute, minuteRequestLimit)
    )
      return null;

    if (
      exceedsMonthlyCharacterLimit(
        message,
        messageLength,
        totalCharactersSent,
        monthlyCharacterLimit
      )
    )
      return null;

    return await translateUsingGoogleTranslate(
      cleanMessageContent,
      targetLanguage,
      apiUrl,
      apiKey,
      requestBody,
      messageLength,
      mentions
    );
  }
}

///////////////////////////////////////////////////////////////////////////////
//////// Exports
module.exports = { translateMessage };
