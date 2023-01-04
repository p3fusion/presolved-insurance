import React, { useEffect, useState } from 'react';
import { Router } from '@gatsbyjs/reach-router';
import { useDispatch, useSelector } from 'react-redux';

import 'antd/dist/antd.less';
import 'antd/lib/style/themes/default.less';
import './assets/style/layout.less';
import { getAllEmails } from './api/emails';
import { getAllChannels, getAllUsersFromConnect, getTaskTemplates } from './api/taskTemplates';
import { updateEmails } from './store/reducers/emails';
import { updateTemplates } from './store/reducers/config';
import { updateChannels, updateTasks } from './store/reducers/channels';
import { notification } from 'antd';
import { uniqBy } from 'lodash';
import ChannelViewAll from './pages/channel-view-all-interactions';
import ChannelDetails from './pages/interactions/channel-details';
import { updateAgentsList } from './store/reducers/user';
import { getAllTasksAPI } from './api/interaction-api';



const AgentIndexPage = React.lazy(() => import('./pages/indexPage'))
const ChannelsDetails = React.lazy(() => import('./pages/channels'))
const AgentSAMLPage = React.lazy(() => import('./pages/login-page'))
const DashboardPrimaryHeader = React.lazy(() => import('./layout/header'))
const DashboardPrimarySidebar = React.lazy(() => import('./layout/sidebar'))
const InteractionsIndexPage = React.lazy(() => import('./pages/interaction'))
const TasksBuilder = React.lazy(() => import('./pages/task_builder/newTemplate'))

const ConnectWidget = React.lazy(() => import('./layout/connect'))



const AgentPage = () => {
    const dispatch = useDispatch()

    const emails = useSelector((state) => state.emails)
    const config = useSelector((state) => state.config)
    const channels = useSelector((state) => state.channels)

    const user = useSelector((state) => state.user)
    const [state, setState] = useState({
        isLoggedin: false
    })

    useEffect(() => {
        if (user.isLoggedin) {
            setState({ ...state, isLoggedin: true })
        }
    }, [user])

    useEffect(() => {
        if (!emails.isLoaded) {
            getAllEmails().then((allEmails) => {
                let uniqEMails = uniqBy(allEmails, 'messageID')
                dispatch(updateEmails(uniqEMails))
            }).catch((error) => {
                notification.error({
                    description: error.message,
                    duration: 10,
                    message: "Unable to load  getAllEmails",
                    type: 'error'

                })
            })
        }

        if (!config.templates.isLoaded) {
            getAllUsersFromConnect().then((allUsers) => {
                dispatch(updateAgentsList(allUsers?.Users || allUsers))
            }).catch((error) => {
                notification.error({
                    description: error.message,
                    duration: 10,
                    message: "Unable to load  getAllUsersFromConnect",
                    type: 'error'

                })
            })

            getTaskTemplates().then((taskTemplates) => {
                dispatch(updateTemplates(taskTemplates))
            }).catch((error) => {
                notification.error({
                    message: "Unable to load the configs",
                    description: error.message,
                    type: 'error'

                })
            })
        }
        if (!channels.isLoaded) {            
            getAllTasksAPI().then((result) => {    
                dispatch(updateTasks(result))
            })
            getAllChannels().then((result) => {
                dispatch(updateChannels(result))
            }).catch((error) => {
                notification.error({
                    description: error.message,
                    message: "Unable to load the channels",
                    type: 'error'

                })
            })
        }
    }, [])

    // render the dashboard only if user is authenticated
    if (state.isLoggedin) {
        return (
            <section className='master'>
                <DashboardPrimaryHeader user={user} />
                <section className='wrapper'>
                    <DashboardPrimarySidebar />
                    <div className='container'>
                        <ConnectWidget />
                        <Router >
                            <AgentIndexPage path="/" />
                            <ChannelsDetails path="/channels" />
                            <InteractionsIndexPage path="/interactions" />
                            <TasksBuilder path="/task-builder" />
                            <ChannelViewAll path="/view-all" />
                            <ChannelDetails path="/details" />
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