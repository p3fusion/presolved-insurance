import { Card, Col, PageHeader, Result, Row, Typography } from 'antd'
import React, { useState } from 'react'

const ChannelDetails = (props) => {
    const [state, setState] = useState({
        channel: props.location?.state?.channel || null,
        isLoaded: props.location?.state?.channel ? 'true' : false
    })
    return (
        <div>
            {state.isLoaded ?
                <section className='channel-details'>
                    <PageHeader ghost={false} className="site-page-header" onBack={() => window.history.back()}
                        title={<span>Interaction : <em>{state.channel.id}</em></span>} subTitle=" New Interaction" />


                    <Row style={{ marginTop: 30 }}>
                        <Col span={24}>
                            <Card>
                                <Typography.Text code>
                                    <pre>

                                        {
                                            JSON.stringify(state.channel, null, 4)
                                        }
                                    </pre>
                                </Typography.Text>
                            </Card>
                        </Col>
                    </Row>
                </section>
                :
                <Result
                    title="Choose the channels from the main page"
                />
            }
        </div>
    )
}

export default ChannelDetails