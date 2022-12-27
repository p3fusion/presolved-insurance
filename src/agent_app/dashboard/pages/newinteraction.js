import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Button, Input, PageHeader, Row, Tabs, Menu, Radio, Col, Card, Space, Collapse, Modal, Form, Divider, DatePicker, Steps, notification, Spin, Dropdown, Select, Typography } from 'antd';
import { CheckCircleOutlined, PlusCircleOutlined, SettingOutlined, MinusSquareOutlined, InsuranceOutlined, PropertySafetyOutlined, CloseOutlined } from '@ant-design/icons';

import { API } from 'aws-amplify';
import * as mutations from '../../../graphql/mutations'
import { filter, find } from 'lodash'
import { useDispatch, useSelector, useStore } from 'react-redux';
import { updateConnectUser } from '../../store/reducers/user';
import moment from 'moment-timezone';

import '../assets/style/interaction.less'
import '../../../gc-components/connect-streams'
import '../../../gc-components/amazon-connect-customer-profiles'
import '../../../gc-components/amazon-connect-task'


const { TabPane } = Tabs;
const { Panel } = Collapse;
const { Step } = Steps;

const NewInteraction = (props) => {

    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const config = useSelector((store) => store.config)
    const user = useSelector((store) => store.user)
    const divCCP = useRef(null);
    const username = useRef(null);
    const { id } = props

    const [state, setState] = useState({
        user: {
            isLoggedin: false,
        },
        showAddTask: false,
        isTemplatesLoaded: false,
        tasks: [],
        channel: {
            "id": "24bdef8d-4558-4111-88cd-1d6b2f4f8416",
            "contactID": "fdef4a81-2f0d-496e-90b9-b97ef272e72b",
            "channelType": "chat",
            "contactAttributes": "{\"initialContactId\":null,\"contactId\":\"fdef4a81-2f0d-496e-90b9-b97ef272e72b\",\"initiationMethod\":null,\"name\":null,\"description\":null,\"attributes\":{\"accountnumber\":{\"name\":\"accountnumber\",\"value\":\"9715463636\"},\"Customer-Number\":{\"name\":\"Customer-Number\",\"value\":\"0123\"}},\"state\":{\"type\":\"connected\",\"timestamp\":\"2022-09-21T15:21:17.387Z\"},\"contactDuration\":\"3\",\"type\":\"chat\",\"queueTimestamp\":null,\"status\":{\"type\":\"connected\",\"timestamp\":\"2022-09-21T15:21:17.387Z\"}}",
            "tasks": {
                "items": [],
                "nextToken": null
            },
            "createdAt": "2022-09-21T15:21:18.512Z",
            "updatedAt": "2022-09-21T15:21:18.512Z"
        },
        showWrapButton: false
    })
    
    useEffect(() => {
        const connectUrl = "https://p3fusion-uat.my.connect.aws/ccp-v2"
        if (divCCP.current) {
            connect.agentApp.initCCP(divCCP.current, {
                ccpUrl: connectUrl, // REQUIRED
                loginPopup: true, // optional, defaults to `true`
                loginPopupAutoClose: true, // optional, defaults to `false`
                loginOptions: {
                    // optional, if provided opens login in new window 
                    autoClose: true, // optional, defaults to `false`
                    height: 600, // optional, defaults to 578
                    width: 400, // optional, defaults to 433
                    top: 80, // optional, defaults to 0
                    right: 100 // optional, defaults to 0
                },
                region: "us-east-1", // REQUIRED for `CHAT`, optional otherwise
                softphone: {
                    // optional, defaults below apply if not provided
                    allowFramedSoftphone: true, // optional, defaults to false
                    disableRingtone: false, // optional, defaults to false
                    ringtoneUrl: "./ringtone.mp3" // optional, defaults to CCP’s default ringtone if a falsy value is set
                },
                pageOptions: {
                    //optional
                    enableAudioDeviceSettings: false, //optional, defaults to 'false'
                    enablePhoneTypeSettings: true //optional, defaults to 'true'
                },
                ccpAckTimeout: 5000, //optional, defaults to 3000 (ms)
                ccpSynTimeout: 3000, //optional, defaults to 1000 (ms)
                ccpLoadTimeout: 10000 //optional, defaults to 5000 (ms)
            });

            initiateConnectApp(connect)
            getSnapShot(connect)
        }

    }, [])

    const initiateConnectApp = (connectx) => {
        connectx.contact(function (contact) {
            contact.onIncoming(function (contact) {
                console.log("onIncoming", contact);
            });

            contact.onRefresh(function (contact) {
                console.log("onRefresh", contact);
            });

            contact.onAccepted(function (contact) {
                console.log("onAccepted", contact);
                var contactData = contact._getData()
                var contactAttributes = { ...contactData }
                delete contactAttributes.connections
                delete contactAttributes.contactFeatures
                delete contactAttributes.queue
                setState({ ...state, showWrapButton: true })
                createChannel(contactAttributes, user)

            });

            contact.onEnded(function () {
                console.log("onEnded", contact);
                var _getData = contact._getData()
                console.log({ data: _getData, });
            });

            contact.onConnected(function () {
                console.log(`onConnected(${contact.getContactId()})`);
            });
        });
    }



    const getSnapShot = (connectx) => {
        /*   const snapshot = setInterval(() => {
              console.log("::Gettting loged in Agent information::");
              if (connect.agent.initialized) {
                  connect.agent((agent) => {
                      let agentData = agent._getData()
                      dispatch(updateUser(agentData.configuration))
                      let name = agentData.configuration.name
                      let userName = agentData.configuration.username
                      Modal.success({
                          content: `Welcome ${name}(${userName})`
                      })
                      console.log("::completed loading the Agent information::");
                  });
                  clearInterval(snapshot);
              }
          }, 1000); */
        console.log("::Gettting loged in Agent information::");
        connectx.agent((agent) => {
            let agentData = agent._getData()
            dispatch(updateConnectUser(agentData.configuration))
            let name = agentData.configuration.name
            let userName = agentData.configuration.username
            Modal.success({
                content: `Welcome ${name}(${userName})`
            })
            console.log("::completed loading the Agent information::");
        });
    }

    const createChannel = (contactData, user) => {
        /* {id,assignTo,contactID,channelType,contactAttributes} */
        let agent = username.current.value
        const newChannel = {
            assignTo: agent,
            contactID: contactData.contactId,
            channelType: contactData.type,
            contactAttributes: JSON.stringify({ ...contactData })
        }
        console.log({ newChannel, agent })

        API.graphql({ query: mutations.createChannel, variables: { input: newChannel } }).then((result) => {
            let currentChannelRawData = result.data.createChannel
            let currentChannel = {
                ...currentChannelRawData
            }
            setState({ ...state, channel: { ...currentChannel } })
        }).catch((error) => {
            console.error({ mutationscreateChannel: error })
        })
    }

    const saveTask = (taskData) => {
        /* {id,assignTo,channelID,contactID,channelType,Name,taskAttributes,status} */
        let agent = username.current.value
        const newtask = {
            assignTo:agent,
            contactID: state.channel.contactID,
            channelID: state.channel.id,
            channelType: state.channel.channelType,
            Name: taskData.name,
            status: 'pending',
            taskAttributes: JSON.stringify(taskData.attributes)
        }
        console.log({ newtask })

        API.graphql({ query: mutations.createTask, variables: { input: newtask } }).then((result) => {
            console.log({ id: newtask.channelID, result });
        }).catch((error) => {
            console.error({ mutationscreateChannel: error })
        })

    }

    const addTask = (id) => {
        let { tasks } = state
        let findtask = find(config.templates.data, { id })
        let isAdded = filter(state.tasks, { id })
        if (isAdded.length > 0) {
            notification.warning({
                message: "You have already added the task " + findtask.name
            })
        } else {

            let parseFields = JSON.parse(findtask.attributes)
            let newformat = parseFields.map((itm) => {
                return {
                    ...itm,
                    name: itm.name.replaceAll(" ", "_")
                }
            })
            let rawtaskItem = {
                ...findtask,
                attributes: newformat
            }
            //let taskItem = formatTemplateAttributes(rawtaskItem)
            tasks.push(rawtaskItem)
            setState({ ...state, tasks })
        }


    }


    const onFinishFailed = (e) => {
        console.log({ e });
    }

    const onFinish = (e) => {
        let { task } = e.case
        Modal.confirm({
            title: 'Are you sure want to Wrap the call',
            icon: <CheckCircleOutlined />,
            content: 'This will complete the call / Chat',
            okText: 'Yes, Wrap the call',
            cancelText: 'No, Ignore it',
            onOk: () => {
                for (var i = 0; i < task.length; i++) {
                    let tsk = task[i]
                    saveTask(tsk)
                }

            }
        });

    }



    return (
        <section className="interaction">
            <input type='hidden' id="username" ref={username} value={user.username || state.user.username } />
            <Row gutter={[16, 16]}>
                <Col span={18}>
                    <PageHeader ghost={false} className="site-page-header" onBack={() => window.history.back()}
                        title={<span>Interaction : <em>{id}</em></span>} subTitle=" New Interaction" extra={[
                            <Dropdown overlay={
                                <Menu items={
                                    config.templates.data.map((tasks) => {
                                        return {
                                            "key": tasks.id,
                                            "label": tasks.name
                                        }
                                    })
                                }
                                    onClick={({ key }) => addTask(key)}
                                />}
                                placement="bottomLeft" arrow>
                                <Button icon={<PlusCircleOutlined />}  >Add Task</Button>
                            </Dropdown>,
                            state.showWrapButton && <Button type='primary' shape='round' icon={<CheckCircleOutlined />} onClick={() => form.submit()} >WrapCall</Button>


                        ]} />
                    <Form
                        form={form} name="case" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}
                        initialValues={{ case: { interactionID: id, task: { interactionID: id, attributes: { Building_Number: 25 } } } }}

                    >
                        {/* Hidden Field*/}
                        <Form.Item initialValue={state.channel.id} label={null} name={['case', 'channelID']} style={{ display: 'none' }}>
                            <Input type='hidden' />
                        </Form.Item>
                        {/* Hidden Field*/}

                        <Tabs defaultActiveKey="1" type='card'>
                            <Tabs.TabPane tab="Search Customer" key="search_customer">
                                <Row style={{ marginTop: 30 }}>
                                    <Col span={24}>
                                        <Card title="search Customer" >                                           
                                            <CustomerProile props={props} />
                                        </Card>
                                    </Col>
                                </Row>
                            </Tabs.TabPane>

                            {
                                state.tasks.map((task, index) =>
                                    <Tabs.TabPane tab={<Space>
                                        <span>{task.name}</span>
                                        <Button size='small' danger icon={<CloseOutlined />} type="text" shape='round' />
                                    </Space>} key={index}>

                                        <Row style={{ marginTop: 30 }}>
                                            <Col span={24}>
                                                <Card title={task.name} extra={[
                                                    <Button danger icon={<CloseOutlined />} type="primary" shape='circle' />
                                                ]} >
                                                    {/* Hidden Field*/}
                                                    <Form.Item initialValue={task.name} label={null} name={['case', 'task', index, 'name']} style={{ display: 'none' }}>
                                                        <Input type='hidden' />
                                                    </Form.Item>
                                                    <Form.Item initialValue={state.channel.contactID} label={null} name={['case', 'task', index, 'contactID']} style={{ display: 'none' }}>
                                                        <Input type='hidden' />
                                                    </Form.Item>
                                                    <Form.Item initialValue={state.channel.id} label={null} name={['case', 'task', index, 'channelID']} style={{ display: 'none' }}>
                                                        <Input type='hidden' />
                                                    </Form.Item>
                                                    {/* Hidden Field*/}

                                                    <Typography.Title level={3}>{task.description}</Typography.Title>
                                                    <Row gutter={[16, 16]}>
                                                        {task.attributes.map((field, findex) =>
                                                            <IRenderField key={findex} data={field} index={findex} taskIndex={index} />
                                                        )}
                                                        <Col span={24}>
                                                            <Form.Item wrapperCol={{ span: 8 }} label="Assign Task to" name={["case", "task", index, "assignTo"]}>
                                                                <Select  >
                                                                    <option value="p3fusion">p3fusion</option>
                                                                </Select>
                                                            </Form.Item>
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            </Col>

                                            <Col span={24}>
                                                <Card>
                                                    <Button htmlType='submit' type='primary'>Wrap Call</Button>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </Tabs.TabPane>
                                )
                            }

                        </Tabs>
                    </Form>
                </Col>
                <Col className='interaction-sidebar' span={6} >
                    <div className="ccp" >
                        <div id="containerDiv" ref={divCCP} style={{ height: 600, backgroundColor: '#fff' }} />
                    </div>
                </Col>
            </Row>
        </section>
    )
}

export default NewInteraction

export const IRenderField = ({ data, index, taskIndex }) => {
    if (data.type === 'text') {
        return <Col span={24} key={index}>
            <Form.Item
                rules={
                    [{
                        required: data.required | false,
                        message: data.description,
                    }]
                }
                help={data.description}
                label={data.name}
                name={["case", "task", taskIndex, 'attributes', data.name]}>
                <Input />
            </Form.Item>
        </Col>
    }
    if (data.type === 'textarea') {
        return <Col span={24} key={index}>
            <Form.Item
                rules={
                    [{
                        required: data.required | false,
                        message: data.description,
                    }]
                }
                help={data.description}
                label={data.name}
                name={["case", "task", taskIndex, 'attributes', data.name]}>
                <Input.TextArea rows={data.rows} />
            </Form.Item>
        </Col>
    }
    if (data.type === 'date') {
        return <Col span={24} key={index}>
            <Form.Item
                rules={
                    [{
                        required: data.required | false,
                        message: data.description,
                    }]
                }
                help={data.description}
                label={data.name}
                name={["case", "task", taskIndex, 'attributes', data.name]}>
                <DatePicker format="MM/DD/YYYY" allowClear
                    defaultValue={moment(moment().subtract(data?.defaultValue.split("days")[0] || 7, 'days'), 'MM/DD/YYYYY')} />
            </Form.Item>
        </Col>
    }
    if (data.type === 'select') {
        return <Col span={24} key={index}>
            <Form.Item
                rules={
                    [{
                        required: data.required | false,
                        message: data.description,
                    }]
                }
                help={data.description}
                label={data.name}
                name={["case", "task", taskIndex, 'attributes', data.name]}>
                <Select defaultValue={[data.defaultValue]} options={data.options.map((rec) => { return { value: rec } })} />
            </Form.Item>
        </Col>
    }
    return (<></>)
}


const CustomerProile = (props) => {
    const customerprofiles = useRef(null);
    useEffect(() => {
        if (customerprofiles.current) {
            const instanceUrl = 'https://p3fusion-uat.my.connect.aws/'
            let client = new connect.CustomerProfilesClient(instanceUrl);

        }

    }, [connect.agent.initialized])


    return (
        <section style={{ minHeight: '100vh' }}>

            <div id={`customerprofiles-container`} style={{ minHeight: '100vh' }} ref={customerprofiles} />
        </section>
    )
}