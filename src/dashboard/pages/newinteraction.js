import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Button, Input, PageHeader, Row, Tabs, Menu, Radio, Col, Card, Space, Collapse, Modal, Form, Divider, Steps } from 'antd';
import { PlusCircleOutlined, SettingOutlined, MinusSquareOutlined, InsuranceOutlined, PropertySafetyOutlined, CloseOutlined } from '@ant-design/icons';
import '../assets/style/interaction.less'
import AddBuilding from './addBuilding';
import '../../gc-components/connect-streams'
import '../../gc-components/amazon-connect-customer-profiles'
import '../../gc-components/amazon-connect-task'

const { TabPane } = Tabs;
const { Panel } = Collapse;
const { Step } = Steps;

const NewInteraction = (props) => {
    const divCCP = useRef(null);
    const { id } = props
    const [form] = Form.useForm();
    const [state, setState] = useState({
        showAddTask: false,
        tasks: {
            addb: false,
            addc: false,
            coi: false,
            loh: false,
        }
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




            /*  if (connect.isCCP()) {
                 
                 client.listProfileObjects({
                     "MaxResults": 10
                 }).then((profiles) => {
                     console.table(profiles)
                 }).catch((ex) => {
                     console.error({ ex });
                 })
             } */

            /*  client.searchProfiles({
                 "KeyName": "name",
                 "Values": ["sai"]
             }).then((res) => {
                 console.log({ res });
             }).catch((ex) => {
                 console.error({ ex });
             })
  */
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

                    console.log({
                        attributeMap: JSON.stringify(attributeMap)
                    })
                });
            });
        }
    }, [])

    const searchProfile = () => {
        const instanceUrl = 'https://p3fusion-uat.my.connect.aws/'
        let client = new connect.CustomerProfilesClient(instanceUrl);

        if (connect.agent.initialized) {
            connect.agent(function (agent) {
                const queryParams = {// required
                   
                    maxResults: 50 //optional, number, max value of 100
                };
                
                agent.listTaskTemplates(queryParams, {
                    success: function(data) { 
                        console.log({data});
                     },
                    failure: function(err) {console.error({err}); }
                });


                /* var queuesARNs = agent.getAllQueueARNs();
                agent.getEndpoints(queuesARNs,{
                        success: function (data) {
                            var endpoints = data.endpoints; // or data.addresses
                            console.log({data});
                            const newTask = {
                                name: "Test task from taskJS", //required, max len: 512
                                description: "N/A", //optional, max len: 4096
                                endpoint: endpoints[3],
                                references: { //optional
                                    "reference name": { // string, max len: 4096
                                        type: "URL", //required, currently only "URL" is supported as a reference type,
                                        value: "https://www.amazon.com" //required, string, max len: 4096
                                    }
                                }
                            };//ends newTask
                            console.log(newTask);
                            agent.createTask(newTask, {
                                success: function (data) { 
                                    console.log("Created a task with contact id: ", data.contactId) 
                                },
                                failure: function (err) { 
                                    console.log("error has occured",err); 
                                }
                            });//ends createTask
                        },//end success

                        failure: function (err) {
                            console.error({err})
                        }
                    }//ends QueueARN
                );// ends agent.getEndpoints */
            })

            /*  client.createProfile({
             
                 "DomainName": "amazon-connect-P3fusion-uat",
                 "FirstName": "Khizar Ahmed"
             }).then((res) => {
                 console.log('Success response: ' + JSON.stringify(res));
             }).catch((errorResp) => {
                 console.log('Error response: ' + JSON.stringify(errorResp));
             });       */
        }

    }


    return (
        <section className="interaction">

            <Row gutter={[16, 16]}>
                <Col span={18}>
                    <PageHeader ghost={false} className="site-page-header" onBack={() => null}
                        title={<span>Interaction : <em>{id}</em></span>} subTitle=" New Interaction" extra={[
                            <Button icon={<SettingOutlined />} />,
                            <Button onClick={() => setState({ ...state, showAddTask: true })} icon={<PlusCircleOutlined />} >Add Task</Button>,
                        ]} />
                    <Row style={{ marginTop: 30 }}>
                        <Col span={24}>

                            <Card title="search Customer">
                                <Button onClick={() => searchProfile()}>Search</Button>
                                <CustomerProile props={props} />
                                {/*  <div id="wisdom-container" ref={wisdom} /> */}
                            </Card>
                        </Col>
                    </Row>
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
    useEffect(() => {
        if (customerprofiles.current) {
            const instanceUrl = 'https://p3fusion-uat.my.connect.aws/'
            let client = new connect.CustomerProfilesClient(instanceUrl);
        }
    }, [])


    /*   useLayoutEffect(() => {
          if (connect.agent.initialized) {
  
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
                       var name = JSON.stringify(attributeMap["firstName"]["value"]);
                       var phone = JSON.stringify(attributeMap["phoneNumber"]["value"]);
                       var account = JSON.stringify(attributeMap["accountNumber"]["value"]);
                       console.log(name);
                       console.log(phone);
                    
                      console.log({
                          attributeMap: JSON.stringify(attributeMap)
                      })
                  });
              });
          }
  
      }) */

    return (
        <div id={`customerprofiles-container`} style={{ minHeight: '100vh' }} ref={customerprofiles} />
    )
}