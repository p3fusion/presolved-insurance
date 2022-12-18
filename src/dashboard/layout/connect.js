import { Avatar, Space, Typography, Button, Drawer, Spin } from 'antd'
import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { RxBell, RxMobile, RxPerson, RxClipboardCopy } from 'react-icons/rx'
import { SlUserUnfollow, SlCallIn } from 'react-icons/sl'
import '../assets/style/connectWidget.less'
import '../../gc-components/connect-streams'
import '../../gc-components/amazon-connect-customer-profiles'
import '../../gc-components/amazon-connect-task'
import { updateUser } from '../store/reducers/user'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'



const ConnectWidget = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user);
    const connectUrl = "https://p3fusion-qa.my.connect.aws/ccp-v2";
    const loginUrl = "https://d-9067b5964e.awsapps.com/start/#/saml/default/Amazon%20Connect%20Agent%20App/ins-f150c516c8f568f6";

    const divCCP = useRef(null);
    const [state, setState] = useState({
        showConnect: true,
        isLoginSuccess: false,
        isLoggedin:false,
    })

    useEffect(() => {
        setState({ ...state, isLoggedin:true, ...user })
    }, [user])

    useEffect(() => {
        if (divCCP.current) {
            connect.agentApp.initCCP(divCCP.current, {
                ccpUrl: connectUrl, // REQUIRED
                /* loginPopup: true, // optional, defaults to `true`
                loginPopupAutoClose: true, // optional, defaults to `false`
                loginUrl,
                loginOptions: {
                    // optional, if provided opens login in new window 
                    autoClose: true, // optional, defaults to `false`
                    height: 600, // optional, defaults to 578
                    width: 400, // optional, defaults to 433
                    top: 80, // optional, defaults to 0
                    right: 100 // optional, defaults to 0
                }, */
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

            getLoginStatus();
        }
    }, [])
    const getSnapShot = (connectx) => {

        console.log("::Gettting loged in Agent information::");
        connectx.agent((agent) => {
            let agentData = agent._getData()
            setState({ ...state, isLoginSuccess: true, ...agentData.configuration });
            dispatch(updateUser(agentData.configuration))
            console.log("::completed loading the Agent information::");
        });
    }
    const getLoginStatus = props => {
        const interval = setInterval(() => {
            console.log("polling . . .");
            if (connect.agent.initialized) {
                console.log("Login success stoppping the poll . . .");
              
                getSnapShot(connect);
                clearInterval(interval)
            }

        }, 1000);
    }




    return (
        <section className='connect-widget'>
            <div className='widget-container'>
                <div className='userinfo'>
                    <Space size={10}>
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
                            <Button shape='round' icon={<RxPerson />} size="large" type="primary">&nbsp; Change Availibility</Button>
                            <Button shape='round' icon={<RxClipboardCopy />} size="large" >&nbsp; New Interaction</Button>
                        </Space>
                    </div>
                    <div>
                        <Space wrap>
                            <Button icon={<RxBell size={25} />} size='large' shape='circle' type="primary" />
                            <Button icon={<SlCallIn size={25} />} size='large' shape='circle' type="default" onClick={() => setState({ ...state, showConnect: !state.showConnect })} />
                            <Button icon={<SlUserUnfollow size={25} />} danger size='large' shape='circle' type='primary' />
                        </Space>
                    </div>
                </div>
            </div>
            <Drawer className='connect-drawer' closable onClose={() => setState({ ...state, showConnect: !state.showConnect })} open={state.showConnect} placement='right' width={400} title="Dialer">
                <div className="ccp" >
                    <div id="containerDiv" ref={divCCP} style={{ minHeight: '100vh', backgroundColor: '#fff' }} />
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