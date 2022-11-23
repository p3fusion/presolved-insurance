const { downloadMessage } = require("/opt/downloadMessage");
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  let clientId = "32c21b01-f645-4433-8726-456c9f46958e";
  let tenantId = "b0a714c6-6ab2-43b2-aae0-5e855bb3752f";
  let region = "us-east-1";
  let secretName = "presolved/dev/email/p3fusion";

  //Get Message Id from event
  let messageId = event.detail;
  console.log("Message Id: ", messageId);

  const messagePage = await graphHelper.downloadMessage(
    "presolved-support@p3fusion.com",
    clientId,
    secretName,
    region,
    tenantId,
    messageId
  );

  console.log("Message: ", messagePage);

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
