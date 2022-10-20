import { MenuFoldOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Row, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import 'antd/dist/antd.css';


const OnBoardHeader = ({ setCollapsed, collapsed }) => {
    const [state, setState] = useState({
        isLoggedin: false
    })
    const user = useSelector((state) => state.user)
    
    useEffect(() => {
        if (user.AppAuth.isLoggedin) {
            setState({ ...state, ...user.AppAuth })
        }
    }, [user])


    return (
        
        <div className='customHeader'>
            <Row align='middle' justify='space-between' wrap>
                <Col span={12}>
                    <Row align='middle' justify='start' wrap>
                        <Col span={4}>
                            <Button className='fold-icon' type='text' onClick={() => setCollapsed(!collapsed)} icon={<MenuFoldOutlined />} />
                        </Col>
                        <Col span={20}>
                            <Typography.Title level={3}>OnBoard Service</Typography.Title >
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <div style={{ margin: '0 20px', textAlign: 'right', cursor: 'pointer' }}>
                        {!state.isLoggedin ?
                            <Space>
                                <Avatar icon={<UserOutlined />} />
                            </Space>
                            :
                            <Space>
                                <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#87d068' }} />
                                <Typography.Text>{state.email}</Typography.Text>
                                {/* <Typography.Text>{state.name} - {state.username}</Typography.Text>
                                <div id="username" style={{ display: 'none' }}>{state.username}</div> */}
                            </Space>
                        }
                    </div>
                </Col>
            </Row>
        </div>


    )
}

export default OnBoardHeader