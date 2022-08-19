import React, { useState } from 'react';
import { Button, Input, PageHeader, Row, Tabs, Typography, Col, Card, Space, Collapse, Modal, Form, Divider } from 'antd';
import { PlusCircleOutlined, SettingOutlined, MinusSquareOutlined, InsuranceOutlined, PropertySafetyOutlined } from '@ant-design/icons';

import '../assets/style/interaction.less'
const { TabPane } = Tabs;
const { Panel } = Collapse;

const NewInteraction = (props) => {
    const { id } = props
    const [form] = Form.useForm();
    return (
        <Tabs tabPosition="right">
            <TabPane tab="Search Account" key="search">
                <section className="interaction">
                    <PageHeader ghost={false} className="site-page-header" onBack={() => null}
                        title={<span>Interaction : <em>{id}</em></span>} subTitle=" New Interaction" extra={[<Button icon={<SettingOutlined />} />]} />

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
                                    <Row  style={{ marginTop: 20 }}>
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
                </section>


                <Modal closable title="Choose Task Type" centered visible={false}>
                    <Row align='stretch' justify='space-between'>
                        <Col span={24} className="add-task-modal">

                            <Button block type='primary' icon={<PropertySafetyOutlined />}>Add Building</Button>
                            <Button block type='primary' icon={<PlusCircleOutlined />}>Address Change</Button>
                            <Button block type='primary' icon={<InsuranceOutlined />}>Certificate of insurance</Button>
                            <Button block type='primary' icon={<MinusSquareOutlined />}>Loss History</Button>



                        </Col>
                    </Row>
                </Modal>
            </TabPane>
            <TabPane tab={<div><PlusCircleOutlined /> Add Task</div>} key="addtask" on >
                <section className="interaction">
                    <PageHeader ghost={false} className="site-page-header" onBack={() => null}
                        title={<span>Interaction : <em>{id}</em></span>} subTitle=" New Interaction" extra={[<Button icon={<SettingOutlined />} />]} />
                </section>
            </TabPane>
        </Tabs>
    )
}

export default NewInteraction