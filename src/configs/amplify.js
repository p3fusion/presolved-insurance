import oldAwsConfig from '../aws-exports'

export const oauthConfig = () => {
    const isLocalhost = Boolean(
        window.location.hostname === "localhost" ||
        // [::1] is the IPv6 localhost address.
        window.location.hostname === "[::1]" ||
        // 127.0.0.1/8 is considered localhost for IPv4.
        window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
        )
    );

    const oauth = {
        domain: "presolvedtenant.auth.us-east-1.amazoncognito.com",
        scope: [
            "aws.cognito.signin.user.admin",
            "email",
            "openid",
            "phone",
            "profile",
        ],
        redirectSignIn: 'https://localhost:3000/',
        redirectSignOut: 'https://localhost:3000/',
        responseType: "code",
        identityProvider: "CognitoSAML",
    }

    let awsConfig = {
        ...oldAwsConfig,
        oauth: oauth
    }
    const [localRedirectSignIn, productionRedirectSignIn] = awsConfig?.oauth?.redirectSignIn.split(",") || [];
    const [localRedirectSignOut, productionRedirectSignOut] = awsConfig?.oauth?.redirectSignOut.split(",") || [];

    let updatedAwsConfig = {
        ...awsConfig,
        oauth: {
            redirectSignIn: isLocalhost ? localRedirectSignIn : productionRedirectSignIn,
            redirectSignOut: isLocalhost ? localRedirectSignOut : productionRedirectSignOut,
        },
    };


    return updatedAwsConfig

}