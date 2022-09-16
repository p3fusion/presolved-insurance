import React, { useEffect, useState } from 'react';

import 'antd/dist/antd.less';
import 'antd/lib/style/themes/default.less';
import './assets/style/theme.less';

import { Layout, notification } from 'antd';
import { Router } from '@reach/router';
import DashboardHeader from './layout/header';
import DashboardSidebar from './layout/sidebar';
import DashboardIndexPage from './pages';
import OutboundCallsPage from './pages/outboundCalls';
import TemplateBuilder from './task_builder';
import CreateNewTemplate from './task_builder/newTemplate';
import { useDispatch, useSelector } from 'react-redux';
import { getTaskTemplates } from './api/taskTemplates';
import { updateTemplates } from '../store/reducers/config';


const { Content } = Layout;
const APP = () => {
    const dispatch = useDispatch()
    const config = useSelector((state) => state.config)
    const [collapsed, setCollapsed] = useState(true);

    useEffect(() => {
        if (!config.templates.isLoaded) {
            getTaskTemplates().then((taskTemplates) => {
                dispatch(updateTemplates(taskTemplates))
            }).catch((error) => {
                notification.error({
                    message: "Unable to load the configs, something went wrong",
                    type: 'error'

                })
            })
        }

    }, [config.templates]);

    return (
        <Layout className='newdashboard'>
            <DashboardSidebar collapsed={collapsed} />
            <Layout className="site-layout">
                <DashboardHeader setCollapsed={setCollapsed} collapsed={collapsed} />
                <Content className="main" style={{ minHeight: '100vh', }}>
                    <Router basepath='/'>
                        <DashboardIndexPage path="/" />
                        <OutboundCallsPage path="/outbound-calls" />
                        <TemplateBuilder path="/template-builder" />
                        <CreateNewTemplate path="/new-template" />
                    </Router>

                </Content>
            </Layout>
        </Layout>
    )
}

export default APP