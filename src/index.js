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

const ChatWigetForTesting = React.lazy(() => import('./chat')); 
const DashboardIndexPage = React.lazy(() => import('./dashboard')); 


//const AgentApp = React.lazy(() => import("./agent_app/"));
/* const OnboardAddIndexPage = React.lazy(() => import('./onboarding'));
const LandingPage = React.lazy(() => import('./landing_page')); */
connect.getLog().setEchoLevel(connect.LogLevel.CRITICAL);
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
          <ChatWigetForTesting path="/chat/*" />
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


//to bulk delete
//data.items.map((rec,index)=>`id${index}:deleteChannel(input: {id: "${rec.id}"}) {id}`).toString()
//data.items.map((rec,index)=>`id${index}:deleteTask(input: {id: "${rec.id}"}) {id}`).toString()