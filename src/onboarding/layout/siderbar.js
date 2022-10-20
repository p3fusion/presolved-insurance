import React from 'react';
import {
    PhoneOutlined, UploadOutlined,
    UserOutlined,
    AimOutlined,
    VideoCameraOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import p3fsmall from '../assets/images/presolved-small-logo.png';
import p3flogo from '../assets/images/new-big-logo.png'; 


const { Sider } = Layout;

const OnBoardSidebar = ({ collapsed }) => {
    return (
        <Sider theme='light' className='main-sidebar' trigger={null} collapsible collapsed={collapsed} style={{ height:'100vh'}}>
            <div className="logo" style={{margin:'20px'}}>
                    <img src={collapsed ? p3fsmall : p3flogo} height={collapsed ? 50 : 100} className={collapsed ? 'collapsed logo' : 'logo'} />
            </div>
            <Menu
                theme="light"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={[
                    {
                        key: '1',
                        icon: <UserOutlined />,
                        label: 'option1',
                    },
                    {
                        key: 'template_builder',
                        icon: <AimOutlined />,
                        label: 'option2',
                    },
                    {
                        key: 'outbound',
                        icon: <PhoneOutlined />,
                        label: 'option3',
                    },
                    {
                        key: '2',
                        icon: <VideoCameraOutlined />,
                        label: 'option4',
                    },

                    {
                        key: '3',
                        icon: <UploadOutlined />,
                        label: 'option6',
                    },
                ]}
            />
        </Sider>
    )
}

export default OnBoardSidebar;