import { Avatar, Space, Typography, Button, Drawer, Spin, Popover, Popconfirm, Modal,FloatButton  } from 'antd'
import { CustomerServiceOutlined } from '@ant-design/icons';

import React, { useRef, useState, } from 'react'
import { useEffect } from 'react'
import { RxBell, RxMobile, RxPerson, RxStar, RxInfoCircled } from 'react-icons/rx'
import { SlUserUnfollow, SlCallIn, SlCallOut } from 'react-icons/sl'
import '../assets/style/connectWidget.less'
import '../../gc-components/amazon-connect-customer-profiles'
import '../../gc-components/amazon-connect-task'
import { updateUser } from '../store/reducers/user'
import { updateSettings } from '../store/reducers/settings'
import { addNewChannel } from '../store/reducers/channels'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import connectWrapper from './connect-lib'
import { Auth } from 'aws-amplify'
import { navigate } from '@gatsbyjs/reach-router'


const ConnectWidget = (props) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user);
    const settings = useSelector((state) => state.settings);
    const channels = useSelector((state) => state.channels);
    const popoverRef = useRef(null);
    const ref = useRef(null);
    const ref1 = useRef(null);
    const ref2 = useRef(null);


    const divCCP = useRef(null);
    const [state, setState] = useState({
        connect: null,
        currentState: null,
        showAvailibilityPopup: false,
        showConnect: true,
        isLoggedin: false,
        agentStates: []
    })
    //show the logged in agent information 
    useEffect(() => setState({ ...state, isLoggedin: true, ...user }), [user])
    const updateState = (newState) => setState({ ...newState })
    const routeToInterection = (link, props) => {
        navigate(link, { state: { ...props.state } })
    }

    const wrapper = new connectWrapper({ connect, dispatch, divCCP, setState: updateState, state, updateUser, updateSettings, addNewChannel, navigate: routeToInterection })
    //initiate the aws conect dialer
    useEffect(() => wrapper.initiateCCP(), [])

    //settings based events
    useEffect(() => {
        if (settings.activeTask?.contactId && !settings.isConnected) {
            let { contactId, type } = settings.activeTask
            Modal.confirm({
                mask: true,
                title: `New  ${type || "call"}`,
                icon: <RxInfoCircled />,
                content: `Are you sure want to pick the ${contactId}`,
                okText: 'Yes',
                okType: 'danger',
                cancelText: 'No',
                onOk() {
                    setState({ ...state, showConnect: true })
                },
                onCancel() {
                    console.log('Cancel');
                },
            });
            //setState({...state,showConnect:true,})

        }

    }, [settings])


    const tourSteps = [
        {
            title: 'Availibility',
            description: 'This section is to change the agent availibility',
            target: ref.current,
        },
        {
            title: 'Connect Dialer',
            description: 'You can controll the call actions from this dialer section',
            placement: 'right',
            target: () => ref1.current,
        },
        {
            title: 'Logout',
            description: 'You can logout from the application by clicking this button',
            placement: 'top',
            target: () => ref2.current,
        },
    ];

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

                                <Button ref={ref} onClick={() => setState({ ...state, showAvailibilityPopup: !state.showAvailibilityPopup })} shape='round' icon={<RxPerson />} size="large" type="primary">&nbsp; Change Availibility</Button>
                            </Popover>
                            {
                                settings.isConnected ?
                                    <Button type='primary' shape='round' icon={<SlCallIn />}
                                        color="#fc6" onClick={() => navigate('/interactions')} size='large' className='in-call'>&nbsp; Status: In-Call</Button>
                                    :
                                    <Button type='ghost' size='large' shape='round' icon={<SlCallOut />}
                                        color="#fc6">&nbsp; Status: Free-Available</Button>
                            }

                        </Space>
                    </div>
                    <div >
                        <Space wrap >
                            <Button icon={<RxBell />} size='large' shape='circle' type="primary" />
                            <Popover
                                ref={popoverRef}
                                id='dialerpopover'
                                openClassName='dialer-popover'
                                children={
                                    <h1>Welcome sor</h1>
                                }
                                className='dialer-popover'
                                title={<Button type='primary' block danger onClick={() => setState({ ...state, showConnect: !state.showConnect })}>Close</Button>}
                                trigger="click" 
                                open={state.showConnect} 
                                content={
                                    <div style={{height:450}}>
                                        {
                                            !state.isLoggedin &&
                                            <div className='drawer-center' style={{ padding: '50px 10px', textAlign: 'center' }}>
                                                <Space wrap direction='vertical' align='center'
                                                    style={{ justifyContent: 'center' }}
                                                >
                                                    <Typography.Title level={4}>
                                                        Please Wait while we load the Connect

                                                    </Typography.Title>
                                                    <Spin spinning size='large' />
                                                </Space>

                                            </div>
                                        }
                                        <div className="ccp" >
                                            <div id="containerDiv" ref={divCCP} style={{backgroundColor: '#fff' }} />
                                        </div>
                                    </div>
                                }


                            >
                                <Button className='dialer-button' icon={<SlCallIn />} size='large' shape='circle' type="default"
                                  onClick={() => setState({ ...state, showConnect: !state.showConnect })} 
                                />
                            </Popover>
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


            {/* <Drawer mask={false} className='connect-drawer' closable onClose={() => setState({ ...state, showConnect: !state.showConnect })} open={state.showConnect} placement='right' width={400} title="Dialer">
                {
                    !state.isLoggedin &&
                    <div className='drawer-center' style={{ padding: '50px 10px', textAlign: 'center' }}>
                        <Space wrap direction='vertical' align='center'
                            style={{ justifyContent: 'center' }}
                        >
                            <Typography.Title level={4}>
                                Please Wait while we load the Connect

                            </Typography.Title>
                            <Spin spinning size='large' />
                        </Space>

                    </div>
                }
                <div className="ccp" >
                    <div id="containerDiv" ref={divCCP} style={{ backgroundColor: '#fff' }} />
                </div>
            </Drawer> */}


        </section>
    )
}

export default ConnectWidget