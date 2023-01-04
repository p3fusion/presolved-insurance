
const { ConnectClient, SearchUsersCommand } = require("@aws-sdk/client-connect");


/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    // a client can be shared by different commands.
    const client = new ConnectClient({ region: "us-east-1" });

    const input = {
        /** input parameters */
        //InstanceId: 'b19b8083-cbfe-4bc3-84d1-8fbb0fdd5a99', /* required */
        InstanceId: '78e878e8-2ffd-4183-b1a8-8ca60d65a9ad', /* required */
        MaxResults: 100
    };

    const command = new SearchUsersCommand(input);

    // async/await.
    try {
        const response = await client.send(command);
        console.log(response);
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify(response),
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: error,
        };
    } finally {

    }



};
