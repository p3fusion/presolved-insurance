export type AmplifyDependentResourcesAttributes = {
    "api": {
        "presolvedinsurance": {
            "GraphQLAPIKeyOutput": "string",
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        },
        "ConnectAPI": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        }
    },
    "function": {
        "GetUsersList": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "presolvedinsuranceConnectSDK": {
            "Arn": "string"
        }
    },
    "auth": {
        "presolvedinsurance": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        }
    }
}