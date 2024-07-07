"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports/Variables
const fs = require("fs");
const { SlashCommandBuilder } = require("discord.js");
const { customLog } = require("../../functions/customLog.js");
const { commandResponse } = require("../../functions/commandResponse.js");
const { isAllowedUser } = require("../../functions/isAllowedUser.js");
const {
  setupReactionCollectors,
} = require("../../functions/setupReactionCollectors.js");

///////////////////////////////////////////////////////////////////////////////
//////// Help Sort Users Into The Correct Language Channels
module.exports = {
  cooldown: 60,
  category: "admin",
  data: new SlashCommandBuilder()
    .setName("create-reactionrole")
    .setDescription("Creates a reaction role message")
    .addStringOption(option =>
      option
        .setName("message")
        .setDescription("The message to display")
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName("rolesandemojis")
        .setDescription(
          "Role and emoji pairs in the format role1:emoji1,role2:emoji2,..."
        )
        .setRequired(true)
    )
    .addBooleanOption(option =>
      option
        .setName("onlyonerole")
        .setDescription("Whether the user can only have one role")
        .setRequired(true)
    ),
  async execute(interaction) {
    ////////////////////////
    ////// Stop Unauthorized Use of Command
    if (!isAllowedUser(interaction.user, 1)) {
      customLog("commandUseDenied", "", interaction);

      return await commandResponse(
        interaction,
        "You do not have permission to use this command."
      );
    }

    ////////////////////////
    ////// Allow Authorized Use of Command
    customLog("commandUsed", "", interaction);

    try {
      const messageContent = interaction.options.getString("message");
      const rolesAndEmojis = interaction.options.getString("rolesandemojis");
      const onlyOneRole = interaction.options.getBoolean("onlyonerole");

      const pairs = rolesAndEmojis.split(",").map(pair => pair.split(":"));
      const parsedPairs = pairs.map(([roleString, emoji]) => {
        const roleId = roleString.match(/\d+/)[0];
        const role = interaction.guild.roles.cache.get(roleId);
        if (!role) {
          throw new Error(`Role with ID "${roleId}" not found.`);
        }
        return {
          roleId: roleId,
          emoji: emoji.trim(),
        };
      });

      const message = await interaction.channel.send(messageContent);

      for (const pair of parsedPairs) {
        await message.react(pair.emoji);
      }

      let reactionRolesData = [];
      if (fs.existsSync("./reactionRoles.json")) {
        const data = fs.readFileSync("./reactionRoles.json", "utf8");
        if (data.trim() !== "") {
          reactionRolesData = JSON.parse(data);
        }
      }

      reactionRolesData.push({
        channelId: interaction.channel.id,
        messageId: message.id,
        pairs: parsedPairs,
        onlyOneRole: onlyOneRole,
      });

      fs.writeFileSync(
        "./reactionRoles.json",
        JSON.stringify(reactionRolesData, null, 2)
      );

      await setupReactionCollectors(interaction.client);
      await commandResponse(interaction, "Reaction role message created!");
    } catch (error) {
      await commandResponse(
        interaction,
        `There was an error while trying to use the create-reactionrole command\n\`${error.message}\``
      );
      customLog(
        "error",
        "There was an error while trying to use the create-reactionrole command",
        interaction,
        error
      );
    }
  },
};
