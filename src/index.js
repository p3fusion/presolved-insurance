import React from "react";
import ReactDOM from "react-dom";

import { Router } from "@reach/router";
import { store } from './store'
import { Provider } from 'react-redux'
import reportWebVitals from "./gc-components/reportWebVitals";
import DefaultErrorBoundary from "./gc-components/errorBoundary";
import DashboardIndexPage from "./dashboard";
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import './gc-components/connect-streams'

Amplify.configure(awsExports);

ReactDOM.render(
  <React.StrictMode>
    <DefaultErrorBoundary>
     <Router basepath="/">
      <DashboardIndexPage  path="/*" />
     </Router>
    </DefaultErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();