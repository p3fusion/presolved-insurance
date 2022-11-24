// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// <ProgramSnippet>
const readline = require("readline-sync");
const gh = require("./graphHelper");
const appSettings = require("./appSettings");
const graphHelper = new gh();

// <ListUsersSnippet>
async function markEmailRead(
  emailId,
  clientId,
  secretName,
  region,
  tenantId,
  messageId
) {
  try {
    let settings = await appSettings.getSettings(
      clientId,
      secretName,
      region,
      tenantId
    );

    const messagePage = await graphHelper.markEmailAsRead(
      emailId,
      messageId,
      settings
    );

    return { message: "Email marked as read" };
  } catch (err) {
    console.log(`Error getting Messages: ${err}`);
    return { message: "Error getting Messages: ${err}" };
  }
}

module.exports.markEmailRead = markEmailRead;
