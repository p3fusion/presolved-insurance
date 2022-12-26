import { Button, Card, Col, PageHeader, Row, Space, Tabs, Tag, Collapse, Typography, Result, Divider } from 'antd'
import { FiSearch, FiMail, FiPlus, } from 'react-icons/fi'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import '../assets/style/interaction.less'
import SearchCustomer from './interactions/search-customer'
import { SlCallEnd, SlPlus, SlBadge, SlBasket, SlClock, SlDirection } from 'react-icons/sl'
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
          <Card.Grid style={{ width: '20%' }}>
            <Space size={30}>
              <SlBadge size={40} />
              <Space direction='vertical' size={1}>
                <Typography.Title level={4} ellipsis >Interaction ID</Typography.Title>
                {state.contactId && <Typography.Title level={5}>{state.contactId}</Typography.Title>}
              </Space>
            </Space>
          </Card.Grid>

          <Card.Grid style={{ width: '20%' }} >
            <Space size={30}>
              <SlBasket size={40} />
              <Space direction='vertical' size={1}>
                <Typography.Title level={4}>Interaction Type</Typography.Title>
                {state.activeTask?.type && <Typography.Title level={5}>{state.activeTask?.type || 'N/A'}</Typography.Title>}
              </Space>
            </Space>
          </Card.Grid>
          <Card.Grid style={{ width: '20%' }} >
            <Space size={30}>
              <SlDirection size={40} />
              <Space direction='vertical' size={1}>
                <Typography.Title level={4}>Queue</Typography.Title>
                {state.queue?.name && <Typography.Title level={5}>{state.queue?.name || 'N/A'}</Typography.Title>}
              </Space>
            </Space>
          </Card.Grid>

          <Card.Grid style={{ width: '20%' }} >
            <Space size={30}>
              <SlClock size={40} />
              <Space direction='vertical' size={1}>
                <Typography.Title level={4}>Duration</Typography.Title>
                {state.activeTask?.type && <Typography.Title level={5}>{state.activeTask?.contactDuration || '0'} Seconds</Typography.Title>}
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
            <Result title="No Aactive call !" subTitle="You can see the data when you get the call"

            />
          </section>

        }
      </section>
    </section>
  )
}





export default InteractionsIndexPage
