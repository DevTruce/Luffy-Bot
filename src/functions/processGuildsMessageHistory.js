"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports/Variables
const { customLog } = require("../functions/customLog.js");

///////////////////////////////////////////////////////////////////////////////
//////// Allow Bot to Read/Work With Messages That Were Sent While Offline
async function processGuildsMessageHistory(client) {
  const guilds = client.guilds.cache;

  customLog("info", `Active In ${guilds.size} Guilds`);

  guilds.forEach(guild => {
    customLog("info", `Guild Name: ${guild.name}`);
    customLog("info", `${guild.name} Channels: ${guild.channels.cache.size}`);
    customLog("success", `Fetching Message History From ${guild.name}...`);

    guild.channels.cache.forEach(async channel => {
      if (channel.type !== 0) return; // ignore non text channels

      try {
        const messages = await channel.messages.fetch({ limit: 100 });

        customLog(
          "success",
          `Fetched ${messages.size} Messages | Guild: ${guild} | Channel: ${channel.name}`
        );
      } catch (error) {
        customLog(
          "error",
          "There was an error while trying to process the guilds message history",
          interaction,
          error
        );
      }
    });
  });
}

///////////////////////////////////////////////////////////////////////////////
//////// Exports
module.exports = {
  processGuildsMessageHistory,
};
