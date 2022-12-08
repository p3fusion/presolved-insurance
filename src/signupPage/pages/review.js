import React, { useEffect, useState } from 'react';
import { Descriptions, Card, List, Space, Button } from 'antd';
import { useSelector } from 'react-redux';

const Review = (props) => {

    const steps = useSelector((state) => state.steps)
    const [showStep1Description, setShowStep1Description] = useState(false);


    const step1 = steps.step1?.data;


    const [step1Data, setStep1Data] = useState([]);



    const { prev, state, setState } = props

    const handleSubmit = () => {
        console.log("Submit");
    }

    const handleShowStep1Description = () => {
        setShowStep1Description(true);
        let step1Data = {
            ServiceInbound: state.channel.phone.isInbound,
            ServiceOutbound: state.channel.phone.isOutbound,
            EnablePhoneChannel: step1.EnablePhoneChannel,
            EnableChatChannel: step1.EnableChatChannel,
            EnableEmailChannel: step1.EnableEmailChannel,
            NumberType: step1.EnablePhoneChannel ? !state.channel.phone.isnew ? "Use your existing phone number" : "Allocate new number" : "",
            ExistingNumber: step1.EnablePhoneChannel && !state.channel.phone.isnew ? state.channel.phone.existingNumber : "",
            NewNumberType: step1.EnablePhoneChannel && state.channel.phone.isnew ? state.channel.phone.new : "",
            NumberOfLines: step1.EnablePhoneChannel && state.channel.phone.isnew ? state.channel.phone.noOfLines : "",

        }
        setStep1Data(step1Data);
    }


    useEffect(() => {
        console.log(steps.step1.length !== 0)
        if (steps.step1.length !== 0) {
            handleShowStep1Description();
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
                    <div>
                        <Descriptions title="Channel Selection" bordered column={1}>
                            <Descriptions.Item label="Inbound">{step1Data.ServiceInbound ? "Enabled" : "Disabled"}</Descriptions.Item>
                            <Descriptions.Item label="Outbound">{step1Data.ServiceOutbound ? "Enabled" : "Disabled"}</Descriptions.Item>
                            <Descriptions.Item label="Phone Channel">{step1Data.EnablePhoneChannel?"Enabled":"Disabled"}</Descriptions.Item>
                            <Descriptions.Item label="Chat Channel">{step1Data.EnableChatChannel?"Enabled":"Disabled"}</Descriptions.Item>
                            <Descriptions.Item label="Email Channel">{step1Data.EnableEmailChannel?"Enabled":"Disabled"}</Descriptions.Item>
                            {step1Data.NumberType !== "" && <Descriptions.Item label="Number Type">{step1Data.NumberType}</Descriptions.Item>}
                            {step1Data.ExistingNumber !== "" && <Descriptions.Item label="Existing Number">{step1Data.ExistingNumber}</Descriptions.Item>}
                            {step1Data.NewNumberType !== "" && <Descriptions.Item label="New Number Type">{step1Data.NewNumberType}</Descriptions.Item>}
                            {step1Data.NumberOfLines !== "" && <Descriptions.Item label="Number Of Lines">{step1Data.NumberOfLines}</Descriptions.Item>}
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