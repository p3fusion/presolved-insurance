/* Amplify Params - DO NOT EDIT
  API_PRESOLVEDINSURANCE_GRAPHQLAPIENDPOINTOUTPUT
  API_PRESOLVEDINSURANCE_GRAPHQLAPIIDOUTPUT
  API_PRESOLVEDINSURANCE_GRAPHQLAPIKEYOUTPUT
  ENV
  REGION
Amplify Params - DO NOT EDIT */
const { getMessages, } = require("/opt/getMessages");
const AWS = require("aws-sdk");
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */


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
  assignTo
  contactID
  channelType
  contactAttributes
  createdAt
  updatedAt
}
}
`;

const clientId = "32c21b01-f645-4433-8726-456c9f46958e";
const tenantId = "b0a714c6-6ab2-43b2-aae0-5e855bb3752f";
const region = "us-east-1";
const secretName = "presolved/dev/email/p3fusion";

const GRAPHQL_ENDPOINT = process.env.API_PRESOLVEDINSURANCE_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_PRESOLVEDINSURANCE_GRAPHQLAPIKEYOUTPUT;

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  let messages = await getMessages(
    "presolved-support@p3fusion.com",
    clientId,
    secretName,
    region,
    tenantId
  );



  for (const message of messages) {
    console.info(`Message: ${message.subject ?? "NO SUBJECT"}`);
    console.info(`From: ${message.from?.emailAddress?.name ?? "UNKNOWN"}`);
    console.info(`Status: ${message.isRead ? "Read" : "Unread"}`);
    console.info(`Received: ${message.receivedDateTime}`);

    const createChannel = async (contactId, messages) => {

      let variables = {
        input: {
          assignTo: "p3fusion",
          contactID: contactId,
          channelType: "email",
          contactAttributes: JSON.stringify(messages)
        }
      };
  
      console.log({ variables, messages })
  
      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": GRAPHQL_API_KEY,
        },
        body: JSON.stringify({ query: createChannelQuery, variables }),
      };
  
      console.log("********************************************************************************");
      console.log("GraphQL options Channel", options);
      console.log("GraphQL endpoint Channel", GRAPHQL_ENDPOINT);
  
      let createEmailChannel = new Request(GRAPHQL_ENDPOINT, options);
  
      try {
        let response = await fetch(createEmailChannel);
        let json = await response.json();
        console.log("ChannelData: ", json);
        return json;
  
      } catch (error) {
        console.error("**************************************");
        console.error({ error });
        throw error
      }
  
    }

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

    try {
      let response = await fetch(request);
      let json = await response.json();
      let channelDetails = await createChannel(message.id, variables.input);
      console.log("channelDetails: ", channelDetails);
      console.log("Response: ", json);

    } catch (error) {
      console.error({createEmail:error});
      throw error;
     
    }

    //Publish an event to EventBridge
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
    });
  }

  

  return {
    statusCode: 200,
    messages: messages,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
    body: JSON.stringify(messages),
  };

};