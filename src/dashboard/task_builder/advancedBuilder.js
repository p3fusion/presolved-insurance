import { SettingOutlined, CalendarOutlined, CheckCircleOutlined, CloseOutlined, DownOutlined, ExclamationCircleOutlined, FileProtectOutlined, FileTextFilled, PlusOutlined } from '@ant-design/icons';
import { redirectTo } from '@reach/router';
import { Button, Card, Col, Dropdown, Form, Input, Layout, Menu, Modal, PageHeader, Row, Select, Tag, Switch, Space } from 'antd';
import { API } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import { updateTemplates } from '../../store/reducers/config';
import { getTaskTemplates } from '../api/taskTemplates';
import './style/advanced.less';

const { Content } = Layout;
const AdvancedTaskTemplate = (props) => {
    const dispatch = useDispatch()

    const [form] = Form.useForm();
    const [settingsform] = Form.useForm();


    const initialState = {
        selectedLayout: {
            id: null,
            showSettings: false
        },
        items: [],
        layout: [],
        collection: {},
        isEdit: props?.location?.state?.edit || false,
        id: props?.location?.state?.id || null,
        record: props?.location?.state?.record || null,
    }

    const [state, setState] = useState({ ...initialState })

    const getFields = (id, colPosition) => {
        return (
            <Menu onClick={({ key }) => addFields(key, id, colPosition)}
                items={[
                    {
                        key: 'text',
                        label: <span><FileTextFilled /> Text</span>
                    },
                    {
                        key: 'textarea',
                        label: <span><FileProtectOutlined /> Text Area</span>
                    },
                    {
                        key: 'select',
                        label: <span><DownOutlined /> Single Select</span>
                    },
                    {
                        key: 'date',
                        label: <span><CalendarOutlined /> Date</span>
                    },
                ]}
            />
        )
    }

    const addFields = (fieldType, id, colPosition) => {
        console.log({ fieldType, id, colPosition });

    }

    const addLayout = () => {
        let { items } = state

        items.push({
            layoutID: makeid(5),
            columns: 3,
            bg: '#ffffff'
        })
        setState({ ...state, items })
    }

    //generate random alpha numeric id in react ?
    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

    const updateColumnsSettings = (e) => {

        console.log({ e });
        let { items } = state

        const newState = items.map(obj => {
            // 👇️ if id equals 2, update country property
            if (obj.layoutID === e.layoutID) {
                console.log({ obj });
                return { ...e };
            }

            // 👇️ otherwise return object as is
            return obj;
        });

        console.log({ newState });

        setState({
            ...state,
            items: newState,
            selectedLayout: {
                ...e,

                showSettings: false
            }
        })
    }

    return (
        <Content className="dashboard">
            <section className="new-template">
                <Row gutter={[16, 16]} style={{ marginTop: 30 }}>
                    <Col span={24}>
                        <PageHeader ghost={false} className="site-page-header" onBack={() => window.history.back()} title="Advanced Task Builder" subTitle=" New Interaction" />
                    </Col>
                </Row>
                <Form name="task" form={form} layout="vertical"   >
                    <Row gutter={[16, 16]} style={{ marginTop: 30 }}>
                        <Col span={24} style={{ marginBottom: 30 }}>
                            <Card actions={[<Button type='primary' icon={<PlusOutlined />} onClick={() => addLayout()} > Add Column</Button>]}>
                                <Row gutter={[16, 16]}>
                                    <Col span={10}>
                                        <Form.Item label="Task Name" name={['task', 'name']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter task name',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item label="Task Description" name={['task', 'description']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter task description',
                                                },
                                            ]}
                                        >
                                            <Input.TextArea rows={3} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>



                        {
                            /* state.items.map((itm, index) => {
                                return (
                                    <Col span={24} key={index} className="dynamicFields">
                                        {itm.type === 'text' && <TextField removeField={removeField} index={index} itm={itm} />}
                                        {itm.type === 'textarea' && <TextareaField removeField={removeField} index={index} itm={itm} />}
                                        {itm.type === 'select' && <SelectField removeField={removeField} index={index} itm={itm} />}
                                        {itm.type === 'date' && <DateField removeField={removeField} index={index} itm={itm} />}
                                    </Col>
                                )
                            }) */
                        }


                    </Row>
                    <Row gutter={[16, 16]}>

                        {
                            state.items.map((itm, index) => {
                                return (
                                    <Col span={24} key={itm.layoutID}>
                                        <Card title={<span>Layout <small><em>{itm.layoutID}</em></small></span>} extra={[
                                            <Space>
                                                <Button type='primary' shape='circle' icon={<SettingOutlined />}
                                                    onClick={() => setState({
                                                        ...state,
                                                        selectedLayout: { showSettings: true, ...itm }
                                                    })
                                                    }
                                                />,
                                                <Button type='primary' danger shape='circle' icon={<CloseOutlined />} />
                                            </Space>
                                        ]}>
                                            <Row gutter={[16, 16]} className="tempplateRow">
                                                {Array.apply(null, { length: itm.columns }).map((e, i) =>
                                                    <Col key={i} span={8} style={{ backgroundColor: itm.bg || '#fff' }} >
                                                        <div className="templateColumn">
                                                            <Dropdown overlay={getFields(itm.layoutID, i)} placement="bottomLeft" arrow>
                                                                <Button type='default' shape='round' icon={<PlusOutlined />} > Add Fields</Button>
                                                            </Dropdown>
                                                        </div>
                                                    </Col>
                                                )}

                                            </Row>
                                        </Card>
                                    </Col>
                                )
                            })

                        }

                        <Col span={24} >
                            <Card>
                                <Form.Item>
                                    <Button type='primary' htmlType='submit'>Save Template</Button>
                                </Form.Item>
                            </Card>
                        </Col>

                    </Row>
                </Form>
            </section>
            <section className='layout-options'>
                <Modal onOk={() => settingsform.submit()} closable onCancel={() => setState({ ...state, selectedLayout: { ...state.selectedLayout, showSettings: false } })} visible={state.selectedLayout.showSettings} title={<span>Settings for {state.selectedLayout.id}</span>}>
                    <Form key="ModalPopuForm" initialValues={state.selectedLayout} form={settingsform} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={updateColumnsSettings}>
                        <Form.Item style={{ display: 'none' }} name="layoutID">
                            <Input type='hidden' />
                        </Form.Item>

                        <Form.Item label="No of columns" name="columns">
                            <Input type='number' max={9} min={1} />
                        </Form.Item>

                        <Form.Item label="Background Color" name="bg">
                            <Input type='color' />
                        </Form.Item>

                    </Form>
                </Modal>
            </section>
        </Content >
    )
}


const TextField = ({ index, removeField, itm }) => {
    return (
        <Card title={<Tag>{itm.id}</Tag>} extra={[<Button icon={<CloseOutlined />} onClick={() => removeField(index)} />]}>
            <Form.Item initialValue={itm.type} label={null} name={['task', "fields", index, "type"]}>
                <Input type='hidden' />
            </Form.Item>
            <Row gutter={[16, 16]}>
                <Col span={2}>

                    <Form.Item initialValue={index} label="Task Order" name={['task', "fields", index, "order"]}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter task order',
                            },
                        ]}
                    >
                        <Input inputMode='numeric' />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Field Name" name={['task', "fields", index, "name"]}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter field name',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Field Description" name={['task', "fields", index, "description"]}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter field description',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item name={['task', "fields", index, "required"]} label="Is Required" valuePropName="yes">
                        <Switch />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                {/*  <Col span={24}>
                    <Form.Item label="Field Attributes" name={['task', "fields", index, "attributes"]} >
                        <Checkbox value="required">Required</Checkbox>
                        <Checkbox value="visible">visible</Checkbox>
                    </Form.Item>
                </Col> */}
                <Col span={24}>
                    <Form.Item label="Default Value" name={['task', "fields", index, "defaultValue"]}>
                        <Input />
                    </Form.Item>

                </Col>
            </Row>
        </Card>
    )
}

const TextareaField = ({ itm, index, removeField }) => {
    return (
        <Card title={<Tag>{itm.id}</Tag>} extra={[<Button icon={<CloseOutlined />} onClick={() => removeField(index)} />]}>
            <Form.Item initialValue={itm.type} label={null} name={['task', "fields", index, "type"]}>
                <Input type='hidden' />
            </Form.Item>
            <Row gutter={[16, 16]}>
                <Col span={2}>
                    <Form.Item initialValue={index} label="Task Order" name={['task', "fields", index, "order"]}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter task order',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Field Name" name={['task', "fields", index, "name"]}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter field name',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Field Description" name={['task', "fields", index, "description"]}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter field description',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item initialValue={itm.rows || 3} label="No Of Rows." name={['task', "fields", index, "rows"]}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter rows',
                            },
                        ]}
                    >
                        <Input type='number' />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item name={['task', "fields", index, "required"]} label="Is Required" valuePropName="yes">
                        <Switch />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                {/*  <Col span={24}>
                    <Form.Item label="Field Attributes" name={['task', "fields", index, "attributes"]} >
                        <Checkbox value="required">Required</Checkbox>
                        <Checkbox value="visible">visible</Checkbox>
                    </Form.Item>
                </Col> */}
                <Col span={24}>
                    <Form.Item label="Default Value" name={['task', "fields", index, "defaultValue"]}>
                        <Input />
                    </Form.Item>

                </Col>
            </Row>
        </Card>
    )
}

const SelectField = ({ itm, index, removeField }) => {
    const [state, setState] = useState([])
    const updateSignleSelect = (value) => {
        setState(value)

    }
    return (
        <Card title={<Tag>{itm.id}</Tag>} extra={[<Button icon={<CloseOutlined />} onClick={() => removeField(index)} />]}>
            <Form.Item initialValue={itm.type} label={null} name={['task', "fields", index, "type"]}>
                <Input type='hidden' />
            </Form.Item>
            <Row gutter={[16, 16]}>
                <Col span={2}>
                    <Form.Item initialValue={index} label="Task Order" name={['task', "fields", index, "order"]}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter task order',
                            },
                        ]}
                    >
                        <Input inputMode='numeric' />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Field Name" name={['task', "fields", index, "name"]}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter field name',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Field Description" name={['task', "fields", index, "description"]}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter field description',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item initialValue={state} help="Type options and press enter or comma to add next" label="Add Options" name={['task', "fields", index, "options"]}
                    /* rules={[
                        {

                            required: true,
                            message: 'Please enter options',
                        },
                    ]} */
                    >
                        <Select mode="tags" optionFilterProp="label" onChange={(value, option) => updateSignleSelect(value)} placeholder="Add Options" tokenSeparators={[',']} allowClear >

                        </Select>

                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item name={['task', "fields", index, "required"]} label="Is Required" valuePropName="yes">
                        <Switch />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                {/*   <Col span={24}>
                    <Form.Item label="Field Attributes" name={['task', "fields", index, "attributes"]} >
                        <Checkbox value='Required'>Required</Checkbox>
                        <Checkbox value="visible">visible</Checkbox>
                    </Form.Item>
                </Col> */}
                <Col span={24}>
                    <Form.Item label="Default Value" name={['task', "fields", index, "defaultValue"]}>
                        <Input />
                    </Form.Item>

                </Col>
            </Row>
        </Card>
    )
}

const DateField = ({ itm, index, removeField }) => {

    return (
        <Card title={<Tag>{itm.id}</Tag>} extra={[<Button icon={<CloseOutlined />} onClick={() => removeField(index)} />]}>
            <Form.Item initialValue={itm.type} label={null} name={['task', "fields", index, "type"]}>
                <Input type='hidden' />
            </Form.Item>
            <Row gutter={[16, 16]}>
                <Col span={2}>
                    <Form.Item initialValue={index} label="Task Order" name={['task', "fields", index, "order"]}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter task order',
                            },
                        ]}
                    >
                        <Input inputMode='numeric' />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Field Name" name={['task', "fields", index, "name"]}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter field name',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Field Description" name={['task', "fields", index, "description"]}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter field description',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Date picker type" name={['task', "fields", index, "options"]}
                        rules={[
                            {

                                required: true,
                                message: 'Please choose date picker type',
                            },
                        ]}
                    >
                        <Select>
                            <option value="date">Single Day select</option>
                            <option value="range">Date Range select</option>
                        </Select>

                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item name={['task', "fields", index, "required"]} label="Is Required" valuePropName="yes">
                        <Switch />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                {/* <Col span={24}>
                    <Form.Item label="Field Attributes" name={['task', "fields", index, "attributes"]} >
                        <Checkbox value='Required'>Required</Checkbox>
                        <Checkbox value="visible">visible</Checkbox>
                    </Form.Item>
                </Col> */}
                <Col span={24}>
                    <Form.Item initialValue={itm.defaultValue} label="Default Value" name={['task', "fields", index, "defaultValue"]}>
                        <Input />
                    </Form.Item>

                </Col>
            </Row>
        </Card>
    )
}

export default AdvancedTaskTemplate