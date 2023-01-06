const AWS = require("aws-sdk");

const clientId = "32c21b01-f645-4433-8726-456c9f46958e";
const tenantId = "b0a714c6-6ab2-43b2-aae0-5e855bb3752f";
const region = "us-east-1";
const secretName = "presolved/dev/email/p3fusion";
const GRAPHQL_ENDPOINT = process.env.API_PRESOLVEDINSURANCE_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_PRESOLVEDINSURANCE_GRAPHQLAPIKEYOUTPUT;
const query = /* GraphQL */ `
mutation CreateEmailMessage($input: CreateEmailMessageInput!) {
  createEmailMessage(input: $input) {
    id
    channelID
    from
    to
    messageID
    body
    subject
    attachments
    receivedTime
    createdAt
    updatedAt
  }
}
`;
const createChannelQuery =/* GraphQL */ `
mutation CreateChannel($input: CreateChannelInput!) {
createChannel(input: $input) {
  id
  notes
  assignTo
  contactID
  channelType
  contactAttributes
  createdAt
  updatedAt
}
}
`;


const createChannelForEmail = (contactId, messages) => {
    
    let variables = {
        input: {
            notes:"Email Message",
            assignTo: "p3fusion",
            contactID: contactId,
            channelType: "email",
            contactAttributes: JSON.stringify(messages)
        }
    };
    
    return new Promise(async (resolve, reject) => {
        try {          
            let options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": GRAPHQL_API_KEY,
                },
                body: JSON.stringify({ query: createChannelQuery, variables }),
            };
            let createEmailChannel = new Request(GRAPHQL_ENDPOINT, options);
            let response = await fetch(createEmailChannel);
            let json = await response.json();
            resolve(json);
        } catch (error) {
            console.error({ createChannel: error, contactId, messages, variables });
            reject({ createChannel: error })
        }
    })
}

const saveEmailMessage = async (message) => {
    return new Promise(async (resolve, reject) => {
        try {
            const variables = {
                input: {
                    messageID: message.id,
                    channelID: message.id,
                    to: "presolved-support@p3fusion.com",
                    body: "body",
                    subject: message.subject,
                    from: message.from.emailAddress.name,
                    receivedTime: message.receivedDateTime,
                },
            };
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": GRAPHQL_API_KEY,
                },
                body: JSON.stringify({ query, variables }),
            };

            let request = new Request(GRAPHQL_ENDPOINT, options);
            let response = await fetch(request);
            let json = await response.json();           
            resolve({input:variables.input, response:json});
        }
        catch (error) {
            console.error({ saveEmailMessage: error });
            reject({ saveEmailMessage: error })
        }
    })
}


const publishEventtoEventBridge = (message) => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = {
                Entries: [
                    {
                        Detail: JSON.stringify({ messageId: message.id }),
                        DetailType: "DownloadEmail",
                        Source: "PS.GetMails",
                    },
                ],
            };
            let eventBridge = new AWS.EventBridge();
            eventBridge.putEvents(params, function (err, data) {
                if (err) console.log(err, err.stack);
                // an error occurred
                else console.log("Successfuly posted an event"); // successful response               
                resolve(data);
            });

        } catch (error) {
            console.error({ publishEventtoEventBridge: error });
            reject({ publishEventtoEventBridge: error })
        }
    })

}


module.exports ={
    publishEventtoEventBridge,
    saveEmailMessage,
    createChannelForEmail,
    clientId,
    tenantId,
    region,
    secretName,
    GRAPHQL_ENDPOINT,
    GRAPHQL_API_KEY
    
}