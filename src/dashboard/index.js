import React, { useState } from 'react';
import { Router } from '@reach/router';

import 'antd/dist/antd.less';
import 'antd/lib/style/themes/default.less';
import './assets/style/theme.less';
import { Layout, } from 'antd';

import DashboardHeader from './layout/header';
import DashboardSidebar from './layout/sidebar';
import DashboardIndexPage from './pages';
import OutboundCallsPage from './pages/outboundCalls';

 

const { Content } = Layout;
const APP = () => {

    const [collapsed, setCollapsed] = useState(false);

    

    return (
        <Layout className='newdashboard'>
            <DashboardSidebar collapsed={collapsed} />
            <Layout className="site-layout">
                <DashboardHeader setCollapsed={setCollapsed} collapsed={collapsed} />
                <Content className="main" style={{ margin: '24px 16px', padding: 24, minHeight: 280, }}>
                    <Router basepath='/'>
                        <DashboardIndexPage path="/" />
                        <OutboundCallsPage path="/outbound-calls" />
                    </Router>
                    <div id="ccp" style={{ width: "80vw", height: "500px", margin:"30px 0", border:0 }}></div>
                </Content>
            </Layout>
        </Layout>
    )
}

export default APP