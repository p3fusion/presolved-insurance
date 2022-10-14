import React from "react";
import ReactDOM from "react-dom";

import { Router } from "@reach/router";
import { Amplify } from 'aws-amplify';
import AgentApp from "./agent_app/";
import awsExports from './aws-exports';
import './gc-components/connect-streams';
import DefaultErrorBoundary from "./gc-components/errorBoundary";
import reportWebVitals from "./gc-components/reportWebVitals";
import OnboardAddIndexPage from "./onboard_app";

Amplify.configure(awsExports);

ReactDOM.render(
  <React.StrictMode>
    <DefaultErrorBoundary>
      <Router basepath="/">
        <AgentApp path="/agent/*" />
        <AgentApp path="/*" />
        <OnboardAddIndexPage path="/signup/*" />
      </Router>
    </DefaultErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();