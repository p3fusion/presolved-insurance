import { Card, Col, Collapse, Divider, PageHeader, Result, Row, Space, Tag, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import '../assets/style/interaction.less'

import { SlBadge, SlBasket, SlClock, SlDirection } from 'react-icons/sl'
import { FaSave } from 'react-icons/fa';
import NewInteractionForm from './interactions/new-interaction'
const { Panel } = Collapse;
const InteractionsIndexPage = () => {
  const settings = useSelector((state) => state.settings)
  const [state, setState] = useState({
    contactId: settings.activeTask?.contactId || null,
    ...settings
  })
  useEffect(() => {
    setState({ ...state, ...settings })
  }, [settings])




  return (
    <section className='dashboard-interaction-page'>

      <PageHeader className='generic-page-header'
        ghost={false}
        extra={
          <Space>
            {state.activeTask?.type && <Tag className='contact-type'>CallType: {state.activeTask.type} </Tag>}
          </Space>
        }
        onBack={() => window.history.back()}
        title={state.contactId && `Interaction : ${state.contactId}` || false}
      />

      <div className='statistics'>
        <Card>
          <Card.Grid style={{ width: '20%', overflow:'hidden' }}>
            <Space size={30}>
              <SlBadge size={40} />
              <Space direction='vertical' size={1} wrap={false}>
                <Typography.Title  level={5}  >Interaction ID</Typography.Title>
                {state.contactId && <Typography.Title style={{width:155}} level={3} ellipsis={{rows:1,tooltip:{title:state.contactId}}}>{state.contactId}</Typography.Title>}
              </Space>
            </Space>
          </Card.Grid>

          <Card.Grid style={{ width: '20%' }} >
            <Space size={30}>
              <SlBasket size={40} />
              <Space direction='vertical' size={1}>
                <Typography.Title level={5}>Interaction Type</Typography.Title>
                {state.activeTask?.type && <Typography.Title level={3}>{state.activeTask?.type || 'N/A'}</Typography.Title>}
              </Space>
            </Space>
          </Card.Grid>
          <Card.Grid style={{ width: '20%' }} >
            <Space size={30}>
              <SlDirection size={40} />
              <Space direction='vertical' size={1}>
                <Typography.Title level={5}>Queue</Typography.Title>
                {settings.activeTask?.queue?.name && <Typography.Title level={3}>{settings.activeTask?.queue?.name || 'N/A'}</Typography.Title>}
              </Space>
            </Space>
          </Card.Grid>

          <Card.Grid style={{ width: '20%' }} >
            <Space size={30}>
              <SlClock size={40} />
              <Space direction='vertical' size={1}>
                <Typography.Title level={5}>Duration</Typography.Title>
                {state.activeTask?.type && <Typography.Title level={3}>{state.activeTask?.contactDuration || '0'} Seconds</Typography.Title>}
              </Space>
            </Space>
          </Card.Grid>

        </Card>
      </div>

      <section className='task-container'>
        {
          state.contactId &&
          <section className='interation-form'>
           {/*  <Typography.Title level={4}>Create task and wait for completion</Typography.Title> */}
            <Row gutter={[4, 4]}>
              <Col span={24}>
                <NewInteractionForm settings={settings} />
                <Divider dashed />
              </Col>
            </Row>
          </section> ||
          <section className='task-section'>
            <Result title="No Active interaction !" subTitle="You can see the data when you get the call"

            />
          </section>

        }
      </section>
    </section>
  )
}





export default InteractionsIndexPage
