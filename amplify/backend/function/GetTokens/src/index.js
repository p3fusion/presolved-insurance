const {
  ConnectClient,
  GetFederationTokenCommand,
} = require("@aws-sdk/client-connect");

const {
  STSClient,
  AssumeRoleCommand,
  GetCallerIdentityCommand,
} = require("@aws-sdk/client-sts");
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  // a client can be shared by different commands.
  const client = new ConnectClient({ region: "us-east-1" });

  // Set the parameters
  const params = {
    RoleArn: "arn:aws:iam::851171462885:role/P3Fusion_IdentityCenter_SAML_Role", //ARN_OF_ROLE_TO_ASSUME
    RoleSessionName: "session1",
    DurationSeconds: 900,
  };
  const stsClient = new STSClient({ region: "us-east-1" });
  const data = await stsClient.send(new AssumeRoleCommand(params));
  console.log(data.Credentials);

  const input = {
    /** input parameters */
    InstanceId: "78e878e8-2ffd-4183-b1a8-8ca60d65a9ad" /* required */,
    MaxResults: 100,
    Name: "t.siva@p3fusion.com",
  };

  const command = new GetFederationTokenCommand(input);

  const requestContext = event.requestContext;

  // async/await.
  try {
    const response = await client.send(command);
    console.log(response);
    return {
      statusCode: 200,
      //  Uncomment below to enable CORS requests
      //  headers: {
      //      "Access-Control-Allow-Origin": "*",
      //      "Access-Control-Allow-Headers": "*"
      //  },
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.log("Error is ", error);
    return {
      statusCode: 500,
      //  Uncomment below to enable CORS requests
      //  headers: {
      //      "Access-Control-Allow-Origin": "*",
      //      "Access-Control-Allow-Headers": "*"

      //  },
      body: JSON.stringify(error),
    };
  }
};
