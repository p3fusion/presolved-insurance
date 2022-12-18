import { UserOutlined } from '@ant-design/icons';
import { RxTextAlignLeft, RxHome, RXus } from "react-icons/rx";
import { Avatar, Layout, Menu } from 'antd';
import React from 'react';
import logo from '../assets/images/logo-white.png';
const { Header } = Layout;

const DashboardPrimaryHeader = () => {
    const items1 = ['Home'].map((key) => ({
        key,
        icon: <RxHome size={20} />,
        label: key,
    }));
    return (
        <section className='header'>
            <Header className="primaryHeader">
                <div className='container'>
                    <div className='item-conainer'>
                        <div className='logo'>
                            <img src={logo} height={50} />
                        </div>
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['Home']} items={items1} />
                        <div className='user-info'>
                            <Avatar icon={<UserOutlined />} size={35} />
                            <span>Siva Thangavel</span>
                        </div>
                    </div>
                </div>
            </Header>
        </section>
    )
}

export default DashboardPrimaryHeader