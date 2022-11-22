import React, { useEffect, useState } from 'react';
import { Descriptions, Card, List, Space, Button } from 'antd';
import { useSelector } from 'react-redux';

const Review = (props) => {

    const steps = useSelector((state) => state.steps)
    const [showStep1Description, setShowStep1Description] = useState(false);
    const [showStep2Description, setShowStep2Description] = useState(false);
    
    const step1 = steps.step1;
    const step2 = steps.step2?.data;
    
    const [step1Data, setStep1Data] = useState([]);
    const [step2Data, setStep2Data] = useState([]);
    

    const { prev, state, setState } = props

    const handleSubmit = () => {
        console.log("Submit");
    }

    const handleShowStep1Description = () => {
        setShowStep1Description(true);
        let IsSelfManagedAWSAccou = step1.type == "selfManagedAccount" ? true : false;
        let step1Data = {
            Name: IsSelfManagedAWSAccou ? step1.selfManagedAccount.tenant : step1.presolvedAccount.tenant,
            Description: "description",
            IsSelfManagedAWSAccou: IsSelfManagedAWSAccou,
            Region: IsSelfManagedAWSAccou ? step1.selfManagedAccount.region : step1.presolvedAccount.region,
            AccouName: IsSelfManagedAWSAccou ? "" : step1.presolvedAccount.accountName,
            Email: IsSelfManagedAWSAccou ? "" : step1.presolvedAccount.emailID,
            AccouID: IsSelfManagedAWSAccou ? step1.selfManagedAccount.ID : "",
        }
        setStep1Data(step1Data);
    }

    const handleShowStep2Description = () => {
        setShowStep2Description(true);
        let step2Data = {
            EnablePhoneChannel: step2.EnablePhoneChannel,
            EnableChatChannel: step2.EnableChatChannel,
            EnableEmailChannel: step2.EnableEmailChannel,
            NumberType: step2.EnablePhoneChannel ? step2.channel.phone.numberType : "",
            ExistingNumber: step2.EnablePhoneChannel && step2.channel.phone.numberType == "existing" ? step2.channel.phone.existing : "",
            NewNumberType: step2.EnablePhoneChannel && step2.channel.phone.numberType == "newnumber" ? step2.channel.phone.new : "",
            NumberOfLines: step2.EnablePhoneChannel && step2.channel.phone.new == "TFN" ? step2.channel.phone.tfn : "",
            DIDNumber: step2.EnablePhoneChannel && step2.channel.phone.new == "DID" ? step2.channel.phone.did : "",
        }
        setStep2Data(step2Data);
    }


    useEffect(() => {
        console.log(steps.step1.length !== 0)
        if (steps.step1.length !== 0) {
            handleShowStep1Description();
        }
        if (steps.step2.length !== 0) {
            handleShowStep2Description();
        }
       
    }, []);


    return (
        <div>
            <Card
                title="Summary"
                bordered={true}
                style={{
                    width: '100%',
                    height: '100%',
                }}
            >
                {showStep1Description &&
                    <Descriptions title="Account Details" bordered column={1}>

                        {step1Data.Name !== "" && <Descriptions.Item label="Name">{step1Data.Name}</Descriptions.Item>}
                        {step1Data.Description !== "" && <Descriptions.Item label="Description">{step1Data.Description}</Descriptions.Item>}
                        <Descriptions.Item label="Type">{step1Data.IsSelfManagedAWSAccou ? "Self Managed AWS Account" : "Presolved Managed AWS Account"}</Descriptions.Item>
                        {step1Data.AccouName !== "" && <Descriptions.Item label="Account Name">{step1Data.AccouName}</Descriptions.Item>}
                        {step1Data.Email !== "" && <Descriptions.Item label="Email">{step1Data.Email}</Descriptions.Item>}
                        {step1Data.AccouID !== "" && <Descriptions.Item label="Account ID">{step1Data.AccouID}</Descriptions.Item>}
                        {step1Data.Region !== "" && <Descriptions.Item label="Region">{step1Data.Region}</Descriptions.Item>}
                    </Descriptions>
                }
                <br />
                {showStep2Description &&
                    <div>
                        <Descriptions title="Channel Selection" bordered column={1}>
                            {step2Data.EnablePhoneChannel && <Descriptions.Item label="Phone Channel">Enabled</Descriptions.Item>}
                            {step2Data.EnableChatChannel && <Descriptions.Item label="Chat Channel">Enabled</Descriptions.Item>}
                            {step2Data.EnableEmailChannel && <Descriptions.Item label="Email Channel">Enabled</Descriptions.Item>}
                            {step2Data.NumberType !== "" && <Descriptions.Item label="Number Type">{step2Data.NumberType}</Descriptions.Item>}
                            {step2Data.ExistingNumber !== "" && <Descriptions.Item label="Existing Number">{step2Data.ExistingNumber}</Descriptions.Item>}
                            {step2Data.NewNumberType !== "" && <Descriptions.Item label="New Number Type">{step2Data.NewNumberType}</Descriptions.Item>}
                            {step2Data.NumberOfLines !== "" && <Descriptions.Item label="Number Of Lines">{step2Data.NumberOfLines}</Descriptions.Item>}
                            {step2Data.DIDNumber !== "" && <Descriptions.Item label="DID Number" >{step2Data.DIDNumber}</Descriptions.Item>}
                        </Descriptions>
                    </div>
                }
                          </Card>
            <Card>
                <Space>
                    <Button type="ghost" size='large' onClick={() => prev()} >Previous</Button>
                    <Button type="primary" size='large'
                        onClick={() => {
                            handleSubmit();
                        }}
                    >Submit</Button>
                </Space>
            </Card>
        </div>
    );
};

export default Review;


// {

//     "Name": "Tena1222",

//     "Description": "Stack for Tena2",

//     "IsSelfManagedAWSAccou": false,

//     "Region": "",

//     "AccouName": "Test AccouName",

//     "Email": "abc@xyz.com",

//     "AccouID": "12345",

//     "EnablePhoneChannel": true,

//     "EnableChatChannel": true,

//     "EnableEmailChannel": true,

//     "ChannelData": {

//         "PhoneChannelData": {

//             "InstanceName": "",

//             "UseOldPhoneNumber": true,

//             "IsCreatePortingRequest": true,

//             "NewPhoneNumberType": "TFN",

//             "GreetingMessage": "",

//             "WaitMessage": "",

//             "HoursOfOperation": {

//                 "Config": [

//                     {

//                         "Day": "string",

//                         "EndTime": {

//                             "Hours": 1,

//                             "Minutes": 2

//                         },

//                         "StartTime": {

//                             "Hours": 3,

//                             "Minutes": 4

//                         }

//                     }

//                 ],

//                 "Description": "string",

//                 "Name": "string",

//                 "Tags": {

//                     "string": "string"

//                 },

//                 "TimeZone": "string"

//             }

//         },

//         "ChatChannelData": {

//             "Ies": [

//                 {

//                     "Name": "",

//                     "Utterances": [

//                         {

//                             "Value": ""

//                         }

//                     ]

//                 }

//             ]

//         },

//         "EmailChannelData": {

//             "EmailAddress": "",

//             "EmailBox": "",

//             "MSClieIdeifier": "",

//             "MSClieSecret": ""

//         }

//     }

// }