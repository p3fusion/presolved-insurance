import { Link } from '@gatsbyjs/reach-router';
import { Card, PageHeader, Row, Space, Typography, Col, Skeleton } from 'antd';
import React, { useState, useEffect } from "react";
import { SlCalculator, SlLayers, SlList, SlNotebook, SlOrganization } from "react-icons/sl";
import '../assets/style/dashboard-index-page.less'
import ChannelTypeTable from './indexpage/channelType-table';
import { useSelector } from 'react-redux';
import { _ } from 'core-js';
import { filter } from 'lodash';


const AgentIndexPage = (props) => {

    const channel = useSelector((state) => state.channels)
    const user = useSelector((state) => state.user)

    const initialState = {
        channels: 0,
        resolutionCases: 0,
        myResolutionCases: 0,
        openResolutionCases: 0
    }
    const [state, setState] = useState({ ...initialState })

    useEffect(() => {
        let count = 0;
        if (channel.isLoaded && user.isLoggedin) {
            let myTasks=filter(channel.tasks, { assignTo: user?.username })
            console.log({mytasks:myTasks, assignTo:user.username});

            setState({
                ...state,
                channels: channel.data.length,
                resolutionCases: channel.tasks.length,
                myResolutionCases: myTasks.length,
                openResolutionCases: count
            });
        }

    }, [channel,user.username])



    return (
        <section className='dashboard-index-page'>

            <PageHeader className='generic-page-header'
                ghost={false}
                onBack={() => window.history.back()}
                title="Dashboard"
            />

            <div className='statistics'>
                <Card>

                    <Card.Grid style={{ width: '276px' }}>
                        <Space wrap size={20}>
                            <SlLayers size={45} />
                            <Space wrap direction='vertical' size={0}>
                                <Typography.Title level={5}>Channels</Typography.Title>
                                <Typography.Title level={1}>{state.channels}</Typography.Title>
                            </Space>
                        </Space>
                    </Card.Grid>
                    <Card.Grid style={{ width: '276px' }}>
                        <Space wrap size={20}>
                            <SlOrganization size={45} />
                            <Space wrap direction='vertical' size={0}>
                                <Typography.Title level={5}>Resolution cases</Typography.Title>
                                <Typography.Title level={1}>{state.resolutionCases}</Typography.Title>
                            </Space>
                        </Space>
                    </Card.Grid>
                    <Card.Grid style={{ width: '276px' }}>
                        <Space wrap size={20}>
                            <SlNotebook size={45} />
                            <Space wrap direction='vertical' size={0}>
                                <Typography.Title level={5}>My Resolution cases</Typography.Title>
                                <Typography.Title level={1}>{state.myResolutionCases}</Typography.Title>
                            </Space>
                        </Space>
                    </Card.Grid>
                    <Card.Grid style={{ width: '280px' }}>
                        <Space wrap size={20}>
                            <SlCalculator size={45} />
                            <Space wrap direction='vertical' size={0}>
                                <Typography.Title level={5}>Open Resolution cases</Typography.Title>
                                <Typography.Title level={1}>{state.openResolutionCases}</Typography.Title>
                            </Space>
                        </Space>
                    </Card.Grid>
                    {/* <Card.Grid style={{ width: '200px' }}>
                        <Space wrap size={20}>
                            <SlLayers size={45} />
                            <Space wrap direction='vertical' size={0}>
                                <Typography.Title level={5}>Channels</Typography.Title>
                                <Typography.Title level={1}>30</Typography.Title>
                            </Space>
                        </Space>
                    </Card.Grid>
                     */}

                </Card>
            </div>

            <section className='report-widgets'>
                <Row gutter={[16, 16]}>
                    {/*  <Col span={16}>
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
                    </Col> */}
                    <Col span={24}>
                        <Card
                            style={{ padding: 0 }}
                            title={<Typography.Title level={5}>Channels</Typography.Title>}
                            bordered
                            extra={<Link to="/view-all">View all</Link>}
                        >
                            <ChannelTypeTable />
                        </Card> 
                    </Col>

                </Row>
            </section>


        </section>
    )
}

export default AgentIndexPage