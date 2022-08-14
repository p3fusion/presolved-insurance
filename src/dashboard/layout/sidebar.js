import React from 'react';
import {
    PhoneOutlined, UploadOutlined,
    UserOutlined,
    VideoCameraOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import logo from '../assets/images/logo.jpg';
import { Link } from '@reach/router';
const { Sider } = Layout;

const DashboardSidebar = ({collapsed}) => {
    return (
        <Sider theme='light' className='main-sidebar' trigger={null} collapsible collapsed={collapsed}>
            <div className="logo">
                <Link to="/">
                <img src={logo} height={collapsed ? 60 : 80} />
                </Link>
            </div>
            <Menu
                theme="light"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={[
                    {
                        key: '1',
                        icon: <UserOutlined />,
                        label: <Link to='/'>Dashboard</Link>,                  
                    },
                    {
                        key: 'outbound',
                        icon: <PhoneOutlined />,
                        label: <Link to='/outbound-calls'>Outbound Calls</Link>,
                    },
                    {
                        key: '2',
                        icon: <VideoCameraOutlined />,
                        label: 'Add Data',
                    },

                    {
                        key: '3',
                        icon: <UploadOutlined />,
                        label: 'Reports',
                    },
                ]}
            />
        </Sider>
    )
}

export default DashboardSidebar