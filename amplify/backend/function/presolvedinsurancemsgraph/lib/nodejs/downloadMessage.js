// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// <ProgramSnippet>
const readline = require("readline-sync");
const gh = require("./graphHelper");
const appSettings = require("./appSettings");
const graphHelper = new gh();

// <ListUsersSnippet>
async function downloadMessage(
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

    const messagePage = await graphHelper.getMessageDetails(
      emailId,
      messageId,
      settings
    );

    return messagePage;
  } catch (err) {
    console.log(`Error getting Messages: ${err}`);
  }
}

module.exports.downloadMessage = downloadMessage;
