import { Card, Col, Descriptions, PageHeader, Result, Row, Typography, Form, Input, Timeline, Select, Divider, Avatar, Space, Button } from 'antd'
import moment from 'moment-timezone';
import React, { useState, useEffect } from 'react'
import { SlUser } from 'react-icons/sl';

const ChannelDetails = (props) => {
    const [form] = Form.useForm();
    const [state, setState] = useState({
        channel: props.location?.state?.channel || null,
        isLoaded: props.location?.state?.channel ? 'true' : false,
        history: [],
        contactAttributes: {},
        taskAttributes: [],
        notes: null,
    })
    useEffect(() => {
        let contactAttributes = JSON.parse(props.location?.state?.channel?.channel?.contactAttributes || '{}')
        let taskAttributes = JSON.parse(props.location?.state?.channel?.taskAttributes || '[]')
        let history = JSON.parse(props.location?.state?.channel?.notes || '[]')
        setState({ ...state, history, contactAttributes: contactAttributes, taskAttributes: taskAttributes })
        form.setFieldsValue({
            task: {
                ...taskAttributes,
                status: props.location?.state?.channel?.status || "completed"
            }

        })

    }, [props.location?.state?.channel])




    return (
        <div>
            {state.isLoaded ?
                <section className='channel-details'>
                    <PageHeader ghost={false} className="site-page-header" onBack={() => window.history.back()}
                        title={<span>Interaction : <em>{state.channel.id}</em></span>} subTitle=" New Interaction" />

                    <Row style={{ marginTop: 20 }}>
                        <Col span={24}>
                            <Card bodyStyle={{ padding: '15px ' }}  >
                                <Row gutter={[16, 16]}>
                                    <Col span={12}>
                                        <Descriptions column={3} title="Channel Information" bordered layout="horizontal" >
                                            <Descriptions.Item label="Contact ID">{state.channel.contactID}</Descriptions.Item>
                                            <Descriptions.Item label="Type">{state.channel.channelType}</Descriptions.Item>
                                            <Descriptions.Item label="Created By">{state.channel.channel.assignTo}</Descriptions.Item>
                                            <Descriptions.Item span={2} label="Created At">{state.channel.createdAt}</Descriptions.Item>
                                            <Descriptions.Item label="Duration">{state.contactAttributes?.contactDuration}</Descriptions.Item>
                                            <Descriptions.Item span={3} label="Notes">{state.contactAttributes?.notes}</Descriptions.Item>
                                        </Descriptions>

                                    </Col>
                                    <Col span={12}>
                                        <Descriptions column={3} title="Customer Information" bordered layout="horizontal" >
                                            <Descriptions.Item label="Title">{state.contactAttributes?.userProfile?.title} </Descriptions.Item>
                                            <Descriptions.Item label="Name">{state.contactAttributes?.userProfile?.first_name} {state.contactAttributes?.userProfile?.last_name} </Descriptions.Item>
                                            <Descriptions.Item label="E-mail">{state.contactAttributes?.userProfile?.email}</Descriptions.Item>
                                            <Descriptions.Item label="Phone">{state.contactAttributes?.userProfile?.phone_number}</Descriptions.Item>

                                            <Descriptions.Item label="Gender">{state.contactAttributes?.userProfile?.gender}</Descriptions.Item>
                                            <Descriptions.Item label="Date Of Birth">{state.contactAttributes?.userProfile?.birthdate}</Descriptions.Item>

                                            <Descriptions.Item span={3} label="Address">
                                                {state.contactAttributes?.userProfile?.location?.street},<br />
                                                {state.contactAttributes?.userProfile?.location?.city}, <br />
                                                {state.contactAttributes?.userProfile?.location?.state},<br />
                                                {state.contactAttributes?.userProfile?.location?.postcode}<br />

                                            </Descriptions.Item>

                                        </Descriptions>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>

                    <Row style={{ marginTop: 30 }}>
                        <Col span={24}>
                            <Card title={state.channel.Name} >
                                <Form form={form} layout='vertical' name='task'>
                                    <Row gutter={[16, 16]}>
                                        {
                                            state.taskAttributes.map((task, index) => {
                                                console.log(Object.keys(task));
                                                return (
                                                    <Col span={8} key={index}>
                                                        <Form.Item
                                                            name={['task', index, Object.keys(task)]}
                                                            label={Object.keys(task)}
                                                            rules={[{ required: true }]}
                                                        >
                                                            <Input />
                                                        </Form.Item>
                                                    </Col>
                                                )
                                            })
                                        }
                                    </Row>
                                    <Row gutter={[16, 16]}>
                                        <Col span={8} >
                                            <Form.Item
                                                name={['task', 'status']}
                                                label="Status"
                                                rules={[{ required: true }]}
                                            >
                                                <Select>
                                                    <option value="pending">Pending</option>
                                                    <option value="in-progress">In-Progress</option>
                                                    <option value="completed">Completed</option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={3} offset={13} >
                                            <Button shape='round'  size='large' type='primary'>Update</Button>
                                        </Col>
                                    </Row>
                                    <Divider type='horizontal' />
                                    {/*   <Row gutter={[16, 16]}>
                                        <Col span={8}>
                                            <Form.Item name={['task', 'notes']} label="Notes" rules={[{ required: true }]} >
                                                <Input.TextArea rows={5} />
                                            </Form.Item>
                                        </Col>
                                    </Row> */}

                                    <Typography.Title level={5} style={{ marginBottom: 40 }}>Task History</Typography.Title>

                                    <Row gutter={[16, 16]}>
                                        <Col span={24}>
                                            <Timeline>
                                                {state.history.map((item, index) =>
                                                    <Timeline.Item key={index} dot={<Avatar icon={<SlUser />} />}>
                                                        <Space direction='vertical' size={1} align='start'>
                                                            <Typography.Text strong>{item.user}</Typography.Text>
                                                            <Typography.Text >{moment(item.date).format('ll')}</Typography.Text>
                                                            <Typography.Text >{item.note}</Typography.Text>
                                                        </Space>
                                                    </Timeline.Item>
                                                )}
                                                <Timeline.Item dot={<Avatar icon={<SlUser />} />}>
                                                    <Col span={8}>
                                                        <Form.Item name={['task', 'notes']} label="Add your notes">
                                                            <Input.TextArea rows={5} />
                                                        </Form.Item>
                                                        <Button shape='round'  size='small' type='primary'>Add Notes</Button>
                                                    </Col>
                                                </Timeline.Item>
                                            </Timeline>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card>

                        </Col>
                    </Row>

                </section>
                :
                <Result
                    title="Choose the channels from the main page"
                />
            }
        </div>
    )
}

export default ChannelDetails