import { Button, Card, Col, Divider, Form, Input, List, Radio, Result, Row, Select, Space, Steps, Switch, Typography, Tabs, PageHeader, Transfer, Tag, Checkbox } from 'antd';
import React, { useState, useEffect } from 'react';
import { PlusOutlined, MailOutlined, MessageOutlined, PhoneOutlined, ApartmentOutlined, WechatOutlined, UnorderedListOutlined, CloseOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch } from 'react-redux';
import { updateStep1 } from '../store/reducers/steps';
import '../assets/style/channel.less'
import { Children } from 'react';

const { Step } = Steps;
const { CheckableTag } = Tag;


const ChooseChannel = (props) => {

    const dispatch = useDispatch()
    const channels = ["Phone", "E-Mail", "Chat"]
    const { next, state, setState, prev } = props
    const [tab, activeTab] = useState('phone')
    const newUtteranceList = []

    useEffect(() => {
       setActiveTab()
      },[]);

      const setActiveTab=()=>{
        activeTab( state.channel.isPhoneSelected?'phone':state.channel.isChatSelected?'chat':'email')
      }

    const onFinish = (values) => {

        if(state.channel.isPhoneSelected)
        state.channel.phone.isnew !== true ?
            setState({
                ...state,
                channel: {
                    ...state.channel,
                    phone: {
                        ...state.channel.phone,
                        existingNumber: values.channel.phone.existing
                    }
                }
            })
            :
            setState({
                ...state,
                channel: {
                    ...state.channel,
                    phone: {
                        ...state.channel.phone,
                        noOfLines: values.channel.phone.noOfLines
                    }
                }
            })

            state.channel.chat.intents.map(intent => {
            if(intent.selected===true)
            state.channel.chat.utterances.map(utterance => {
                if (intent.value === utterance.intents) {
                    newUtteranceList.push(utterance);
                }
            })
        });

        let data = {
            ...values,
            IsInbound: state.channel.phone.IsInbound,
            IsOutbound: state.channel.phone.IsOutbound,
            EnablePhoneChannel: state.channel.isPhoneSelected,
            EnableChatChannel: state.channel.isChatSelected,
            EnableEmailChannel: state.channel.isEmailSelected,
            intents: state.channel.chat.intents,
            utterances: newUtteranceList,
        }

        dispatch(updateStep1({ data }))
        //setState({...state,step2: values })
        next();
    }

    const onFinishFailed = (e) => {
        console.log({ failures: e });
        if (e.errorFields.length > 0) {
            let getErrorTab = e.errorFields[0].name[1];
            activeTab(getErrorTab)

        }
    }

    return (
        <div className='steps-channel'>
            <Row gutter={[16, 16]} align='top' justify='space-evenly'>


                <Col span={24}>

                    <Typography.Title level={3}>Choose Your required Channels</Typography.Title>
                    <Typography.Title level={5}>Note: You can make the changes any time on the admin portal</Typography.Title>

                    <Row gutter={[16, 16]} align='top'>
                        <Col span={4} className="channels">
                            <Button shape='round' block size='large' icon={<PhoneOutlined />} type={state.channel.isPhoneSelected ? 'primary' : 'dashed'}
                                onClick={() => {
                                    if (state.channel.isPhoneSelected)
                                        state.channel.isEmailSelected ? activeTab('email') : activeTab('chat')
                                    else
                                        activeTab('phone')
                                    setState({
                                        ...state,
                                        channel: {
                                            ...state.channel,
                                            isPhoneSelected: !state.channel.isPhoneSelected
                                        }
                                    })
                                }
                                }
                            > Phone </Button>
                            <Button shape='round' block size='large' icon={<MailOutlined />} type={state.channel.isEmailSelected ? 'primary' : 'dashed'}
                                onClick={() => {
                                    if (state.channel.isEmailSelected)
                                        state.channel.isPhoneSelected ? activeTab('phone') : activeTab('chat')
                                    else
                                        activeTab('email')
                                    setState({
                                        ...state,
                                        channel: {
                                            ...state.channel,
                                            isEmailSelected: !state.channel.isEmailSelected
                                        }
                                    })
                                }
                                }
                            > E-Mail </Button>
                            <Button shape='round' block size='large' icon={<MessageOutlined />} type={state.channel.isChatSelected ? 'primary' : 'dashed'}
                                onClick={() => {
                                    if (state.channel.isChatSelected)
                                        state.channel.isPhoneSelected ? activeTab('phone') : activeTab('email')
                                    else
                                        activeTab('chat')
                                    setState({
                                        ...state,
                                        channel: {
                                            ...state.channel,
                                            isChatSelected: !state.channel.isChatSelected
                                        }
                                    })
                                }
                                }
                            >Chat</Button>



                        </Col>
                        <Col span={18} offset={2} style={{ marginTop: 60 }}>
                            <Form name="form2" layout='vertical' size='large' onFinish={onFinish} onFinishFailed={onFinishFailed}
                            initialValues={{
                                channel: {
                                    phone:{
                                        numberType: state.channel.phone.isnew ? "new" : "existing",
                                        existing: state.channel.phone.existingNumber,
                                        services:{
                                            IsOutbound: state.channel.phone.isOutbound,
                                            IsInbound:state.channel.phone.isInbound,
                                        },
                                        new:state.channel.phone.new,
                                        noOfLines:state.channel.phone.noOfLines
                                    }
                                }
                            }}
                            >
                                <Tabs defaultactiveKey={"phone"} activeKey={tab} onChange={(e) => activeTab(e)}>
                                    {state.channel.isPhoneSelected &&
                                        <Tabs.TabPane tab="Phone" key="phone"  >
                                            <RenderPhone {...props} />
                                        </Tabs.TabPane>
                                    }
                                    {state.channel.isEmailSelected &&
                                        <Tabs.TabPane tab="Email" key="email"  >
                                            <RenderEmail {...props} />
                                        </Tabs.TabPane>

                                    }
                                    {state.channel.isChatSelected &&
                                        <Tabs.TabPane tab="Chat" key="chat"   >
                                            <RenderChat {...props} />
                                        </Tabs.TabPane>

                                    }
                                </Tabs>

                                {
                                    !state.channel.isPhoneSelected &&
                                    !state.channel.isEmailSelected &&
                                    !state.channel.isChatSelected &&
                                    <Card >
                                        <Result title="Choose atleast 1 services to proceed further" status="500" />
                                    </Card>


                                }

                                <Card style={{ margin: '10px 0' }}>
                                    <Space>
                                        <Button type="primary" htmlType="submit" size='large'>Next</Button>
                                    </Space>
                                </Card>
                            </Form>
                        </Col>
                    </Row>

                    <Row style={{ marginTop: 30 }}>

                    </Row>
                </Col>
            </Row>
        </div>
    );
};


const RenderChat = (props) => {

    const { next, state, setState, prev } = props
    const [options,setOptions] = useState([]);
    
    useEffect(() => {
        getOptions()
       },[]);
 
       const getOptions=()=>{
         setOptions( state.channel.chat.intents )
       }
 

    return (
        <Row gutter={[16, 16]} >
            <Col span={10}
                id="scrollableIntents"
                style={{
                    height: 400,
                    overflow: 'auto',
                    padding: '0 16px',
                    border: '1px solid rgba(140, 140, 140, 0.35)',
                }}>
                <InfiniteScroll
                    dataLength={options.length}
                    hasMore={options.length < 50}
                    endMessage={<Divider plain>-- End --</Divider>}
                    scrollableTarget="scrollableIntents"

                >
                    <List
                        header={<Typography.Title level={5}>Intents</Typography.Title>}
                        itemLayout='horizontal'
                        dataSource={options}
                        renderItem={(item) => (
                            <List.Item >

                                <Checkbox
                                    defaultChecked={item.selected}
                                    value={item.value}
                                    onChange={(e) => {

                                        let newIntentList = state.channel.chat.intents.filter((ListItem) => ListItem.value !== item.value);
                                        newIntentList.push({"label": item.label, "value": item.value, "selected": e.target.checked})
                                        
                                        console.log('newList', newIntentList)
                                        
                                        setState({
                                            ...state,
                                            channel: {
                                                ...state.channel,
                                                chat: {
                                                    ...state.channel.chat,
                                                    intents:newIntentList,
                                                    intentSelected: item.value
                                                }
                                            }
                                        });

                                    }}
                                >
                                    <Typography
                                        onMouseEnter={() => {
                                            setState({
                                                ...state,
                                                channel: {
                                                    ...state.channel,
                                                    chat: {
                                                        ...state.channel.chat,
                                                        intentSelected: item.value
                                                    }
                                                }
                                            });
                                        }}
                                    >
                                        {item.label}
                                    </Typography>

                                </Checkbox>

                            </List.Item>
                        )}
                    >
                    </List>
                </InfiniteScroll>
            </Col >
            <Col span={2}></Col>
            <Col
                span={10}
                id="scrollableUtterance"
                style={{
                    height: 400,
                    overflow: 'auto',
                    padding: '0 16px',
                    border: '1px solid rgba(140, 140, 140, 0.35)',
                }}>
                <InfiniteScroll
                    dataLength={(state.channel.chat.utterances.filter((rec) => rec.intents == state.channel.chat.intentSelected)).length}
                    hasMore={(state.channel.chat.utterances.filter((rec) => rec.intents == state.channel.chat.intentSelected)).length < 50}
                    endMessage={<Divider plain>-- End --</Divider>}
                    scrollableTarget="scrollableUtterance"
                >
                    <List
                        header={<Typography.Title level={5}>Utterances of {state.channel.chat.intentSelected} </Typography.Title>}
                        itemLayout='horizontal'
                        dataSource={state.channel.chat.utterances.filter((rec) => rec.intents == state.channel.chat.intentSelected)}
                        renderItem={item => (
                            <List.Item>
                                <Typography.Text>{item.value}</Typography.Text>
                            </List.Item>
                        )}
                    />
                </InfiniteScroll>
            </Col>

        </Row >
    )
}

const RenderEmail = (props) => {
    const { next, state, setState, prev } = props
    //Email Box, Microsoft graph client identifier, Microsoft graph client secret
    return (
        <Row>
            <Col span={24}>
                <Card>
                    <Form.Item name={["channel", "email", "address"]} label="Email Box / Address ID" rules={[{ required: true, message: 'Please provide your E-Mail Address' }]}>
                        <Input
                            inputMode='email'
                        />
                    </Form.Item>
                    <Form.Item name={["channel", "email", "clientID"]} label="client identifier / Client ID" rules={[{ required: true, message: 'Please provide your  client identifier' }]}>
                        <Input
                            inputMode='email'
                        />
                    </Form.Item>
                    <Form.Item name={["channel", "email", "clientSecret"]} label="client secret" rules={[{ required: true, message: 'Please povide your  client secret' }]}>
                        <Input.Password
                            inputMode='email'
                        />
                    </Form.Item>
                </Card>
            </Col>
        </Row>
    )
}

const RenderPhone = (props) => {
    const { next, state, setState, prev } = props


    return (
        <Row>
            <Col span={24}>
                <Card>

                    <Row style={{ marginBottom: 20 }}>
                        <Col span={8}>Outbound</Col>
                        <Col span={16}>
                            <Form.Item name={["channel", "phone", "services", "IsOutbound"]} label="">
                                <Switch
                                    title='Outbound'
                                    defaultChecked={state.channel.phone.isOutbound}
                                    onChange={() => {
                                        setState({
                                            ...state,
                                            channel: {
                                                ...state.channel,
                                                phone: {
                                                    ...state.channel.phone,
                                                    isOutbound: !state.channel.phone.isOutbound
                                                }
                                            }
                                        })
                                    }
                                    }
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>Inbound</Col>
                        <Col span={16}>
                            <Form.Item
                             name={["channel", "phone", "services", "IsInbound"]} 
                             label=""
                             
                             >
                                <Switch
                                    title='Inbound'
                                    defaultChecked={state.channel.phone.isInbound}
                                    onChange={() => {
                                        setState({
                                            ...state,
                                            channel: {
                                                ...state.channel,
                                                phone: {
                                                    ...state.channel.phone,
                                                    isInbound: !state.channel.phone.isInbound
                                                }
                                            }
                                        })
                                    }
                                    }

                                />
                            </Form.Item>
                        </Col>
                    </Row>



                    <Form.Item
                        name={["channel", "phone", "numberType"]}
                        label="Which number do you want to use ?"
                    >
                        <Radio.Group defaultValue={state.channel.phone.isnew ? "new" : "existing"} >
                            <Radio.Button
                                value="existing"
                                onChange={() =>
                                    setState({
                                        ...state,
                                        channel: {
                                            ...state.channel,
                                            phone: {
                                                ...state.channel.phone,
                                                isnew: false
                                            }
                                        }
                                    })
                                }>Use your existing phone number</Radio.Button >
                            <Radio.Button value="new" onChange={
                                () => {
                                    setState({
                                        ...state,
                                        channel: {
                                            ...state.channel,
                                            phone: {
                                                ...state.channel.phone,
                                                isnew: true
                                            }
                                        }
                                    })
                                }
                            }>Allocate new number</Radio.Button >
                        </Radio.Group>
                    </Form.Item>


                    {!state.channel.phone.isnew &&
                        <Form.Item
                            label='Enter your number'
                            name={["channel", "phone", "existing"]}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please provide valid phone number',
                                },
                                {
                                    pattern: /^[0-9]*$/, message: "Enter valid characters"
                                },
                                {
                                    max: 10, message: 'Phone number must have 10 digits'
                                }
                            ]}
                            style={{ marginTop: '20px' }}
                            onChange={(e) => {
                                setState({
                                    ...state,
                                    channel: {
                                        ...state.channel,
                                        phone: {
                                            ...state.channel.phone,
                                            existingNumber: e.target.value
                                        }
                                    }
                                })
                            }}
                        >

                            <Input />
                        </Form.Item>
                    }

                    {state.channel.phone.isnew &&
                        <div>

                            <Form.Item
                                label='Choose New number options'
                                name={["channel", "phone", "new"]}
                                style={{ marginTop: '20px' }}
                            >
                                <Radio.Group defaultValue={state.channel.phone.new}>
                                    <Radio.Button
                                        value="TFN"
                                        onChange={
                                            () => setState({
                                                ...state,
                                                channel: {
                                                    ...state.channel,
                                                    phone: {
                                                        ...state.channel.phone,
                                                        new: "TFN"
                                                    }
                                                }
                                            })
                                        }>
                                        Toll Free Number
                                    </Radio.Button >
                                    <Radio.Button
                                        value="DID"
                                        onChange={
                                            () => setState({
                                                ...state,
                                                channel: {
                                                    ...state.channel,
                                                    phone: {
                                                        ...state.channel.phone,
                                                        new: "DID"
                                                    }
                                                }
                                            })
                                        }>
                                        Direct Inward Dialing
                                    </Radio.Button >
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item
                                label='Number of Phone lines'
                                name={["channel", "phone", "noOfLines"]}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter a valid number',
                                    },
                                    {
                                        pattern: /^[0-9]*$/, message: "Enter valid characters"
                                    }
                                ]}
                                style={{ marginTop: '20px' }}
                                onChange={(e) => {
                                    setState({
                                        ...state,
                                        channel: {
                                            ...state.channel,
                                            phone: {
                                                ...state.channel.phone,
                                                noOfLines: e.target.value
                                            }
                                        }
                                    })
                                }}
                            >

                                <Input />
                            </Form.Item>
                        </div>
                    }
                </Card>

            </Col>
        </Row>
    )
}

export default ChooseChannel;


{/*    <Row gutter={[16, 16]}>
                        <Col span={10}>
                            <p>Add Intents</p>
                            <Space>
                                <Input value={state.channel.chat.intent} placeholder='Add Intents' onChange={(e) => setState({
                                    ...state,
                                    channel: {
                                        ...state.channel,
                                        chat: {
                                            ...state.channel.chat,
                                            intent: e.target.value,
                                        }
                                    }
                                })} />

                                <Button type='primary' icon={< PlusOutlined />} onClick={() => {
                                    let { intents } = state.channel.chat;
                                    intents.push({ "label": state.channel.chat.intent, "value": state.channel.chat.intent })

                                    setState({
                                        ...state,
                                        channel: {
                                            ...state.channel,
                                            chat: {
                                                ...state.channel.chat,
                                                intents: intents,
                                                intentSelected: state.channel.chat.intent,
                                                intent: null
                                            }
                                        }
                                    })
                                }} />
                            </Space>
                            <Divider > Available intents </Divider>
                            <List
                                itemLayout='horizontal'
                                bordered
                                dataSource={state.channel.chat.intents}
                                renderItem={(item) => (
                                    <List.Item onClick={() => setState({
                                        ...state,
                                        channel: {
                                            ...state.channel,
                                            chat: {
                                                ...state.channel.chat,
                                                intentSelected: item.value
                                            }
                                        }
                                    })}
                                        style={{
                                            cursor: 'pointer',
                                            background: state.channel.chat.intentSelected === item.value ? '#aaa5fa' : '#fff'
                                        }}>
                                        <Row>
                                            <Space>
                                                <Col >
                                                    <Typography.Text><UnorderedListOutlined /> {item.label}</Typography.Text>
                                                </Col>
                                                <Col >
                                                    <Button type='secondary' icon={<CloseOutlined />} shape='circle' size='small'
                                                        onClick={() => {
                                                            let newIntentList = state.channel.chat.intents.filter((ListItem) => ListItem.value !== item.value);
                                                            setState(state.channel.chat.intents = newIntentList);
                                                            let newUtteranceList = state.channel.chat.utterances.filter((ListItem) => ListItem.intents !== item.value);
                                                            setState(state.channel.chat.utterances = newUtteranceList);
                                                        }
                                                        } />
                                                </Col>
                                            </Space>
                                        </Row>

                                    </List.Item>
                                )}
                            />
                        </Col>

                        <Col span={14}>
                            <p>Utterncases for <em>{state.channel.chat.intentSelected}</em></p>
                            <Space>
                                <Input placeholder={`Add Utterances for ${state.channel.chat.intentSelected}`}
                                    onChange={(e) => setState({
                                        ...state,
                                        channel: {
                                            ...state.channel,
                                            chat: {
                                                ...state.channel.chat,
                                                utterance: e.target.value,
                                            }
                                        }

                                    })}
                                />
                                <Button type='primary' icon={< PlusOutlined />} onClick={() => {
                                    let { utterances } = state.channel.chat;
                                    utterances.push({ "intents": state.channel.chat.intentSelected, "value": state.channel.chat.utterance })
                                    setState({
                                        ...state,
                                        channel: {
                                            ...state.channel,
                                            chat: {
                                                ...state.channel.chat,
                                                utterances: utterances,
                                                utterance: null
                                            }
                                        }
                                    })
                                }} />
                            </Space>
                            <Divider > Available Utterances </Divider>
                            <List
                                header={<p>Utterances of {state.channel.chat.intentSelected} </p>}
                                itemLayout='horizontal'
                                bordered
                                dataSource={state.channel.chat.utterances.filter((rec) => rec.intents == state.channel.chat.intentSelected)}
                                renderItem={item => (
                                    <List.Item>
                                        <Typography.Text>{item.value}</Typography.Text>
                                    </List.Item>
                                )}
                            />
                        </Col>

                    </Row> */}

{/* <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Transfer className='transfer'
                             targetKeys={targetKeys}
                                onChange={onChange}
                                onSelectChange={onSelectChange}
                                onScroll={onScroll}
                                dataSource={
                                    state.channel.chat.intents.map((rec) => {
                                        return {
                                            key: rec.value,
                                            title: rec.value,
                                            children: [{
                                                key: rec.value,
                                                title: rec.value,
                                            }]
                                        }
                                    })}
                                titles={['Available Intent', 'Selected Intents']}

                                render={(item) => item.title}
                            />
                        </Col>
                    </Row>

                </Card>
            </Col>
        </Row> */}