import React from 'react'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Breadcrumb, Layout, Menu, Space, theme, Typography } from 'antd';
const { Header, Content, Sider } = Layout;

import 'antd/dist/antd.less';
import 'antd/lib/style/themes/default.less';
import './assets/style/layout.less'

import logo from './assets/images/logo-white.png'

const DashboardIndexPage = () => {
    const items1 = ['1', '2', '3'].map((key) => ({
        key,
        label: `nav ${key}`,
    }));

    return (
        <Layout className='master'>
            <Header className="primaryHeader">
                <div className='item-conainer'>
                    <div className='logo'>
                        <img src={logo} height={50} />
                    </div>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
                    <div className='user-info'>
                        <Avatar icon={<UserOutlined />} size={35} />
                        <span>SivaThangavel</span>
                    </div>
                </div>
            </Header>
            <Layout>
                <Sider width={200} collapsible theme='dark' >
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{
                            height: '100%',
                            borderRight: 0,
                        }}
                        items={items1}
                    />
                </Sider>
                <Layout
                    style={{
                        padding: '0 24px 24px',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: '100vh',

                        }}
                    >
                        Content
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default DashboardIndexPage