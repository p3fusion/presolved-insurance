import { Col, PageHeader, Row, Layout, Form, Input, Card, Button, Menu, Dropdown, Checkbox, Modal, Select, Tag, Table, Spin, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { PlusOutlined, FileProtectOutlined, FileTextFilled, CloseOutlined, ExclamationCircleOutlined, DownOutlined, CalendarOutlined, CheckCircleOutlined } from '@ant-design/icons';
import '../assets/style/create-template.less'
import { useSelector } from 'react-redux';
import { navigate } from '@reach/router';

const { Content } = Layout;
const ManageTaskTemplates = () => {

    const config = useSelector((store) => store.config)
    const [state, setState] = useState({
        isLoaded: false
    })

    useEffect(() => {
        if (config.templates.isLoaded) {
            setState({ ...state, isLoaded: true })
        }
    }, [config.templates.isLoaded]);


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Fields',
            dataIndex: 'attributes',
            key: 'attributes',
            render: (text) => {
                let items = JSON.parse(text)
                return (
                    <span>
                        {items.length}
                    </span>
                )
            }

        },
        {
            title: 'Actions',
            dataIndex: 'attributes',
            key: 'attributes',
            render: (text) => <Space>
                <Button type='primary' shape='circle' icon={<PlusOutlined />} />
                <Button type='primary' shape='circle' danger icon={<CloseOutlined />} />
            </Space>

        }
    ]


    return (
        <Content className="dashboard">
            <section className="new-template">
                <Row gutter={[16, 16]} style={{ marginTop: 30 }}>
                    <Col span={24}>
                        <PageHeader ghost={false} className="site-page-header" onBack={() => window.history.back()} title="Manage Task template"
                        extra={[
                            <Button onClick={()=>navigate("/new-template")} type='primary' shape='round' icon={<PlusOutlined />} > Add New Task</Button>
                        ]}
                        />
                    </Col>
                </Row>

                <Row gutter={[16, 16]} style={{ marginTop: 30 }}>
                    <Col span={24}>


                        <Card>
                            {
                                state.isLoaded ?
                                    <Table columns={columns} dataSource={config.templates.data} size="large" bordered />
                                    :
                                    <div>
                                        <h3>please wait while we load the data . . .</h3>
                                        <Spin size='large' />
                                    </div>
                            }
                        </Card>
                    </Col>
                </Row>




            </section>


        </Content>
    )
}

export default ManageTaskTemplates