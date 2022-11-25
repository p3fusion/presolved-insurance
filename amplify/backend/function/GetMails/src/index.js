/* Amplify Params - DO NOT EDIT
	API_PRESOLVEDINSURANCE_GRAPHQLAPIENDPOINTOUTPUT
	API_PRESOLVEDINSURANCE_GRAPHQLAPIIDOUTPUT
	API_PRESOLVEDINSURANCE_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */ const {
  getMessages,
} = require("/opt/getMessages");
const AWS = require("aws-sdk");
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  let clientId = "32c21b01-f645-4433-8726-456c9f46958e";
  let tenantId = "b0a714c6-6ab2-43b2-aae0-5e855bb3752f";
  let region = "us-east-1";
  let secretName = "presolved/dev/email/p3fusion";

  const GRAPHQL_ENDPOINT =
    process.env.API_PRESOLVEDINSURANCE_GRAPHQLAPIENDPOINTOUTPUT;
  const GRAPHQL_API_KEY =
    process.env.API_PRESOLVEDINSURANCE_GRAPHQLAPIKEYOUTPUT;

  let messages = await getMessages(
    "presolved-support@p3fusion.com",
    clientId,
    secretName,
    region,
    tenantId
  );

  console.log("Messages: ", messages);

  for (const message of messages) {
    console.log(`Message: ${message.subject ?? "NO SUBJECT"}`);
    console.log(`  From: ${message.from?.emailAddress?.name ?? "UNKNOWN"}`);
    console.log(`  Status: ${message.isRead ? "Read" : "Unread"}`);
    console.log(`  Received: ${message.receivedDateTime}`);

    const variables = {
      input: {
        messageID: message.id,
        subject: message.subject,
        from: message.from.emailAddress.name,
        receivedDateTime: message.receivedDateTime,
      },
    };

    const createEmailMessage = /* GraphQL */ `
      mutation CreateEmailMessage(
        $input: CreateEmailMessageInput!
        $condition: ModelEmailMessageConditionInput
      ) {
        createEmailMessage(input: $input, condition: $condition) {
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

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": GRAPHQL_API_KEY,
      },
      body: JSON.stringify({ createEmailMessage, variables }),
    };

    console.log("GraphQL options", options);
    console.log("GraphQL endpoint", GRAPHQL_ENDPOINT);

    const request = new Request(GRAPHQL_ENDPOINT, options);

    /*try {
      const response = await fetch(request);
      const json = await response.json();
      console.log("Response: ", json);
    } catch (error) {
      console.log("Error: ", error);
    }*/

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
