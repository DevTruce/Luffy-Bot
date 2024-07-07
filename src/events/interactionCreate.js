"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports/Variables
const { Events, Collection } = require("discord.js");
const { customLog } = require("../functions/customLog.js");
const { commandResponse } = require("../functions/commandResponse.js");

///////////////////////////////////////////////////////////////////////////////
//////// Interaction Create Event
module.exports = {
  name: Events.InteractionCreate,

  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
      return;
    }

    const { cooldowns } = interaction.client;

    if (!cooldowns.has(command.data.name)) {
      cooldowns.set(command.data.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.data.name);
    const defaultCooldownDuration = 60; // seconds
    const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

    if (timestamps.has(interaction.user.id)) {
      const expirationTime =
        timestamps.get(interaction.user.id) + cooldownAmount;

      if (now < expirationTime) {
        const expiredTimestamp = Math.round(expirationTime / 1000);
        return interaction.reply({
          content: `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`,
          ephemeral: true,
        });
      }
    }
    timestamps.set(interaction.user.id, now);
    setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction
          .followUp({
            content: "There was an error while executing this command!",
            ephemeral: true,
          })
          .then(msg => {
            setTimeout(() => msg.delete(), 5000);
          });
      } else {
        await commandResponse(
          interaction,
          `There was an error while executing this command!\n\`${error.message}\``
        );
        customLog(
          "error",
          "There was an error while executing a command",
          interaction,
          error
        );
      }
    }
  },
};
