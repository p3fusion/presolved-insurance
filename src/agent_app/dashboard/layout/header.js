import { MenuFoldOutlined, UserOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Drawer, Row, Space, Typography } from 'antd';
import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { useSelector } from 'react-redux';

import '../../../gc-components/connect-streams'
import '../../../gc-components/amazon-connect-customer-profiles'
import '../../../gc-components/amazon-connect-task'



const DashboardHeader = ({ setCollapsed, collapsed }) => {
    const divCCP = useRef(null);
    const [state, setState] = useState({
        isLoggedin: false,
        showDialer: true
    })
    const user = useSelector((state) => state.user)

    useEffect(() => {
        if (user.connect.isLoggedin) {
            setState({
                ...state,
                isLoggedin: true,
                ...user
            })
        }
    }, [user.connect])

    useEffect(() => {
        const connectUrl = "https://p3fusion-uat.my.connect.aws/ccp-v2"
        if (divCCP.current) {
            connect.agentApp.initCCP(divCCP.current, {
                ccpUrl: connectUrl, // REQUIRED
                loginPopup: true, // optional, defaults to `true`
                loginPopupAutoClose: true, // optional, defaults to `false`
                loginOptions: {
                    // optional, if provided opens login in new window 
                    autoClose: true, // optional, defaults to `false`
                    height: 600, // optional, defaults to 578
                    width: 400, // optional, defaults to 433
                    top: 80, // optional, defaults to 0
                    right: 100 // optional, defaults to 0
                },
                region: "us-east-1", // REQUIRED for `CHAT`, optional otherwise
                softphone: {
                    // optional, defaults below apply if not provided
                    allowFramedSoftphone: true, // optional, defaults to false
                    disableRingtone: false, // optional, defaults to false
                    ringtoneUrl: "./ringtone.mp3" // optional, defaults to CCP’s default ringtone if a falsy value is set
                },
                pageOptions: {
                    //optional
                    enableAudioDeviceSettings: false, //optional, defaults to 'false'
                    enablePhoneTypeSettings: true //optional, defaults to 'true'
                },
                ccpAckTimeout: 5000, //optional, defaults to 3000 (ms)
                ccpSynTimeout: 3000, //optional, defaults to 1000 (ms)
                ccpLoadTimeout: 10000 //optional, defaults to 5000 (ms)
            });
        }
    }, [])


    return (
        <div className='customHeader'>
            <Row align='middle' justify='space-between' wrap>
                <Col span={6}>
                    <Row align='middle' justify='start' wrap>
                        <Col span={4}>
                            <Button className='fold-icon' type='text' onClick={() => setCollapsed(!collapsed)} icon={<MenuFoldOutlined />} />
                        </Col>
                        <Col span={20}>
                            <Typography.Title level={3}>Customer Service</Typography.Title >
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <div style={{ margin: '0 20px', textAlign: 'right', cursor: 'pointer' }}>
                        {
                            !state.isLoggedin ?
                                <Space>
                                    <Avatar icon={<UserOutlined />} />
                                </Space>
                                :
                                <Space>
                                    <Avatar onClick={() => setState({ ...state, showDialer: true })} icon={<WhatsAppOutlined />} style={{ backgroundColor: state.showDialer ? '#87d068' : '#ccc' }} />
                                    <Space>
                                        <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#87d068' }} />
                                        <Typography.Text>{state.connect.name} - {state.connect.username}</Typography.Text>
                                        <div id="username" style={{ display: 'none' }}>{state.connect.username}</div>
                                    </Space>

                                </Space>
                        }
                    </div>
                </Col>
            </Row>
            <Drawer 
            width={450}
            bodyStyle={{padding:0}}
            onClose={()=>setState({...state,showDialer:false})}
            style={{ visibility: state.showDialer ? 'visible' : 'hidden' }} 
            open={true} >
                <div className="ccp" >
                    <div id="containerDiv" ref={divCCP} style={{ minHeight: '100vh', backgroundColor: '#fff' }} />
                </div>
            </Drawer>
        </div>


    )
}



const CustomerProile = (props) => {
    const customerprofiles = useRef(null);
    useEffect(() => {
        if (customerprofiles.current) {
            const instanceUrl = 'https://p3fusion-uat.my.connect.aws/'
            let client = new connect.CustomerProfilesClient(instanceUrl);

        }

    }, [connect.agent.initialized])


    return (
        <section style={{ minHeight: '100vh' }}>

            <div id={`customerprofiles-container`} style={{ minHeight: '100vh' }} ref={customerprofiles} />
        </section>
    )
}


export default DashboardHeader
