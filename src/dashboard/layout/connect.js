import { Avatar, Space, Typography, Button, Drawer, Spin, Popover, Popconfirm, Modal } from 'antd'
import React, { useRef, useState, } from 'react'
import { useEffect } from 'react'
import { RxBell, RxMobile, RxPerson, RxStar } from 'react-icons/rx'
import { SlUserUnfollow, SlCallIn } from 'react-icons/sl'
import '../assets/style/connectWidget.less'
import '../../gc-components/amazon-connect-customer-profiles'
import '../../gc-components/amazon-connect-task'
import { updateUser } from '../store/reducers/user'
import { updateSettings } from '../store/reducers/settings'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import connectWrapper from './connect-lib'
import { Auth } from 'aws-amplify'
import { navigate } from '@gatsbyjs/reach-router'


const ConnectWidget = (props) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user);
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


    useEffect(() => setState({ ...state, isLoggedin: true, ...user }), [user])

    const updateState = (newState) => setState({ ...newState })


    const routeToInterection = (link, props) => {
        navigate(link, { state: { ...props.state } })
    }
    const wrapper = new connectWrapper({ connect,  dispatch, divCCP, setState: updateState, state, updateUser,updateSettings, navigate: routeToInterection })
    useEffect(() => wrapper.initiateCCP(),[])
    


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

    const listenConnectAtivity = () => {

        connect.contact(function (contact) {
            contact.onIncoming(function (contact) {
                console.log("onIncoming", contact);
            });

            contact.onRefresh(function (contact) {
                console.log("onRefresh", contact);
                let { contactId, type } = contact
                var contactData = contact._getData()
                console.log({ contactData });
                //notification.info({ message: `You are getting new call ${contactId}` })
                if (!state.showConnect) {
                    Modal.confirm({
                        title: `New  ${type || "call"}`,
                        icon: <ExclamationCircleFilled />,
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
                }
                //setState({ ...state, showConnect: true })

            });

            contact.onAccepted(function (contact) {
                console.log("onAccepted", contact);
                var contactData = contact._getData()
                /*   var contactAttributes = { ...contactData }
                  delete contactAttributes.connections
                  delete contactAttributes.contactFeatures
                  delete contactAttributes.queue
                  setState({ ...state, showWrapButton: true })
                  createChannel(contactAttributes, user) */
                navigate("/interactions", { state: contactData })

            });

            contact.onEnded(function () {
                console.log("onEnded", contact);
                var _getData = contact._getData()
                console.log({ data: _getData, });
            });

            contact.onConnected(function () {
                console.log(`onConnected(${contact.getContactId()})`);
            });
        });
    }


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
                        </Space>
                    </div>
                    <div >
                        <Space wrap >
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
            </Drawer>


        </section>
    )
}

export default ConnectWidget