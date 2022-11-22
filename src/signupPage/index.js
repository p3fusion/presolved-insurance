import { Router } from "@gatsbyjs/reach-router";
import React, { Suspense } from "react";
import { Provider } from 'react-redux';
import { store } from './store';
import Suspence from "../suspence"

import PresolvedOnboardPage from "./signup";


//const OnBoardPage = React.lazy(() => import('./new/signup'));

const PresolvedOnboardIndexPage = () => {
    return (
        <Suspense fallback={<Suspence />}>
            <Provider store={store}>
                <PresolvedOnboardPage />
            </Provider>
        </Suspense>
    )
}

export default PresolvedOnboardIndexPage