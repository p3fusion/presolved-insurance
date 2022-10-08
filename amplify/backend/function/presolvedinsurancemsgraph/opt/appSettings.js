// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// Load the AWS SDK
var AWS = require('aws-sdk');

    class SecretsManager {
        /**
              * Uses AWS Secrets Manager to retrieve a secret
              */
             static async getSecret (secretName, region){
                 const config = { region : region }
                 var secret, decodedBinarySecret;
                 let secretsManager = new AWS.SecretsManager(config);
                 try {
                     let secretValue = await secretsManager.getSecretValue({SecretId: secretName}).promise();
                     if ('SecretString' in secretValue) {
                         return secret = secretValue.SecretString;
                     } else {
                         let buff = new Buffer(secretValue.SecretBinary, 'base64');
                         return decodedBinarySecret = buff.toString('ascii');
                     }
                 } catch (err) {
                     if (err.code === 'DecryptionFailureException')
                         // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
                         // Deal with the exception here, and/or rethrow at your discretion.
                         throw err;
                     else if (err.code === 'InternalServiceErrorException')
                         // An error occurred on the server side.
                         // Deal with the exception here, and/or rethrow at your discretion.
                         throw err;
                     else if (err.code === 'InvalidParameterException')
                         // You provided an invalid value for a parameter.
                         // Deal with the exception here, and/or rethrow at your discretion.
                         throw err;
                     else if (err.code === 'InvalidRequestException')
                         // You provided a parameter value that is not valid for the current state of the resource.
                         // Deal with the exception here, and/or rethrow at your discretion.
                         throw err;
                     else if (err.code === 'ResourceNotFoundException')
                         // We can't find the resource that you asked for.
                         // Deal with the exception here, and/or rethrow at your discretion.
                         throw err;
                 }
             } 
         }    
         
         async function getSettings(clientId, secretName, region, tenantId) {
                let secret = await SecretsManager.getSecret(secretName, region);
                const settings = {
                    'clientId': clientId,
                    'clientSecret': secret,
                    'tenantId': tenantId,
                    'authTenant': 'common',
                    'graphUserScopes': [
                      'offline_access',
                      'user.read',
                      'mail.read',
                      'mail.send'
                    ]
                  };                
                return settings;
         }


module.exports.getSettings = getSettings;



