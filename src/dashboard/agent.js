import React, { useEffect, useState } from 'react';
import { Router } from '@gatsbyjs/reach-router';
import { useSelector } from 'react-redux';

import 'antd/dist/antd.less';
import 'antd/lib/style/themes/default.less';
import './assets/style/layout.less';


const AgentIndexPage = React.lazy(() => import('./pages/indexPage'))
const ChannelsInteraction = React.lazy(() => import('./pages/channels'))
const AgentSAMLPage = React.lazy(() => import('./pages/login-page'))
const DashboardPrimaryHeader = React.lazy(() => import('./layout/header'))
const DashboardPrimarySidebar = React.lazy(() => import('./layout/sidebar'))
const ConnectWidget = React.lazy(() => import('./layout/connect'))



const AgentPage = () => {

    const user = useSelector((state) => state.user)
    const [state, setState] = useState({
        isLoggedin: false
    })

    useEffect(() => {
        if (user.isLoggedin) {
            setState({ ...state, isLoggedin: true })
        }
    }, [user])
    // render the dashboard only if user is authenticated
    if (state.isLoggedin) {
        return (
            <section className='master'>
                <DashboardPrimaryHeader user={user} />
                <section className='wrapper'>
                    <DashboardPrimarySidebar />
                    <div className='container'>
                        <ConnectWidget />
                        <Router>
                            <AgentIndexPage path="/" />
                            <ChannelsInteraction path="channels" />
                        </Router>
                    </div>
                </section>
            </section>
        )
    } 
    //render the login page
    else {
        return <AgentSAMLPage />
    }
}

export default AgentPage