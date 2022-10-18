import { MenuFoldOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Row, Space, Typography } from 'antd';
import React from 'react';
import 'antd/dist/antd.css'; 


const OnBoardHeader = ({ setCollapsed, collapsed }) => {
  
    return (
        <div className='customHeader'>
            <Row align='middle' justify='space-between' wrap>
                <Col span={16}>
                    <Row align='middle' justify='start' wrap>
                        <Col span={4}>
                            <Button className='fold-icon' type='text' onClick={() => setCollapsed(!collapsed)} icon={<MenuFoldOutlined />} />
                        </Col>
                        <Col span={20}>
                            <Typography.Title level={3}>OnBoard Service</Typography.Title >
                        </Col>
                    </Row>
                </Col>
                <Col span={4}>
                    <div style={{ margin: '0 20px', textAlign: 'right', cursor: 'pointer' }}>
                        {
                                <Space>
                                    <Avatar icon={<UserOutlined />} />
                                </Space>
                        }
                    </div>
                </Col>
            </Row>
        </div>


    )
}

export default OnBoardHeader