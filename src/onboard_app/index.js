import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';

const { Header, Content, Footer } = Layout;
import 'antd/dist/antd.less';
import 'antd/lib/style/themes/default.less';


const OnboardAddIndexPage = () => {



    const menuItems = Array(15).fill(null).map((_, index) => {
        const key = index + 1;
        return {
            key,
            label: `nav ${key}`,
        };
    })


    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={menuItems}
                />
            </Header>
            <Content style={{ padding: '0 50px', }}>
                <Breadcrumb style={{ margin: '16px 0', }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-content">Content</div>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >

            </Footer>
        </Layout>
    )
}

export default OnboardAddIndexPage