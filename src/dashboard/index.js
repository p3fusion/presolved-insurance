import { Router } from '@reach/router';
import React, { useState } from 'react';

import { Layout } from 'antd';
import 'antd/dist/antd.less';
import 'antd/lib/style/themes/default.less';
import './assets/style/theme.less';

import DashboardHeader from './layout/header';
import DashboardSidebar from './layout/sidebar';
import DashboardIndexPage from './pages';
import OutboundCallsPage from './pages/outboundCalls';
import ChatPage from './pages/ChatPage';


const { Content } = Layout;
const APP = () => {

    const [collapsed, setCollapsed] = useState(true);

    return (
        <Layout className='newdashboard'>
            <DashboardSidebar collapsed={collapsed} />
            <Layout className="site-layout">
                <DashboardHeader setCollapsed={setCollapsed} collapsed={collapsed} />
                <Content className="main" style={{minHeight: '100vh', }}>
                    <Router basepath='/'>
                        <DashboardIndexPage path="/" />
                        <ChatPage path="/" />
                        <OutboundCallsPage path="/outbound-calls" />
                    </Router>
                   
                </Content>
            </Layout>
        </Layout>
    )
}

export default APP