"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Easily Track Command Usage
async function commandResponse(interaction, response) {
  interaction
    .reply({
      content: response,
      ephemeral: true,
    })
    .then(msg => {
      setTimeout(() => msg.delete(), 5000); // delete msg after 5 seconds
    });
}

///////////////////////////////////////////////////////////////////////////////
//////// Exports
module.exports = { commandResponse };
