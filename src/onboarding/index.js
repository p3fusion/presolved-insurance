import { Router } from "@reach/router";
import React, { Suspense } from "react";
import { Provider } from 'react-redux';
import { store } from './store';
import Suspence from "../suspence";
import OnBoardPage from "./pages/onboard-page";

const SignupPage = React.lazy(() => import('./pages/signup'))

const OnboardAddIndexPage = () => {
    return (
        <Suspense fallback={<Suspence />}>
            <Provider store={store}>
                <Router>
                    <OnBoardPage path="/onboard/*" />
                    <SignupPage path="/*" />
                </Router>
            </Provider>
        </Suspense>
    )
}

export default OnboardAddIndexPage