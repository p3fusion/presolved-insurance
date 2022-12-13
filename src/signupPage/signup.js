import React, { useState } from 'react';
import {
    PhoneOutlined,
    MailOutlined,
    MessageOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    QuestionCircleOutlined
} from '@ant-design/icons';
import { Avatar, Breadcrumb, Button, Card, Layout, Menu, PageHeader, Tabs, Steps, Row, Col, Space, Typography, Divider, Switch, Form } from 'antd';
const { Header, Sider, Content } = Layout;
const { Step } = Steps
import 'antd/dist/antd.less';
import './assets/style/index.less'
import logo from './assets/images/logo-white.png'
import { Footer } from 'antd/lib/layout/layout';
import ChooseChannel from './pages/chooseChannel';
import ConfigureCases from './pages/configureCases';
import Review from './pages/review';
import { payload } from './pages/payload';

const PresolvedOnboardPage = () => {

    const [state, setState] = useState({
        current: 0,
        channel: {
            isPhoneSelected: true,
            isEmailSelected: false,
            isChatSelected: false,
            phone: {
                isInbound: true,
                isOutbound: true,
                existingNumber:"",
                isnew: false,
                new: "TFN",
                phoneNumberOptions: [
                    { label: 'Use your existing phone number', value: 'existing' },
                    { label: 'Allocate new number', value: 'new' }
                ],
                phoneNumberSubOptions: [
                    { label: 'TFN', value: 'TFN' },
                    { label: 'DID', value: 'DID' }
                ],
                noOfLines:"",
            },
            email: {},
            chat: {
                intentSelected: "greetings",
                intent: null,
                utterance: null,
                intents: [
                    { "label": "Greetings", "value": "greetings","selected": true },
                    { "label": "Welcome", "value": "welcome","selected": true },
                    { "label": "Inquiry", "value": "inquiry","selected": true },
                    { "label": "Operator", "value": "operator","selected": true },
                    { "label": "Renewal", "value": "renewal","selected": true },
                    { "label": "Raise claim", "value": "raise claim","selected": true },
                    { "label": "Claim status", "value": "claim status","selected": true },
                    { "label": "Certificate of insurance", "value": "certificate","selected": true },
                ],
                utterances: [
                    { "intents": "greetings", "value": "Hello there" },
                    { "intents": "greetings", "value": "How are you" },
                    { "intents": "greetings", "value": "How may i help" },
                    { "intents": "greetings", "value": "Hello there" },
                    { "intents": "greetings", "value": "How are you" },
                    { "intents": "greetings", "value": "How may i help" },
                    { "intents": "greetings", "value": "Hello there" },
                    { "intents": "greetings", "value": "How are you" },
                    { "intents": "greetings", "value": "How may i help" },
                    { "intents": "welcome", "value": "Welcome" },
                    { "intents": "welcome", "value": "Good day" },
                    { "intents": "welcome", "value": "Its good to see you" },
                    { "intents": "renewal", "value": "When is next due date" },
                    { "intents": "renewal", "value": "want to renew" },
                    { "intents": "renewal", "value": "remind me for next" },
                ],
                
            },

        },
        templates:payload.templates,
        step1: {},
        step2: {},

    })

    const next = () => setState({ ...state, current: state.current + 1 });
    const prev = () => setState({ ...state, current: state.current - 1 });
    const onChange = (value) => setState({ ...state, current: value });

    const steps = [

        {
            title: 'Choose channel',
            content: <ChooseChannel state={state} setState={setState} next={next} prev={prev} />,
        },
        {
            title: 'Configure cases',
            content: <ConfigureCases state={state} setState={setState} next={next} prev={prev} />,
        },
        {
            title: 'Review',
            content: <Review state={state} setState={setState} prev={prev} />,
        },
    ];


    return (
        <Layout className='presolved-onbard'>


            <Header className="onboard-header" >
                <div className='container'>
                    <div className='logo'><img src={logo} height={55} /></div>
                </div>
            </Header>
            <Content className='content'>
                <div className='container'>
                    <PageHeader title="Hi Guest" subTitle="Complete the onboard steps" ghost={false}
                        avatar={<Avatar size={64} icon={<UserOutlined />} />}
                        breadcrumb={<Breadcrumb >
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>Onboard Page</Breadcrumb.Item>
                        </Breadcrumb>}
                        extra={[<Button size='large' shape='circle' type='link' icon={<QuestionCircleOutlined />} />]}
                        footer={<Steps current={state.current} onChange={onChange} >
                            {steps.map((item, index) => <Step key={index} title={item.title} />)}
                        </Steps>}
                    />
                    <Card className='onboard-container' >
                        <div className="steps-content">{steps[state.current].content}</div>
                    </Card>
                </div>
            </Content>
            <Footer>
                <div className='container'>
                </div>
            </Footer>
        </Layout>
    )
}

export default PresolvedOnboardPage