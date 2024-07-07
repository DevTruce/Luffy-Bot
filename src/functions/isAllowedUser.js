"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports/Variables
const config = require("../../config.json");
const { devUserID } = config.discord; // dev only
const { adminUserIDs } = config.discord; // admins
let allowedUserIDs = [];

///////////////////////////////////////////////////////////////////////////////
//////// Make Sure Only Authorized User Can Use Command
// Developer Only: 0
// Admin Team: 1
function isAllowedUser(user, authLevel) {
  if (authLevel === 0) {
    allowedUserIDs = devUserID;
  }
  if (authLevel === 1) {
    allowedUserIDs = adminUserIDs;
  }
  return allowedUserIDs.includes(user.id);
}

///////////////////////////////////////////////////////////////////////////////
//////// Exports
module.exports = { isAllowedUser };
