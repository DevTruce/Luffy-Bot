"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports/Variables
const fs = require("fs");
const { customLog } = require("../functions/customLog.js");

///////////////////////////////////////////////////////////////////////////////
//////// Helper Functions
async function fetchChannel(client, channelId) {
  try {
    return await client.channels.fetch(channelId);
  } catch (error) {
    customLog(
      "error",
      `Reation Roles: Channel with ID "${channelId}" not found.`,
      "",
      error
    );
    return null;
  }
}

async function fetchMessage(channel, messageId) {
  try {
    return await channel.messages.fetch(messageId);
  } catch (error) {
    customLog(
      "error",
      `Reation Roles: Message with ID "${messageId}" not found.`,
      "",
      error
    );
    return null;
  }
}

async function handleRoleChange(member, role, action) {
  try {
    if (action === "add") {
      await member.roles.add(role);
      await notifyUser(
        member.user,
        `You have been added to the role **${role.name}**.`
      );
      customLog(
        "success",
        `Added role ${role.name} to user ${member.user.username}`
      );
    } else if (action === "remove") {
      await member.roles.remove(role);
      await notifyUser(
        member.user,
        `You have been removed from the role **${role.name}**.`
      );
      customLog(
        "success",
        `Removed role ${role.name} from user ${member.user.username}`
      );
    }
  } catch (error) {
    customLog(
      "error",
      `Failed to ${action} role ${role.name} for user ${member.user.id}`,
      "",
      error
    );
  }
}

async function notifyUser(user, message) {
  try {
    const dmChannel = await user.createDM();
    await dmChannel.send(message);
  } catch (error) {
    customLog("error", `Failed to send DM to user ${user.id}`, "", error);
  }
}

///////////////////////////////////////////////////////////////////////////////
//////// Logic for Reaction Roles & Carrying Them Across Restarts w/reactionRoles.json
async function setupReactionCollectors(client) {
  if (!fs.existsSync("./reactionRoles.json")) {
    return;
  }

  const data = fs.readFileSync("./reactionRoles.json", "utf8");
  if (data.trim() === "") {
    return;
  }

  const reactionRolesData = JSON.parse(data);
  for (const reactionRole of reactionRolesData) {
    ////////////////////////
    ////// Restore Reaction Roles
    const channel = await fetchChannel(client, reactionRole.channelId);
    if (!channel) continue;

    const message = await fetchMessage(channel, reactionRole.messageId);
    if (!message) continue;

    const filter = (reaction, user) =>
      reactionRole.pairs.some(pair => pair.emoji === reaction.emoji.name) &&
      !user.bot;

    const collector = message.createReactionCollector({
      filter,
      dispose: true,
    });

    ////////////////////////
    ////// Event: Reaction Collected
    collector.on("collect", async (reaction, user) => {
      customLog(
        "discordAction",
        `Reaction Added: ${reaction.emoji.name} | User: ${user.username}`
      );
      const pair = reactionRole.pairs.find(
        pair => pair.emoji === reaction.emoji.name
      );
      const member = reaction.message.guild.members.cache.get(user.id);
      if (!member || !pair) return;

      const role = reaction.message.guild.roles.cache.get(pair.roleId);
      if (!role) {
        throw new Error(`Role with ID "${pair.roleId}" not found.`);
      }

      const hasRole = member.roles.cache.has(role.id);
      await handleRoleChange(member, role, hasRole ? "remove" : "add");

      if (!hasRole && reactionRole.onlyOneRole) {
        for (const otherPair of reactionRole.pairs) {
          if (otherPair !== pair) {
            const otherRole = reaction.message.guild.roles.cache.get(
              otherPair.roleId
            );
            if (otherRole && member.roles.cache.has(otherRole.id)) {
              await handleRoleChange(member, otherRole, "remove");
            }
          }
        }
      }
    });

    ////////////////////////
    ////// Event: Reaction Removed
    collector.on("remove", async (reaction, user) => {
      customLog(
        "discordAction",
        `Reaction Removed: ${reaction.emoji.name} | User: ${user.username}`
      );
      const pair = reactionRole.pairs.find(
        pair => pair.emoji === reaction.emoji.name
      );
      const member = reaction.message.guild.members.cache.get(user.id);
      if (!member || !pair) return;

      const role = reaction.message.guild.roles.cache.get(pair.roleId);
      try {
        if (role) {
          await handleRoleChange(member, role, "remove");
        } else {
          throw new Error(`Role with ID "${pair.roleId}" not found.`);
        }
      } catch (error) {
        customLog(
          "error",
          `Failed to handle role removal for user ${user.id} history`,
          "",
          error
        );
      }
    });
  }
}

///////////////////////////////////////////////////////////////////////////////
//////// Exports
module.exports = { setupReactionCollectors };
