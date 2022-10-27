import { Checkbox, Radio, Form, Button, Space, Row, Col, Typography, Divider, Collapse, Card, Switch, Input } from 'antd';
import React, { useState } from 'react';

import { PhoneOutlined, MailOutlined, MessageOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
const CheckboxGroup = Checkbox.Group;
const plainOptions = ['Phone', 'Chat', 'Email'];
const defaultCheckedList = ['Phone'];
import ils1 from '../../assets/images/illustrations/signup-4.svg'
const { Panel } = Collapse;

const ChooseChannel = (props) => {

    const [state, setState] = useState({
        channelPhone: true,
        channelEmail: false,
        channelChat: false,
        phone: {
            showOption: false,
            showSubOption: false,
            phoneNumberOptions: [
                { label: 'Use my old phone number', value: 'oldNumber' },
                { label: 'Allocate new number', value: 'newNumber' }
            ],
            phoneNumberSubOptions: [
                { label: 'TFN', value: 'TFN' },
                { label: 'DID', value: 'DID' }
            ]
        },
        email: {},
        chat: {},
    })

    const onChangePhoneConfigure = (e) => {
        if (e.target.value === 'newNumber') {
            setState({
                ...state,
                phone: {
                    ...state.phone,
                    showOption: true,
                }
            })
        }
        else {
            setState({
                ...state,
                phone: {
                    ...state.phone,
                    showOption: false,
                    showSubOption: false

                }
            })
        };
    }
    const onFinish = () => { }
    const onFinishFailed = () => { }


    return (
        <div className='steps-channel'>
            <Row gutter={[16, 16]} align='stretch' justify='space-evenly'>

                <Col span={8}>
                    <img src={ils1} className="sideimg" />
                </Col>

                <Col span={16}>
                    <Typography.Title level={3}>Choose Your required Channels</Typography.Title>
                    <Divider />
                    <Row>
                        <Col span={24}>
                            <div className='channels'>
                                <Card className='channel-item'>
                                    <Row align='middle'>
                                        <Col span={12}>
                                            <PhoneOutlined style={{ fontSize: 50 }} />
                                        </Col>
                                        <Col span={12}>
                                            <Typography.Title level={3}>Phone</Typography.Title>
                                            <Switch
                                                onChange={() => setState({ ...state, channelEmail: true })}
                                                defaultChecked={state.channelPhone}
                                            />
                                        </Col>
                                    </Row>
                                </Card>
                                <Card className='channel-item'>
                                    <Row align='middle'>
                                        <Col span={12}>
                                            <MailOutlined style={{ fontSize: 50 }} />
                                        </Col>
                                        <Col span={12}>
                                            <Typography.Title level={3}>Email</Typography.Title>
                                            <Switch
                                                onChange={() => setState({ ...state, phone: true })}
                                                defaultChecked={state.channelEmail}
                                            />
                                        </Col>
                                    </Row>
                                </Card>
                                <Card className='channel-item'>
                                    <Row align='middle'>
                                        <Col span={12}>
                                            <MessageOutlined style={{ fontSize: 50 }} />
                                        </Col>
                                        <Col span={12}>
                                            <Typography.Title level={3}>Chat</Typography.Title>
                                            <Switch
                                                onChange={() => setState({ ...state, channelChat: true })}
                                                defaultChecked={state.channelChat}
                                            />
                                        </Col>
                                    </Row>
                                </Card>
                            </div>
                        </Col>
                    </Row>

                    <Row style={{ marginTop: 30 }}>
                        <Col span={24}>
                            <Collapse defaultActiveKey={['phone']} ghost >
                                {state.channelPhone &&
                                    <Panel header="Phone" key="phone" showArrow={false} >
                                        <Form
                                            name="phoneConfigure"
                                            layout='vertical'
                                            labelCol={{ span: 8 }}
                                            wrapperCol={{ span: 14 }}
                                            onFinish={onFinish}
                                            onFinishFailed={onFinishFailed}
                                            autoComplete="off"
                                        >
                                            <Form.Item initialValue={'oldNumber'} label='Select number' name='phoneNumberType' rules={[{ required: true, message: 'Please select any one number' }]}>
                                                <Space><Radio.Group onChange={onChangePhoneConfigure} value={1} name='phoneNumberRadio' options={state.phone.phoneNumberOptions} optionType='button' /></Space>
                                            </Form.Item>
                                            {!state.phone.showOption &&
                                                <Form.Item label='Enter your number' name='oldPhoneNumber' rules={[{ required: true, message: 'Please input your old number' }]} style={{ marginTop: '20px' }}>
                                                    <Input />
                                                </Form.Item>
                                            }
                                            {state.phone.showOption &&
                                                <Form.Item label='Choose option' name='newNumberSubOption' rules={[{ required: true, message: 'Please select any one method' }]} style={{ marginTop: '20px' }}>
                                                    <Space><Radio.Group onChange={onChangeSubValue} value={subValue} name='phoneNumberSubRadio' options={state.phone.phoneNumberSubOptions} optionType='button' /></Space>
                                                </Form.Item>
                                            }
                                            {state.phone.showSubOption &&
                                                <Form.Item label='Number of TFN required' name='noOfTFN' rules={[{ required: true, message: 'Please input your required number of TFN' }]} style={{ marginTop: '20px' }}>
                                                    <Input />
                                                </Form.Item>
                                            }
                                            <Form.Item>
                                                <Button type="default" htmlType="submit" size='small'>
                                                    Save
                                                </Button>
                                            </Form.Item>
                                        </Form>
                                    </Panel>
                                }
                                <Panel header="E-mail" key="2">
                                    E-mail
                                </Panel>
                                <Panel header="Chat" key="3">
                                    Calls
                                </Panel>
                            </Collapse>
                        </Col>
                    </Row>

                </Col>
            </Row>


        </div>
    );
};

export default ChooseChannel;