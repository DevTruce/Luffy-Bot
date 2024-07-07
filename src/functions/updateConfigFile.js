"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports/Variables
const fs = require("fs");
const path = require("path");
const { customLog } = require("../functions/customLog.js");
const configPath = path.resolve(__dirname, "../../config.json");

///////////////////////////////////////////////////////////////////////////////
//////// Easily Update Important Values & Store Values Across Server Restarts
async function updateConfigFile(newValues) {
  try {
    let configFile = require(configPath);

    configFile = { ...configFile, ...newValues };

    fs.writeFileSync(configPath, JSON.stringify(configFile, null, 2));
    customLog("success", `Config File Updated Successfully`);
  } catch (error) {
    customLog(
      "error",
      "There was an error while trying to update the config file",
      "",
      error
    );
  }
}

///////////////////////////////////////////////////////////////////////////////
//////// Exports
module.exports = { updateConfigFile };
