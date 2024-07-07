"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports/Variables
const { customLog } = require("../functions/customLog.js");
const config = require("../../config.json");
const { useLibreTranslate, useGoogleTranslate } = config.translationService;

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
//////// Help For Language Specific Chats [autoTranslateAndRelayMessage.js]
async function detectLanguage(text) {
  //// Use Google Only to Detect Languages
  if (useGoogleTranslate === true && useLibreTranslate === false) {
    try {
      const apiKey = config.translationService.googleTranslate.apiKey;
      const apiUrl = config.translationService.googleTranslate.apiUrlDetect;

      const requestBody = {
        q: text,
      };

      const response = await fetch(`${apiUrl}+${apiKey}`, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to detect language");
      }

      const data = await response.json();

      if (
        data &&
        data.data &&
        data.data.detections &&
        data.data.detections.length > 0
      ) {
        const detectedLanguage = data.data.detections[0][0].language;
        return detectedLanguage;
      } else {
        throw new Error("No language detected or unexpected response format");
      }
    } catch (error) {
      customLog("error", "There was an error detecting language", "", error);
    }
  }
  //// Use Libre Only to Detect Languages
  if (
    (useLibreTranslate === true && useGoogleTranslate === false) ||
    (useGoogleTranslate === true && useLibreTranslate === true)
  ) {
    try {
      const apiKey = config.translationService.libreTranslate.apiKey;
      const apiUrl = config.translationService.libreTranslate.apiUrlDetect;

      const requestBody = {
        q: text,
        api_key: apiKey,
        detected_language: true,
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to detect language");
      }

      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        const detectedLanguage = data[0].language;
        return detectedLanguage;
      } else {
        throw new Error("No language detected or unexpected response format");
      }
    } catch (error) {
      customLog("error", "There was an error detecting language", "", error);
    }
  }
}

module.exports = { detectLanguage };
