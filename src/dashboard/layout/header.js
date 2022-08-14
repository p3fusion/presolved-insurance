import React from 'react';
import {MenuFoldOutlined, UserOutlined} from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';

const { Header } = Layout;

const DashboardHeader = ({setCollapsed,collapsed}) => {
  return (
    <Header  className="site-layout-background" style={{ padding: 0, }}>
                    <div>
                        <Button className='fold-icon' type='text' onClick={() => setCollapsed(!collapsed)} icon={<MenuFoldOutlined />} />
                    </div>
                    <div className='title' style={{ flexGrow: 10 }}  >
                        <div className='main'>Customer Service</div>
                        <div className='sub'>Cloud Contact Center Solution.</div>
                    </div>
                    {/*   <div className='nav' style={{flexGrow:5}}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: 'Dashboard',
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
                    </div> */}
                    <div className='user' style={{ flexGrow: 1 }}>
                        <Menu theme="dark" mode="horizontal" items={[
                            {
                                key: '1',
                                icon: <UserOutlined />,
                                label: 'Steve, Matthew',
                            },

                        ]}
                        />

                    </div>
                </Header>
  )
}

export default DashboardHeader