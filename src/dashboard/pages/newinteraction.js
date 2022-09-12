import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Button, Input, PageHeader, Row, Tabs, Menu, Radio, Col, Card, Space, Collapse, Modal, Form, Divider, Steps, notification, Spin, Dropdown } from 'antd';
import { PlusCircleOutlined, SettingOutlined, MinusSquareOutlined, InsuranceOutlined, PropertySafetyOutlined, CloseOutlined } from '@ant-design/icons';
import '../assets/style/interaction.less'
import AddBuilding from './addBuilding';
import '../../gc-components/connect-streams'
import '../../gc-components/amazon-connect-customer-profiles'
import '../../gc-components/amazon-connect-task'
import { DataStore } from 'aws-amplify';
import { Channel } from '../../models'
import { useDispatch, useStore } from 'react-redux';
import { updateAllTemplates, updateTemplates } from '../../store/reducers/config';
import { reject } from 'lodash';
const { TabPane } = Tabs;
const { Panel } = Collapse;
const { Step } = Steps;

const NewInteraction = (props) => {
    const dispatch = useDispatch()
    const config = useStore((state) => state.config)
    const divCCP = useRef(null);
    const { id } = props
    const [form] = Form.useForm();
    const [state, setState] = useState({
        showAddTask: false,
        taskTemplates: [],
        templates: {}
    })

    useEffect(() => {
        const connectUrl = "https://p3fusion-uat.my.connect.aws/ccp-v2"
        if (divCCP.current) {
            connect.agentApp.initCCP(divCCP.current, {
                ccpUrl: connectUrl, // REQUIRED
                loginPopup: true, // optional, defaults to `true`
                loginPopupAutoClose: true, // optional, defaults to `false`
                loginOptions: {
                    // optional, if provided opens login in new window
                    autoClose: true, // optional, defaults to `false`
                    height: 600, // optional, defaults to 578
                    width: 400, // optional, defaults to 433
                    top: 80, // optional, defaults to 0
                    right: 100 // optional, defaults to 0
                },
                region: "us-east-1", // REQUIRED for `CHAT`, optional otherwise
                softphone: {
                    // optional, defaults below apply if not provided
                    allowFramedSoftphone: true, // optional, defaults to false
                    disableRingtone: false, // optional, defaults to false
                    ringtoneUrl: "./ringtone.mp3" // optional, defaults to CCP’s default ringtone if a falsy value is set
                },
                pageOptions: {
                    //optional
                    enableAudioDeviceSettings: false, //optional, defaults to 'false'
                    enablePhoneTypeSettings: true //optional, defaults to 'true'
                },
                ccpAckTimeout: 5000, //optional, defaults to 3000 (ms)
                ccpSynTimeout: 3000, //optional, defaults to 1000 (ms)
                ccpLoadTimeout: 10000 //optional, defaults to 5000 (ms)
            });

            connect.contact(function (contact) {
                contact.onIncoming(function (contact) {
                    console.log("onIncoming", contact);
                });

                contact.onRefresh(function (contact) {
                    console.log("onRefresh", contact);
                });

                contact.onAccepted(function (contact) {
                    console.log("onAccepted", contact);

                });

                contact.onEnded(function () {
                    console.log("onEnded", contact);
                });

                contact.onConnected(function () {
                    console.log(`onConnected(${contact.getContactId()})`);
                    var attributeMap = contact.getAttributes();
                    /* var name = JSON.stringify(attributeMap["firstName"]["value"]);
                    var phone = JSON.stringify(attributeMap["phoneNumber"]["value"]);
                    var account = JSON.stringify(attributeMap["accountNumber"]["value"]);
                    console.log(name);
                    console.log(phone); */
                    const NewInteraction = new Interaction({
                        contactID: contact.getContactId(),
                        interactionID: id,
                        contactAttributes: attributeMap
                    })
                    console.log({ NewInteraction });
                    DataStore.save(NewInteraction).then((id) => {
                        console.log({ id });
                    })

                    console.log({
                        attributeMap: attributeMap
                    })
                });
            });
        }
        //getTemplate();
    }, [])

    const listTaskTemplates = () => {
        return new Promise((resolve, reject) => {
            if (connect.agent.initialized) {
                connect.agent(function (agent) {
                    const queryParams = {              
                        maxResults: 50 
                    };
                    agent.listTaskTemplates(queryParams, {
                        success: function (data) {
                            resolve(data)
                        }
                    })
                })
            }
        })
    }
    const getTaskTemplate = (templateParams) => {
        return new Promise((resolve, reject) => {
            if (connect.agent.initialized) {
                connect.agent(function (agent) {
                    agent.getTaskTemplate(templateParams, {
                        success: function (data) {
                            resolve(data)
                        }
                    })
                })
            }
        })
    }

    const getTemplate = () => {
        let taskTemplates = []
        let data = []
        const interval = setInterval(() => {
            console.log("Polling . . .");
            if (connect.agent.initialized) {
                clearInterval(interval);
                console.log("Cancelling Poll . . .");
                listTaskTemplates().then((templates) => {
                   
                    if (templates.TaskTemplates.length > 0) {
                        for (var i = 0; i < templates.TaskTemplates.length; i++) {
                            let task = templates.TaskTemplates[i]
                            let templateParams = { id: task.Id };
                            getTaskTemplate(templateParams).then((templateData) => {
                                data.push({
                                    name: task.Name,
                                    description: task.Description,
                                    id: task.Id,
                                    fields: templateData.Fields
                                })
                            })
                        }                     
                       
                        setState({ ...state, taskTemplates:data })
                        //dispatch(updateAllTemplates(data))
                    }
                })

                /*  connect.agent(function (agent) {
                     const queryParams = {// required                   
                         maxResults: 50 //optional, number, max value of 100
                     };
                     agent.listTaskTemplates(queryParams, {
                         success: function (data) {
                             if (data.TaskTemplates.length > 0) {
                                 for (var i = 0; i < data.TaskTemplates.length; i++) {
                                     let task = data.TaskTemplates[i]
                                     let templateParams = { id: task.Id };
                                     agent.getTaskTemplate(templateParams, {
                                         success: function (templateParamsdata) {
                                             let templateData = {
                                                 name: task.Name,
                                                 description: task.Description,
                                                 id: task.Id,
                                                 fields: templateParamsdata.Fields
                                             }
                                             taskTemplates.push(templateData)
                                             dispatch(updateTemplates({
                                                 id: task.Id,
                                                 data: templateData
                                             }))
                                         },
                                         failure: function (err) {
                                             console.error({ getTaskTemplate: err })
                                         }
                                     });
                                 }
                                 console.log("Cancelling Poll . . .", taskTemplates);
                                 setState({ ...state, taskTemplates })
                                 //dispatch(updateAllTemplates(taskTemplates))
                                 clearInterval(interval);
                             }
                         },
                         failure: function (err) {
                             console.error({ listTaskTemplates: err });
                         }
                     });
                 }) */
            }
        }, 2000)


    }


    return (
        <section className="interaction">
            <Row gutter={[16, 16]}>
                <Col span={18}>
                    <PageHeader ghost={false} className="site-page-header" onBack={() => null}
                        title={<span>Interaction : <em>{id}</em></span>} subTitle=" New Interaction" extra={[
                            <Button icon={<SettingOutlined />} onClick={() => getTemplate()} />,
                            <Dropdown overlay={
                                <Menu items={
                                    state.taskTemplates.map((tasks) => {
                                        return {
                                            "key": tasks.id,
                                            "label": tasks.name
                                        }
                                    })
                                } />}
                                placement="bottomLeft" arrow>
                                <Button icon={<PlusCircleOutlined />} >Add Task</Button>
                            </Dropdown>,
                        ]} />
                    <Tabs defaultActiveKey="1" type='card'>
                        <Tabs.TabPane tab="Search Customer" key="1">
                            <Row style={{ marginTop: 30 }}>
                                <Col span={24}>

                                    <Card title="search Customer">
                                        <CustomerProile props={props} />
                                        {/*  <div id="wisdom-container" ref={wisdom} /> */}
                                    </Card>
                                </Col>
                            </Row>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Add Building" key="2">
                            <Row style={{ marginTop: 30 }}>
                                <Col span={24}>
                                    <Card>
                                        <AddBuilding id={id} />
                                    </Card>
                                </Col>
                            </Row>
                        </Tabs.TabPane>
                    </Tabs>
                </Col>
                <Col className='interaction-sidebar' span={6} >
                    <div className="ccp" >
                        <div id="containerDiv" ref={divCCP} style={{ height: 600, backgroundColor: '#fff' }} />
                    </div>
                </Col>
            </Row>
        </section>
    )
}

export default NewInteraction




const CustomerProile = (props) => {
    const customerprofiles = useRef(null);
    const { id } = props
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (customerprofiles.current) {
            const instanceUrl = 'https://p3fusion-uat.my.connect.aws/'
            let client = new connect.CustomerProfilesClient(instanceUrl);
        }
        if (connect.agent.initialized) {
            notification.success({
                message: "Customer Profile initiated successfully"
            })
            setLoading(true)
        }

    }, [connect.agent.initialized])


    return (
        <section style={{ minHeight: '100vh' }}>

            <div id={`customerprofiles-container`} style={{ minHeight: '100vh' }} ref={customerprofiles} />
        </section>
    )
}