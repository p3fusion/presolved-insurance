// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// <ProgramSnippet>
const readline = require("readline-sync");
const gh = require("./graphHelper");
const appSettings = require("./appSettings");
const graphHelper = new gh();

// <ListUsersSnippet>
async function downloadAttachment(
  emailId,
  clientId,
  secretName,
  region,
  tenantId,
  messageId,
  attachmentId
) {
  try {
    let settings = await appSettings.getSettings(
      clientId,
      secretName,
      region,
      tenantId
    );

    let attachment = await graphHelper.downloadAttachments(
      emailId,
      messageId,
      attachmentId,
      settings
    );

    return attachment;
  } catch (err) {
    console.log(`Error getting Messages: ${err}`);
  }
}

module.exports.downloadAttachment = downloadAttachment;
