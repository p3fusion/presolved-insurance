import { Avatar, Space, Typography, Button, Drawer, Spin, Popover, Popconfirm } from 'antd'
import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { RxBell, RxMobile, RxPerson, RxStar } from 'react-icons/rx'
import { SlUserUnfollow, SlCallIn } from 'react-icons/sl'
import '../assets/style/connectWidget.less'
import '../../gc-components/amazon-connect-customer-profiles'
import '../../gc-components/amazon-connect-task'
import { updateUser } from '../store/reducers/user'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import connectWrapper from './connect-lib'
import { Auth } from 'aws-amplify'
import { navigate } from '@gatsbyjs/reach-router'


const ConnectWidget = (props) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user);

    const divCCP = useRef(null);
    const [state, setState] = useState({
        connect: null,
        currentState: null,
        showAvailibilityPopup: false,
        showConnect: true,
        isLoggedin: false,
        agentStates: []
    })


    useEffect(() => setState({ ...state, isLoggedin: true, ...user }), [user])
    const updateState = (newState) => {
        setState({
            ...newState
        })
    }

    const routeToInterection = (link, props) => {
        navigate(link, { state: { ...props.state } })
    }
    const wrapper = new connectWrapper({ connect, dispatch, divCCP, setState:updateState, state, updateUser, navigate: routeToInterection })
    useEffect(() => wrapper.initiateCCP(), [])




    return (
        <section className='connect-widget'>
            <div className='widget-container'>
                <div className='userinfo'>
                    <Space size={10} align='center'>
                        <Avatar icon={<RxPerson />} size={50} />
                        <Space direction='vertical' size={0} align="start">
                            <Typography.Title level={4}>
                                {
                                    state.isLoggedin ?
                                        state.name || state.username : "Guest"
                                }
                            </Typography.Title>
                            <Typography.Text>Welcome to Connect Portal</Typography.Text>
                        </Space>
                    </Space>
                </div>
                <div className='actions'>
                    <div>
                        <Space wrap>
                            <Popover placement='bottom' showArrow
                                content={
                                    <Space space={20} direction="vertical">
                                        {
                                            state.agentStates.length > 0 && state.agentStates.map((states, index) =>
                                                <Button key={index} onClick={() => wrapper.setAgentState({ agentState: states })} shape='round' type='primary' size='large' block>{states.name}</Button>
                                            ) ||
                                            <Space>
                                                <Typography.Text>Please wait</Typography.Text>
                                                <Spin />
                                            </Space>
                                        }
                                    </Space>
                                }
                                title="Change Availibility"
                                trigger="click"
                                open={state.showAvailibilityPopup}
                                onOpenChange={() => setState({ ...state, showAvailibilityPopup: !state.showAvailibilityPopup })}
                            >

                                <Button onClick={() => setState({ ...state, showAvailibilityPopup: !state.showAvailibilityPopup })} shape='round' icon={<RxPerson />} size="large" type="primary">&nbsp; Change Availibility</Button>
                            </Popover>
                        </Space>
                    </div>
                    <div>
                        <Space wrap>
                            <Button icon={<RxBell />} size='large' shape='circle' type="primary" />
                            <Button icon={<SlCallIn />} size='large' shape='circle' type="default" onClick={() => setState({ ...state, showConnect: !state.showConnect })} />
                            <Popconfirm
                                placement='bottomLeft'
                                title="Are you sure want to logout from the dashboard"

                                onConfirm={() => Auth.signOut()}
                                okText="Yes, Logout"
                                cancelText="No, Ignore"
                            >
                                <Button icon={<SlUserUnfollow />} danger size='large' shape='circle' type='primary' />
                            </Popconfirm>
                        </Space>
                    </div>
                </div>
            </div>
            <Drawer mask={false} className='connect-drawer' closable onClose={() => setState({ ...state, showConnect: !state.showConnect })} open={state.showConnect} placement='right' width={400} title="Dialer">
                <div className="ccp" >
                    <div id="containerDiv" ref={divCCP} style={{ backgroundColor: '#fff' }} />
                </div>

                {/* <div className='drawer-center'>
                    <Space wrap direction='vertical' align='center'
                        style={{ justifyContent: 'center' }}
                    >
                        <Typography.Title level={4}>
                            Please Wait while we load the Connect

                        </Typography.Title>
                        <Spin spinning size='large' />
                    </Space>

                </div> */}
            </Drawer>
        </section>
    )
}

export default ConnectWidget