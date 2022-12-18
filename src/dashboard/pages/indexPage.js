import { Card, PageHeader, Row, Space, Typography, Col, Skeleton } from 'antd';
import React from 'react';
import { SlCalculator, SlLayers, SlList, SlNotebook, SlOrganization } from "react-icons/sl";

import '../assets/style/dashboard-index-page.less'


const AgentIndexPage = (props) => {
    console.log(props);
    return (
        <section className='dashboard-index-page'>

            <PageHeader className='generic-page-header'
                ghost={false}
                onBack={() => window.history.back()}
                title="Dashboard"
            />

            <div className='statistics'>
                <Card>
                    <Card.Grid style={{ width: '200px' }}>
                        <Space wrap size={20}>
                            <SlLayers size={45} />
                            <Space wrap direction='vertical' size={0}>
                                <Typography.Title level={5}>Channels</Typography.Title>
                                <Typography.Title level={1}>30</Typography.Title>
                            </Space>
                        </Space>
                    </Card.Grid>
                    <Card.Grid style={{ width: '200px' }}>
                        <Space wrap size={20}>
                            <SlOrganization size={45} />
                            <Space wrap direction='vertical' size={0}>
                                <Typography.Title level={5}>Tasks</Typography.Title>
                                <Typography.Title level={1}>50</Typography.Title>
                            </Space>
                        </Space>
                    </Card.Grid>
                    <Card.Grid style={{ width: '200px' }}>
                        <Space wrap size={20}>
                            <SlNotebook size={45} />
                            <Space wrap direction='vertical' size={0}>
                                <Typography.Title level={5}>My Tasks</Typography.Title>
                                <Typography.Title level={1}>50</Typography.Title>
                            </Space>
                        </Space>
                    </Card.Grid>
                    <Card.Grid style={{ width: '200px' }}>
                        <Space wrap size={20}>
                            <SlCalculator size={45} />
                            <Space wrap direction='vertical' size={0}>
                                <Typography.Title level={5}>Open Tasks</Typography.Title>
                                <Typography.Title level={1}>15</Typography.Title>
                            </Space>
                        </Space>
                    </Card.Grid>
                    <Card.Grid style={{ width: '200px' }}>
                        <Space wrap size={20}>
                            <SlLayers size={45} />
                            <Space wrap direction='vertical' size={0}>
                                <Typography.Title level={5}>Channels</Typography.Title>
                                <Typography.Title level={1}>30</Typography.Title>
                            </Space>
                        </Space>
                    </Card.Grid>
                    

                </Card>
            </div>

            <section className='report-widgets'>
                <Row gutter={[16, 16]}>
                    <Col span={16}>
                        <Row gutter={[16, 16]}>
                            <Col span={24}>
                                <Card bordered>
                                    <Skeleton
                                        active
                                        avatar
                                        paragraph={{
                                            rows: 4,
                                        }}
                                    />
                                </Card>
                            </Col>
                            <Col span={24}>
                                <Card bordered>
                                    <Skeleton
                                        active
                                        avatar
                                        paragraph={{
                                            rows: 4,
                                        }}
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Card bordered>
                            <Skeleton
                                active
                                paragraph={{
                                    rows: 12,
                                }}
                            />
                        </Card>
                    </Col>
                    <Col span={24}>
                        <Card bordered>
                            <Skeleton
                                active
                                paragraph={{
                                    rows: 6,
                                }}
                            />
                        </Card>
                    </Col>
                </Row>
            </section>


        </section>
    )
}

export default AgentIndexPage