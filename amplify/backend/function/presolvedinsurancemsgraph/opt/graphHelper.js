// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// <UserAuthConfigSnippet>
require('isomorphic-fetch');
const azure = require('@azure/identity');
const graph = require('@microsoft/microsoft-graph-client');
const authProviders =
  require('@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials');

let _settings = undefined;
let _deviceCodeCredential = undefined;
let _userClient = undefined;



// <AppOnyAuthConfigSnippet>
let _clientSecretCredential = undefined;
let _appClient = undefined;

function ensureGraphForAppOnlyAuth() {
  // Ensure settings isn't null
  if (!_settings) {
    throw new Error('Settings cannot be undefined');
  }

  if (!_clientSecretCredential) {
    _clientSecretCredential = new azure.ClientSecretCredential(
      _settings.tenantId,
      _settings.clientId,
      _settings.clientSecret
    );
  }

  if (!_appClient) {
    const authProvider = new authProviders.TokenCredentialAuthenticationProvider(
      _clientSecretCredential, {
        scopes: [ 'https://graph.microsoft.com/.default' ]
      });

    _appClient = graph.Client.initWithMiddleware({
      authProvider: authProvider
    });
  }
}
// </AppOnyAuthConfigSnippet>

async function getMessagesForUserAsync(email, settings) {

  // Ensure settings isn't null
  if (!settings) {
    throw new Error('Settings cannot be undefined');
  }

  _settings = settings;
  ensureGraphForAppOnlyAuth();

  // Ensure client isn't undefined
  if (!_appClient) {
    throw new Error('Graph has not been initialized for app-only auth');
  }

  return _appClient.api(`/users/${email}/messages`)
  .select(['from', 'isRead', 'receivedDateTime', 'subject'])
  .top(25)
  .orderby('receivedDateTime DESC')
  .get();

}

module.exports.getMessagesForUserAsync = getMessagesForUserAsync;
