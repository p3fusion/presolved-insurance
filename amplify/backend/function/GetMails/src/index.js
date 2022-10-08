const { getMessages } = require('/opt/getMessages');
const { getSettings } = require('./appSettings');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    let clientId = '32c21b01-f645-4433-8726-456c9f46958e';
    let tenantId = 'b0a714c6-6ab2-43b2-aae0-5e855bb3752f';
    let region = "us-east-1";
    let secretName = "presolved/dev/email/p3fusion"; 

    let settings = await getSettings(clientId, secretName, region, tenantId);    
    console.log('Getting settings resuls', settings);

    let messages = await getMessages('presolved-support@p3fusion.com', settings);
    console.log('Messages: ', messages);
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
