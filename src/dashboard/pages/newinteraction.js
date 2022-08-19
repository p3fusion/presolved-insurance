import React, { useState } from 'react';
import { Button, Input, PageHeader, Row, Tabs, Menu , Radio, Col, Card, Space, Collapse, Modal, Form, Divider, Steps } from 'antd';
import { PlusCircleOutlined, SettingOutlined, MinusSquareOutlined, InsuranceOutlined, PropertySafetyOutlined } from '@ant-design/icons';

import '../assets/style/interaction.less'
import AddBuilding from './addBuilding';
const { TabPane } = Tabs;
const { Panel } = Collapse;
const { Step } = Steps;

const NewInteraction = (props) => {
    const { id } = props
    const [form] = Form.useForm();
    const [state, setState] = useState({
        showAddTask: false,
        tasks: {
            addb: false,
            addc: false,
            coi: false,
            loh: false,
        }
    })
    const menu = (
        <Menu
            items={[
                {
                    key: '1',                  
                    label: (<span><PropertySafetyOutlined /> Add Building</span>),
                },
                {
                    key: '2',
                    label: (
                        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                            2nd menu item
                        </a>
                    ),
                },
                {
                    key: '3',
                    label: (
                        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                            3rd menu item
                        </a>
                    ),
                },
            ]}
        />
    );
    const addTask = (e) => {
        setState({
            ...state,
            tasks: {
                ...state.tasks,
                [e.target.value]: true
            },
            showAddTask: false
        })
        console.log({ e: e.target.value });
    }

    return (
        <Tabs tabPosition="right"  >

            <TabPane tab="Search Account" key="search">
                <section className="interaction">
                    <PageHeader ghost={false} className="site-page-header" onBack={() => null}
                        title={<span>Interaction : <em>{id}</em></span>} subTitle=" New Interaction" extra={[
                            <Button icon={<SettingOutlined />} />,
                            <Button onClick={() => setState({ ...state, showAddTask: true })} icon={<PlusCircleOutlined />} >Add Task</Button>,
                        ]} />

                    <Card title="Search Customer" style={{ marginTop: 30 }}>
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <Form form={form} layout='vertical' >
                                    <Form.Item
                                        name="AccountNumber"
                                        label="Account number"
                                        required
                                        tooltip="This is a required field"
                                        rules={[
                                            {
                                                message: "Please enter Account number to search",
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Divider />
                                    <Collapse ghost  >
                                        <Panel collapsible='header' header="Advanced Search" key="1">
                                            <Form.Item name="PhoneNumber" label="Phone number" >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item name="Organization" label="Organization" >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item name="StreetAddress" label="Street address" >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item name="city" label="City" >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item name="country" label="Country" >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item name="StateProvince" label="State/Province" >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item name="ZipPostalCode" label="Zip/Postal code" >
                                                <Input />
                                            </Form.Item>
                                        </Panel>
                                    </Collapse>
                                    <Row style={{ marginTop: 20 }}>
                                        <Col span={24}>
                                            <Form.Item>
                                                <Space>
                                                    <Button type="primary" htmlType="submit">Search</Button>
                                                    <Button htmlType="button" >Clear</Button>
                                                </Space>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                </Form>
                            </Col>
                        </Row>
                    </Card>
                    <Modal closable onCancel={() => setState({ ...state, showAddTask: false })} title="Choose Task Type" centered visible={state.showAddTask} >
                        <Row align='stretch' justify='space-between'>
                            <Col span={24} className="add-task-modal">
                                <Radio.Group onChange={addTask} optionType='button' buttonStyle='solid' size='large'>
                                    <Radio disabled={state.tasks.addb} value="addb"><PropertySafetyOutlined /> Add Building</Radio>
                                    <Radio disabled={state.tasks.addc} value="addc"><PropertySafetyOutlined />Address Change</Radio>
                                    <Radio disabled={state.tasks.coi} value="coi"><PropertySafetyOutlined />Certificate of insurance</Radio>
                                    <Radio disabled={state.tasks.loh} value="loh"><PropertySafetyOutlined />Loss History</Radio>
                                </Radio.Group>
                            </Col>
                        </Row>
                    </Modal>
                </section>
            </TabPane>
            {
                state.tasks.addb &&
                <TabPane tab={<div><PlusCircleOutlined /> Add Building</div>} key="addb"  >
                    <section className="interaction">
                        <PageHeader ghost={false} className="site-page-header" onBack={() => null}
                            title={<span>Add Building Interaction : <em>{id}</em></span>} subTitle=" Add Building " extra={[
                                <Button icon={<SettingOutlined />} />,
                                <Button onClick={() => setState({ ...state, showAddTask: true })} icon={<PlusCircleOutlined />} >Add Task</Button>,


                            ]} />
                        <Row style={{ marginTop: 20 }}>
                            <Col span={24}>
                                <Card title='Add Address'>
                                    <Row gutter={[16, 16]}>
                                        <Col span={24} style={{ margin: '10px 10px 50px 10px' }}>
                                            <Steps current={1} percent={60}>
                                                <Step title="COLLECTION INFORMATION" description="This is a description." />
                                                <Step title="FIELD WORK" subTitle="Left 00:00:08" description="This is a description." />
                                                <Step title="DIAGRAM & COST ESTIMATE" description="This is a description." />
                                                <Step title="ENDORSEMENT" description="This is a description." />
                                                <Step title="RESOLVE" description="This is a description." />
                                            </Steps>
                                        </Col>
                                        <Col span={24}>
                                            <div className='custom-item'>
                                                <AddBuilding />
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </section>
                </TabPane>
            }
            {
                state.tasks.addc &&
                <TabPane tab={<div><PlusCircleOutlined />Address Change</div>} key="addc"  >

                </TabPane>
            }

            {
                state.tasks.coi &&
                <TabPane tab={<div><PlusCircleOutlined />Loss History</div>} key="loh"  >

                </TabPane>
            }
            {
                state.tasks.coi &&
                <TabPane tab={<div><PlusCircleOutlined />Certificate of insurance</div>} key="coi"  >

                </TabPane>
            }


        </Tabs>
    )
}

export default NewInteraction