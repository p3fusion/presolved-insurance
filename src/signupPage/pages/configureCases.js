import { Col, Row, Typography, Divider, Menu, Form, Card, Space, Button, Input, Select, DatePicker, List, Checkbox } from 'antd';
import React, { useState, useEffect } from 'react';
import CreateNewTemplate from './newTemplate';
import moment from 'moment-timezone'
import { payload } from './payload';
import { useDispatch } from 'react-redux';
import { updateStep2 } from '../store/reducers/steps';
import {
    CloseOutlined,
    MailOutlined,
    MessageOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    QuestionCircleOutlined
} from '@ant-design/icons';
const ConfigureCases = (props) => {

    const { next, state, setState, prev } = props
    const dispatch = useDispatch()
    let record = payload.templates.filter((rec) => rec.id == 1)
    let format = {
        ...record[0],
        attributes: JSON.parse(record[0].attributes)
    }
    const [task, setTask] = useState(format);
    const index = 0
    console.log({ task });

    const [options,setOptions] = useState([]);
    
    useEffect(() => {
        getOptions()
       },[]);
 
       const getOptions=()=>{
         setOptions( state.templates )
       }
 


    return (
        <div className='template-section'>

            <Row>

                <Col span={6} style={{ padding: "50px 10px" }}>

                    {/* <Typography.Title level={4}>Choose Pre Template</Typography.Title> */}
                    {/* <Menu
                        items={payload.templates.map((template) => {
                            return {
                                label: template.name, key: template.id
                            }
                        })
                        }
                        onSelect={(e) => {
                            let record = payload.templates.filter((rec) => rec.id == e.key)
                            let format={
                                ...record[0],
                                attributes:JSON.parse(record[0].attributes)
                            }
                            console.log({format});
                            setTask(format)
                        }}

                    /> */}

                    <List
                        header={<Typography.Title level={4}>Choose Task Template</Typography.Title>}
                        itemLayout='horizontal'
                        dataSource={options}
                        renderItem={(item) => (
                            <List.Item >
                                <Checkbox
                                    defaultChecked={item.selected}
                                    value={item.label}
                                    onChange={(e) => {

                                        let newRecord = state.templates.filter((ListItem) => ListItem.id !== item.id);
                                        newRecord.push({
                                            "selected": e.target.checked,
                                            "id": item.id,
                                            "name": item.name,
                                            "description": item.description,
                                            "attributes": item.attributes
                                        })

                                        console.log('newRecord', newRecord)

                                        setState({
                                            ...state,
                                           templates:newRecord
                                        });
                                    }}


                                >
                                    <Button
                                        type='text'
                                        onClick={() => {
                                            let record = state.templates.filter((rec) => rec.id == item.id)
                                            let format = {
                                                ...record[0],
                                                attributes: JSON.parse(record[0].attributes)
                                            }
                                            console.log({ format });
                                            setTask(format)
                                        }}
                                    >{item.name}</Button>
                                </Checkbox>

                            </List.Item>
                        )}
                    >
                    </List>

                </Col>
                <Col span={18}>
                    {task &&
                        <Form layout="vertical">
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
                                        {
                                            task.attributes.map((field, findex) =>
                                                <IRenderField key={findex} data={field} index={findex} taskIndex={index} />
                                            )
                                        }
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
                        </Form>
                    }
                    {
                        task == null ? <Typography.Title level={3}>Please Choose the template</Typography.Title> : null
                    }


                    {/* <CreateNewTemplate location={{"state": {id: st ? 2 : null,edit: st ? true : false,record: st ? st : {}}}}/> */}

                </Col>
            </Row>
            <Card>
                <Space>
                    <Button type="ghost" size='large' onClick={() => prev()} >Previous</Button>
                    <Button type="primary" size='large'
                        onClick={() => {
                            dispatch(updateStep2(state.templates)),
                                next()
                        }}
                    >Next</Button>
                </Space>
            </Card>
        </div>
    );
};

export default ConfigureCases;


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
                //help={data.description}
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
                //help={data.description}
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
                //help={data.description}
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
                //help={data.description}
                label={data.name}
                name={["case", "task", taskIndex, 'attributes', data.name]}>
                <Select defaultValue={[data.defaultValue]} options={data.options.map((rec) => { return { value: rec } })} />
            </Form.Item>
        </Col>
    }
    return (<></>)
}