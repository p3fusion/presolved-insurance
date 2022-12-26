import { CheckCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Card, Col, Collapse, Dropdown, Form, Input, Menu, notification, Result, Row, Select, Space, Tabs, Typography } from 'antd';
import { filter, find } from 'lodash';
import React, { useState } from 'react';
import { SlCallEnd, SlPlus } from 'react-icons/sl';
import { useSelector } from 'react-redux';
import SearchCustomer from './search-customer';
const { Panel } = Collapse;


const NewInteractionForm = (props) => {
    let { settings } = props
    const config = useSelector((state) => state.config);
    const [form] = Form.useForm();
    const [state, setState] = useState({
        settings,
        showAddTask: false,
        isTemplatesLoaded: false,
        tasks: [],
        showWrapButton: false,
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
    })
    const saveTask = (taskData) => {
        /* {id,assignTo,channelID,contactID,channelType,Name,taskAttributes,status} */
        let agent = username.current.value
        const newtask = {
            assignTo: agent,
            contactID: state.channel.contactID,
            channelID: state.channel.id,
            channelType: state.channel.channelType,
            Name: taskData.name,
            status: 'pending',
            taskAttributes: JSON.stringify(taskData.attrinutes)
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
        <section className='task-section'>

            <Tabs defaultActiveKey="searchCustomer"
                items={[
                    {
                        "label": "Search Customer",
                        "key": "searchCustomer",
                        "children": <SearchCustomer />
                    },
                    ...state.tasks.map((task, index) => {
                        return {
                            "label": task.name,
                            "key": task.id,
                            "children": <RenderTaskItems onFinish={onFinish} form={form} state={state} setState={setState} task={task} index={index} />,
                        }

                    }),
                    {
                        "label": "Add / Wrap Call",
                        "key": "wrapcall",
                        "children": <Result title="Add Tasks" subTitle="Wrap the call to complete the task"
                            extra={<Space size={20} direction="vertical">
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
                                    <Button block type='dashed' shape='round' size='large' icon={<SlPlus />} >&nbsp; Add Task</Button>
                                </Dropdown>
                                <Button block type='primary' danger shape='round' size='large' icon={<SlCallEnd />} >&nbsp; Wrap Call</Button>
                            </Space>}
                        />
                    },
                ]


                }
            />




        </section>
    )
}

const RenderTaskItems = ({ onFinish, task, index, state, setState, form }) => {
    let id = state.settings.activeTask.contactID
    return (
        <section className='task-item'>
            <Row style={{ marginTop: 30 }}>
                <Col span={24}>
                    <Form
                        form={form} name="case" layout="vertical" onFinish={onFinish}
                        initialValues={{ case: { interactionID: id, task: { interactionID: id, attributes: { Building_Number: 25 } } } }}

                    >
                        {/* Hidden Field*/}
                        <Form.Item initialValue={state.channel.id} label={null} name={['case', 'channelID']} style={{ display: 'none' }}>
                            <Input type='hidden' />
                        </Form.Item>
                        {/* Hidden Field*/}
                        {/* Hidden Field*/}
                        <Form.Item initialValue={task.name} label={null} name={['case', 'task', index, 'name']} style={{ display: 'none' }}>
                            <Input type='hidden' />
                        </Form.Item>
                        <Form.Item initialValue={state.settings.activeTask.contactId} label={null} name={['case', 'task', index, 'contactID']} style={{ display: 'none' }}>
                            <Input type='hidden' />
                        </Form.Item>
                        <Form.Item initialValue={state.channel.id} label={null} name={['case', 'task', index, 'channelID']} style={{ display: 'none' }}>
                            <Input type='hidden' />
                        </Form.Item>
                        {/* Hidden Field*/}

                        <Typography.Title level={5}>{task.description}</Typography.Title>
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
                    </Form>
                </Col>

            </Row>
        </section>

    )
}

export default NewInteractionForm




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
                name={["case", "task", taskIndex, 'attrinutes', data.name]}>
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
                name={["case", "task", taskIndex, 'attrinutes', data.name]}>
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
                name={["case", "task", taskIndex, 'attrinutes', data.name]}>
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
                name={["case", "task", taskIndex, 'attrinutes', data.name]}>
                <Select defaultValue={[data.defaultValue]} options={data.options.map((rec) => { return { value: rec } })} />
            </Form.Item>
        </Col>
    }
    return (<></>)
}