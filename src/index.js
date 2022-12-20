import { Router } from "@gatsbyjs/reach-router";
import { Amplify } from "aws-amplify";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import oldAwsConfig from "./aws-exports";
import "./gc-components/connect-streams";
import DefaultErrorBoundary from "./gc-components/errorBoundary";
import reportWebVitals from "./gc-components/reportWebVitals";
//import PresolvedOnboardIndexPage from "./signupPage";
//import EmailPage from "./emailViewer";
import Suspence from "./suspence";
import DashboardIndexPage from "./dashboard";

//const AgentApp = React.lazy(() => import("./agent_app/"));
/* const OnboardAddIndexPage = React.lazy(() => import('./onboarding'));
const LandingPage = React.lazy(() => import('./landing_page')); */

/* const isLocalhost = Boolean(
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
 */


const root = document.getElementById("root");
Amplify.configure(oldAwsConfig);
//Amplify.configure(awsExports);

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<Suspence />}>
      <DefaultErrorBoundary>
        <Router basepath="/">
          <DashboardIndexPage path="/*" />
          <DashboardIndexPage path="/app/*" />
{/*           <AgentApp path="/*" />
          <AgentApp path="/agent/*" />
          {
          // <LandingPage path="/site/*" />
          // <OnboardAddIndexPage path="/signup/*" />
          }
          <PresolvedOnboardIndexPage path="/signup/*" />
          <EmailPage path="/email/*" /> */}
        </Router>
      </DefaultErrorBoundary>
    </Suspense>
  </React.StrictMode>,
  root
);

reportWebVitals();
