// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// <ProgramSnippet>
const readline = require("readline-sync");
const gh = require("./graphHelper");
const appSettings = require("./appSettings");
const graphHelper = new gh();

// <ListUsersSnippet>
async function getMessages(emailId, clientId, secretName, region, tenantId) {
  try {
    let settings = await appSettings.getSettings(
      clientId,
      secretName,
      region,
      tenantId
    );

    const messagePage = await graphHelper.getMessagesForUserAsync(
      emailId,
      settings
    );
    const messages = messagePage.value;

    // Output each message's details
    for (const message of messages) {
      console.log(`Message: ${message.subject ?? "NO SUBJECT"}`);
      console.log(`  From: ${message.from?.emailAddress?.name ?? "UNKNOWN"}`);
      console.log(`  Status: ${message.isRead ? "Read" : "Unread"}`);
      console.log(`  Received: ${message.receivedDateTime}`);
    }

    return messages;
  } catch (err) {
    console.log(`Error getting Messages: ${err}`);
  }
}
// </ListUsersSnippet>

module.exports.getMessages = getMessages;
