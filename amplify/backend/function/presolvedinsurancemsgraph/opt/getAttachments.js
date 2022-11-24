// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// <ProgramSnippet>
const readline = require("readline-sync");
const gh = require("./graphHelper");
const appSettings = require("./appSettings");
const graphHelper = new gh();

// <ListUsersSnippet>
async function getAttachments(
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

    let attachments = await graphHelper.getAttachments(
      emailId,
      messageId,
      settings
    );

    return attachments;
  } catch (err) {
    console.log(`Error getting Messages: ${err}`);
  }
}

module.exports.getAttachments = getAttachments;
