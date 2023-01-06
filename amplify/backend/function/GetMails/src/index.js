/* Amplify Params - DO NOT EDIT
  API_PRESOLVEDINSURANCE_GRAPHQLAPIENDPOINTOUTPUT
  API_PRESOLVEDINSURANCE_GRAPHQLAPIIDOUTPUT
  API_PRESOLVEDINSURANCE_GRAPHQLAPIKEYOUTPUT
  ENV
  REGION
Amplify Params - DO NOT EDIT */
const { getMessages, } = require("/opt/getMessages");
const AWS = require("aws-sdk");
const { saveEmailMessage, createChannelForEmail, publishEventtoEventBridge, clientId, secretName, region, tenantId } = require("./lib");
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
*/


exports.handler = async (event) => {
  try {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    let messages = await getMessages("presolved-support@p3fusion.com", clientId, secretName, region, tenantId);
    for (const message of messages) {
      console.log("Message: ", message);
      //capture the email message and save it to the database
      let saveEmail = await saveEmailMessage(message);
      // create a new channel case for the email
      let channelCase = await createChannelForEmail(message.id, saveEmail.input);
      // publish the event to the event bridge
      let publishEvent = await publishEventtoEventBridge(message);
    }
    return {statusCode: 200,messages: messages,body: JSON.stringify(messages)};
  }
  catch (error) {
    return {statusCode: 500,messages: error.message,body: JSON.stringify(error)};
  }
};