// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// <ProgramSnippet>
const readline = require('readline-sync');
const graphHelper = require('/opt/graphHelper');

// <ListUsersSnippet>
async function getMessages(emailId,settings) {
  try {    
    const messagePage = await graphHelper.getMessagesForUserAsync(emailId, settings);
    const messages = messagePage.value;

    // Output each message's details
    for (const message of messages) {
      console.log(`Message: ${message.subject ?? 'NO SUBJECT'}`);
      console.log(`  From: ${message.from?.emailAddress?.name ?? 'UNKNOWN'}`);
      console.log(`  Status: ${message.isRead ? 'Read' : 'Unread'}`);
      console.log(`  Received: ${message.receivedDateTime}`);
    }

    return messages;
  } catch (err) {
    console.log(`Error getting Messages: ${err}`);
  }
}
// </ListUsersSnippet>

module.exports.getMessages = getMessages;

