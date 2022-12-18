import { Avatar, Space, Typography, Button, Drawer, Spin } from 'antd'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { RxBell, RxMobile, RxPerson, RxClipboardCopy } from 'react-icons/rx'
import { SlUserUnfollow, SlCallIn } from 'react-icons/sl'
import '../assets/style/connectWidget.less'
const ConnectWidget = () => {

    const [state, setState] = useState({
        showConnect: true,
    })

    useEffect(() => {
        initalizeConnect();
    }, [])

    const initalizeConnect = props => {
        setTimeout(() => {
            setState({ ...state, showConnect: false })
        }, 3000)
    }

    return (
        <section className='connect-widget'>
            <div className='widget-container'>
                <div className='userinfo'>
                    <Space size={10}>
                        <Avatar icon={<RxPerson />} size={50} />
                        <Space direction='vertical' size={0} align="start">
                            <Typography.Title level={4}>Hi Siva</Typography.Title>
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
            <Drawer closable onClose={() => setState({ ...state, showConnect: !state.showConnect })} open={state.showConnect} placement='right' width={300} title="Dialer">
                <div className='drawer-center'>
                    <Space wrap direction='vertical' align='center'
                        style={{justifyContent:'center'}}
                    >
                        <Typography.Title level={4}>
                            Please Wait while we load the Connect

                        </Typography.Title>
                        <Spin spinning  size='large' />
                    </Space>

                </div>
            </Drawer>
        </section>
    )
}

export default ConnectWidget