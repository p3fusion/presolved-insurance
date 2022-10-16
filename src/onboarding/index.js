import { Router } from "@reach/router";
import React, { Suspense } from "react";
import { Provider } from 'react-redux';
import { store } from './store';
import Suspence from "../suspence";

const SignupPage = React.lazy(() => import('./pages/signup'))

const OnboardAddIndexPage = () => {
    return (
        <Suspense fallback={<Suspence />}>
            <Provider store={store}>
                <Router>
                    <SignupPage path="/*" />                    
                </Router>
            </Provider>
        </Suspense>
    )
}

export default OnboardAddIndexPage