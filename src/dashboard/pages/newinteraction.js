import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Button, Input, PageHeader, Row, Tabs, Menu, Radio, Col, Card, Space, Collapse, Modal, Form, Divider, DatePicker, Steps, notification, Spin, Dropdown, Select, Typography } from 'antd';
import { PlusCircleOutlined, SettingOutlined, MinusSquareOutlined, InsuranceOutlined, PropertySafetyOutlined, CloseOutlined } from '@ant-design/icons';
import '../assets/style/interaction.less'
import AddBuilding from './addBuilding';
import '../../gc-components/connect-streams'
import '../../gc-components/amazon-connect-customer-profiles'
import '../../gc-components/amazon-connect-task'
import { DataStore } from 'aws-amplify';
import { filter, find } from 'lodash'
import { useDispatch, useSelector, useStore } from 'react-redux';
import { RenderField } from '../task_builder/fields';
import moment from 'moment-timezone';


const { TabPane } = Tabs;
const { Panel } = Collapse;
const { Step } = Steps;

const NewInteraction = (props) => {

    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const config = useSelector((store) => store.config)
    const divCCP = useRef(null);
    const { id } = props

    const [state, setState] = useState({
        showAddTask: false,
        isTemplatesLoaded: false,
        tasks: []
    })

    useEffect(() => {
        /*  const connectUrl = "https://p3fusion-uat.my.connect.aws/ccp-v2"
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
 
             connect.contact(function (contact) {
                 contact.onIncoming(function (contact) {
                     console.log("onIncoming", contact);
                 });
 
                 contact.onRefresh(function (contact) {
                     console.log("onRefresh", contact);
                 });
 
                 contact.onAccepted(function (contact) {
                     console.log("onAccepted", contact);
 
                 });
 
                 contact.onEnded(function () {
                     console.log("onEnded", contact);
                 });
 
                 contact.onConnected(function () {
                     console.log(`onConnected(${contact.getContactId()})`);
                     var attributeMap = contact.getAttributes();                   
                     const NewInteraction = new Interaction({
                         contactID: contact.getContactId(),
                         interactionID: id,
                         contactAttributes: attributeMap
                     })
                     console.log({ NewInteraction });
                     DataStore.save(NewInteraction).then((id) => {
                         console.log({ id });
                     })
 
                     console.log({
                         attributeMap: attributeMap
                     })
                 });
             });
         } */

    }, [])

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

    useEffect(() => {
        if (config.templates.isLoaded) {
            setState({ ...state, isTemplatesLoaded: true })

        }
    }, [config.templates.isLoaded]);

    const getTemplate = () => {
        let taskTemplates = []
        let data = []
        const interval = setInterval(() => {
            console.log("Polling . . .");
            if (connect.agent.initialized) {
                clearInterval(interval);
                console.log("Cancelling Poll . . .");
                listTaskTemplates().then((templates) => {

                    if (templates.TaskTemplates.length > 0) {
                        for (var i = 0; i < templates.TaskTemplates.length; i++) {
                            let task = templates.TaskTemplates[i]
                            let templateParams = { id: task.Id };
                            getTaskTemplate(templateParams).then((templateData) => {
                                data.push({
                                    name: task.Name,
                                    description: task.Description,
                                    id: task.Id,
                                    fields: templateData.Fields
                                })
                            })
                        }

                        setState({ ...state, taskTemplates: data })
                        //dispatch(updateAllTemplates(data))
                    }
                })

                /*  connect.agent(function (agent) {
                     const queryParams = {// required                   
                         maxResults: 50 //optional, number, max value of 100
                     };
                     agent.listTaskTemplates(queryParams, {
                         success: function (data) {
                             if (data.TaskTemplates.length > 0) {
                                 for (var i = 0; i < data.TaskTemplates.length; i++) {
                                     let task = data.TaskTemplates[i]
                                     let templateParams = { id: task.Id };
                                     agent.getTaskTemplate(templateParams, {
                                         success: function (templateParamsdata) {
                                             let templateData = {
                                                 name: task.Name,
                                                 description: task.Description,
                                                 id: task.Id,
                                                 fields: templateParamsdata.Fields
                                             }
                                             taskTemplates.push(templateData)
                                             dispatch(updateTemplates({
                                                 id: task.Id,
                                                 data: templateData
                                             }))
                                         },
                                         failure: function (err) {
                                             console.error({ getTaskTemplate: err })
                                         }
                                     });
                                 }
                                 console.log("Cancelling Poll . . .", taskTemplates);
                                 setState({ ...state, taskTemplates })
                                 //dispatch(updateAllTemplates(taskTemplates))
                                 clearInterval(interval);
                             }
                         },
                         failure: function (err) {
                             console.error({ listTaskTemplates: err });
                         }
                     });
                 }) */
            }
        }, 2000)


    }

    const onFinish = (e) => {
        console.log({ e });
    }

    return (
        <section className="interaction">
            <Row gutter={[16, 16]}>
                <Col span={18}>
                    <PageHeader ghost={false} className="site-page-header" onBack={() => null}
                        title={<span>Interaction : <em>{id}</em></span>} subTitle=" New Interaction" extra={[
                            <Button icon={<SettingOutlined />} onClick={() => getTemplate()} />,
                            state.isTemplatesLoaded &&
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
                                <Button icon={<PlusCircleOutlined />} >Add Task</Button>
                            </Dropdown>,

                        ]} />
                    <Form
                        form={form} name="case" layout="vertical" onFinish={onFinish}
                        initialValues={{ case: { interactionID: id, task: { interactionID: id, attributes: { Building_Number: 25 } } } }}

                    >
                        {/* Hidden Field*/}
                        <Form.Item initialValue={id} label={null} name={['case', 'interactionID']} style={{ display: 'none' }}>
                            <Input type='hidden' />
                        </Form.Item>
                        {/* Hidden Field*/}

                        <Tabs defaultActiveKey="1" type='card'>
                            <Tabs.TabPane tab="Search Customer" key="search_customer">
                                <Row style={{ marginTop: 30 }}>
                                    <Col span={24}>
                                        <Card title="search Customer">
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
                                                    <Form.Item initialValue={task.name} label={null} name={['case', 'task', 'name']} style={{ display: 'none' }}>
                                                        <Input type='hidden' />
                                                    </Form.Item>
                                                    <Form.Item initialValue={id} label={null} name={['case', 'task', 'interactionID']} style={{ display: 'none' }}>
                                                        <Input type='hidden' />
                                                    </Form.Item>
                                                    {/* Hidden Field*/}

                                                    <Typography.Title level={3}>{task.description}</Typography.Title>
                                                    <Row gutter={[16, 16]}>
                                                        {task.attributes.map((field, findex) =>
                                                            <IRenderField key={findex} data={field} index={findex} />
                                                        )}
                                                        <Col span={24}>
                                                            <Form.Item wrapperCol={{ span: 8 }} label="Assign Task to" name={["case", "task", "assignTo"]}>
                                                                <Select  >
                                                                    <option value="khizar">Khizar</option>
                                                                    <option value="kasdfashizar">Khiasdfzar</option>
                                                                    <option value="wqedc">wqedc</option>
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
                                            <Col span={24}>
                                                <pre>
                                                    {
                                                        JSON.stringify(state.tasks, null, 4)
                                                    }
                                                </pre>
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

export const IRenderField = ({ data, index }) => {
    /* 
    rules={
                    [{
                        required: true,
                        message: data.description,
                    }]
                }
    */
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
                name={["case", "task", 'attrinutes', data.name]}>
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
                name={["case", "task", 'attrinutes', data.name]}>
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
                name={["case", "task", 'attrinutes', data.name]}>
                <DatePicker format="MM/DD/YYYY" allowClear
                    defaultValue={moment(moment().subtract(data?.defaultValue.split("days")[0] || 7, 'days'), 'MM/DD/YYYYY')} />
            </Form.Item>
        </Col>
    }
    return (<></>)
    /*     return (
            <Col span={24} key={index}>
    
                <Form.Item
                    help={data.description}
                    label={data.name}
                    name={["case", "task", 'attrinutes', data.name.replaceAll(" ", "_")]}
    
                >
                    {data.type === 'text' && <Input />}
                    {data.type === 'textarea' && <Input.TextArea rows={data.rows} />}
                    {data.type === 'select' &&
                        <Select>
                            {
                                data.options.map((opt, selindex) =>
                                    <Select.Option key={selindex} value={opt}>{opt}</Select.Option>
                                )}
                        </Select>
                    }
                    {data.type === 'date' &&
                        <DatePicker format="MM/DD/YYYY" allowClear
                            defaultValue={moment(moment().subtract(data?.defaultValue.split("days")[0] || 7, 'days'), 'MM/DD/YYYYY')} />}
                </Form.Item>
            </Col>
        ) */

}


const CustomerProile = (props) => {
    const customerprofiles = useRef(null);
    const { id } = props
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        /*   if (customerprofiles.current) {
              const instanceUrl = 'https://p3fusion-uat.my.connect.aws/'
              let client = new connect.CustomerProfilesClient(instanceUrl);
          }
          if (connect.agent.initialized) {
              notification.success({
                  message: "Customer Profile initiated successfully"
              })
              setLoading(true)
          } */

    }, [connect.agent.initialized])


    return (
        <section style={{ minHeight: '100vh' }}>

            <div id={`customerprofiles-container`} style={{ minHeight: '100vh' }} ref={customerprofiles} />
        </section>
    )
}