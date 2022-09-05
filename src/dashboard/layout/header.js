import { MenuFoldOutlined, UserOutlined, MessageOutlined, PhoneOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, Segmented, Avatar, Row, Col, Typography, Drawer, Space } from 'antd';
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
//import "amazon-connect-streams";
/* import  '../../gc-components/connect-streams' */

const { Header } = Layout;


const DashboardHeader = ({ setCollapsed, collapsed }) => {
    const [state, setState] = useState({
        showConnect: false
    })
    const hideConnect = () => {
        setState({ ...state, showConnect: false })
    }
    {/* <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h4>Customer Service</h4>
            </div>            
        </div> */}

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
                    <Space>
                        <Button type='primary' danger size='large' shape='circle' onClick={() => setState({ ...state, showConnect: !state.showConnect })} icon={<PhoneOutlined size={40} />} />
                        <Button type='primary' size='large' shape='circle' onClick={() => setState({ ...state, showConnect: !state.showConnect })} icon={<MessageOutlined size={40} />} />
                    </Space>
                </Col>
            </Row>
           {/*  <AWSConnect show={state.showConnect} hideConnect={hideConnect} />  */} 
        </div>


    )
}

export default DashboardHeader




const AWSConnect = ({ show, hideConnect }) => {


    const divCCP = useRef(null);
  /*   const customerprofiles = useRef(null);
    const wisdom = useRef(null); */
    useLayoutEffect(() => {

      /*   if (customerprofiles.current) {
            let instanceURL = "https://p3fusion-uat.my.connect.aws/customerprofiles-v2";
            window.connect.core.initCCP(customerprofiles.current, {
                ccpUrl: instanceURL, // REQUIRED
            })
        }
        if (wisdom.current) {
            let instanceURL = "https://p3fusion-uat.my.connect.aws/wisdom-v2";
            window.connect.core.initCCP(customerprofiles.current, {
                ccpUrl: instanceURL, // REQUIRED
            })
        } */

        if (divCCP.current) {
            let instanceURL = "https://p3fusion-uat.my.connect.aws/ccp-v2";
            // eslint-disable-next-line no-undef
            window.connect.core.initCCP(divCCP.current, {
                ccpUrl: instanceURL, // REQUIRED
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
        <div className="ccp" style={{ display: show ? '' : 'none' }}>
            <div id="containerDiv" style={{ height: 640, width: 480 }} ref={divCCP} />
            <div>
                <Button block type='primary' danger icon={<CloseOutlined />} onClick={() => hideConnect()} >Close</Button>
            </div>

          {/*   <div id="customerprofiles-container" ref={customerprofiles} style={{ height: 640, width: 480 }}></div>
            <div id="wisdom-container" ref={customerprofiles} style={{ height: 640, width: 480 }}></div> */}
        </div>


    )

}