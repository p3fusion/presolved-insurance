import { Button, Card, Col, PageHeader, Row, Space, Tabs, Tag, Collapse, Typography, Result, Divider } from 'antd'
import { FiSearch, FiMail, FiPlus, } from 'react-icons/fi'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import '../assets/style/interaction.less'
import SearchCustomer from './interactions/search-customer'
import { SlCallEnd, SlPlus, SlBadge, SlBasket, SlClock } from 'react-icons/sl'
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
          <Card.Grid>
            <Space size={30}>
              <SlBadge size={40} />
              <Space direction='vertical' size={1}>
                <Typography.Title level={4} ellipsis >Interaction ID</Typography.Title>
                {state.contactId && <Typography.Title level={5}>{state.contactId}</Typography.Title>}
              </Space>
            </Space>
          </Card.Grid>

          <Card.Grid >
            <Space size={30}>
              <SlBasket size={40} />
              <Space direction='vertical' size={1}>
                <Typography.Title level={4}>Interaction Type</Typography.Title>
                {state.activeTask?.type && <Typography.Title level={5}>{state.activeTask?.type || 'N/A'}</Typography.Title>}
              </Space>
            </Space>
          </Card.Grid>
          
          <Card.Grid >
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

      <section className='tab-container'>
        {state.contactId &&
          <Tabs
            size='large'

            type="editable-card"
            defaultActiveKey="1"
            items={[
              {
                label: `Interaction`,
                key: '1',
                children: <InteractionForm />,
              },
            ]}
          />


        }
      </section>
    </section>
  )
}



const InteractionForm = () => {

  return (
    <section className='interation-form'>
      <Collapse defaultActiveKey={['1']} ghost>
        <Panel key="1" header={<Typography.Title level={4}>Create task and wait for completion</Typography.Title>}>
          <Row gutter={[4, 4]}>
            <Col span={24}>

              <Result title="Add Tasks" subTitle="Wrap the call to complete the task"
                extra={<Space size={20} direction="vertical">
                  <Button block type='dashed' shape='round' size='large' icon={<SlPlus />} >&nbsp; Add Task</Button>
                  <Button block type='primary' danger shape='round' size='large' icon={<SlCallEnd />} >&nbsp; Wrap Call</Button>
                </Space>}
              />
              <Divider dashed />
            </Col>
          </Row>
        </Panel>
        <Panel header={<Typography.Title level={4}>Search Customers</Typography.Title>} key="2">
          <Row gutter={[4, 4]}>
            <Col span={24}>
              <SearchCustomer />

            </Col>
          </Row>
        </Panel>
      </Collapse>
    </section>

  )
}

export default InteractionsIndexPage

{/* */ }