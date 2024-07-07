"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports/Variables
const { Events, PresenceUpdateStatus, ActivityType } = require("discord.js");
const { customLog } = require("../functions/customLog.js");
const {
  setupReactionCollectors,
} = require("../functions/setupReactionCollectors.js");
const {
  processGuildsMessageHistory,
} = require("../functions/processGuildsMessageHistory.js");
let { avatarSet } = require("../../config.json");

///////////////////////////////////////////////////////////////////////////////
//////// Client Ready Event
module.exports = {
  name: Events.ClientReady,
  once: true,

  async execute(client) {
    ////////////////////////
    ////// Setting Up The Bots Information
    customLog("success", `Logged in as ${client.user.tag}`);
    client.user.setUsername("Luffy");
    client.user.setActivity("One Piece", { type: ActivityType.Watching });
    client.user.setStatus(PresenceUpdateStatus.DoNotDisturb);
    customLog("success", `Bot Information Set!`);

    if (!avatarSet) {
      client.user.setAvatar("botAvatar.gif");
      customLog("success", `Bot Avatar Set!`);

      avatarSet = true;
    }

    ////////////////////////
    ////// Allow Reaction Roles to Carry Across Server Restarts
    try {
      await setupReactionCollectors(client);
      customLog("success", `Reaction Roles Set!`);
    } catch (error) {
      customLog(
        "error",
        "There was an error while trying to Setup Reaction Collectors",
        "",
        error
      );
    }

    ////////////////////////
    ////// Allow Translation of "Old" Messages When Server Restarts
    try {
      await processGuildsMessageHistory(client);
    } catch (error) {
      customLog(
        "error",
        "There was an error while trying to Process Guilds Message History",
        "",
        error
      );
    }
  },
};
