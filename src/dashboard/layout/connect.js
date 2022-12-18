import { Avatar, Space, Typography, Button } from 'antd'
import React from 'react'
import { RxBell, RxMobile, RxPerson,RxClipboardCopy } from 'react-icons/rx'
import { SlUserUnfollow, SlCallIn } from 'react-icons/sl'
import '../assets/style/connectWidget.less'
const ConnectWidget = () => {
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
                            <Button  shape='round' icon={<RxClipboardCopy />} size="large" >&nbsp; New Interaction</Button>
                        </Space>
                    </div>
                    <div>
                        <Space wrap>
                            <Button icon={<RxBell size={25} />} size='large' shape='circle' type="primary" />
                            <Button  icon={<SlCallIn size={25} />} size='large' shape='circle' type="default" />
                            <Button  icon={<SlUserUnfollow size={25} />} danger size='large' shape='circle' type='primary'  />
                        </Space>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ConnectWidget