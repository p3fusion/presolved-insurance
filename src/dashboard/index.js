import React from 'react';

import 'antd/dist/antd.less';
import 'antd/lib/style/themes/default.less';
import './assets/style/layout.less';
import { Router } from '@gatsbyjs/reach-router';

const AgentIndexPage= React.lazy(()=>import('./pages/indexPage'))
const ChannelsInteraction= React.lazy(()=>import('./pages/channels'))
const DashboardPrimaryHeader= React.lazy(()=>import('./layout/header'))
const DashboardPrimarySidebar= React.lazy(()=>import('./layout/sidebar'))
const ConnectWidget= React.lazy(()=>import('./layout/connect'))

const DashboardIndexPage = () => {
    return (
        <section className='master'>
            <DashboardPrimaryHeader />
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

export default DashboardIndexPage