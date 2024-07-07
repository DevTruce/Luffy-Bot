"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports/Variables
const color = require("./colors.js");

///////////////////////////////////////////////////////////////////////////////
//////// Helper Functions
function getCurrentDateTime() {
  const now = new Date();

  const options = { month: "long", day: "numeric" };
  const date = now.toLocaleDateString("en-US", options);

  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  const time = `${hours}:${minutes}:${ampm}`;

  return `${color.white}[${date}, ${time}]${color.reset}`;
}

///////////////////////////////////////////////////////////////////////////////
//////// Easily Maintain Log Type & Format
function customLog(messageType, message, interaction, error) {
  let textColor;
  let bgColor;
  let formattedMessage;

  switch (messageType) {
    case "info":
      textColor = color.magenta;
      bgColor = "";
      formattedMessage = `${message}`;
      break;
    case "request":
      textColor = color.yellow;
      bgColor = "";
      formattedMessage = `${message}`;
      break;
    case "success":
      textColor = color.green;
      bgColor = "";
      formattedMessage = `${message}`;
      break;
    case "error":
      textColor = color.red;
      bgColor = "";
      formattedMessage = `ERROR: ${message} \`${error.message}\`\n\`${error.stack}\``;
      break;
    case "discordAction":
      textColor = color.cyan;
      bgColor = "";
      formattedMessage = `${message}`;
      break;
    case "commandUsed":
      textColor = color.cyan;
      bgColor = "";
      formattedMessage = `Command Used: "${interaction}" | User: ${interaction.user.username} | Channel: ${interaction.channel.name}`;
      break;
    case "commandUseDenied":
      textColor = color.cyan;
      bgColor = "";
      formattedMessage = `Command Use Denied: ${message} | User: ${message.user.username} | Channel: ${message.channel.name} - ${color.red}Reason: Unauthorized User!${color.reset}`;
      break;
    default:
      textColor = color.reset;
      bgColor = "";
      formattedMessage = `${message}`;
      break;
  }

  const dateTime = getCurrentDateTime();

  console.log(
    `${dateTime} | ${bgColor}${textColor}${formattedMessage}${color.reset}`
  );
}

///////////////////////////////////////////////////////////////////////////////
//////// Exports
module.exports = { customLog };
