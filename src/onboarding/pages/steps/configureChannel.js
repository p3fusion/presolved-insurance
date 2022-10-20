import { Divider, Radio } from 'antd';
import React, { useState } from 'react';
import { Form, Input, Card } from 'antd';

const OnBoardStep3Content = () => {
    const [value, setValue] = useState(1);
    const [subValue, setSubValue] = useState(1);
    const [showOption, setShowOption] = useState(false);

    const phoneNumberOptions =[
        { label: 'Use my old phone number', value: 'oldNumber' },
        { label: 'Allocate new number', value: 'newNumber' }
    ];

    const phoneNumberSubOptions =[
        { label: 'TFN', value: 'TFN' },
        { label: 'DID', value: 'DID' }
    ];

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
        if (e.target.value === 'newNumber') {
            setShowOption(true);
        }
        else setShowOption(false);
    };

    const onChangeSubValue = (e) => {
        console.log('radio checked', e.target.value);
        setSubValue(e.target.value);
    };

    const onFinishPhone = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailedPhone = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onFinishChat = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailedChat = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onFinishEmail = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailedEmail = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <Card
            title="Details of channel"
            bordered={true}
            style={{
                width: '100%',
                height: '100%',
            }}
        >
            <Form
                name="phoneForm"
                layout='vertical'
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 14 }}
                onFinish={onFinishPhone}
                onFinishFailed={onFinishFailedPhone}
                autoComplete="off"
            >
                <h3>Phone</h3>
                <Form.Item>
                    <Radio.Group onChange={onChange} value={value} name='phoneNumberRadio' options={phoneNumberOptions} optionType='button'/>
                    <div style={{ marginTop: '20px' }}>
                    {showOption && <h5>Choose option</h5>}
                    {showOption && <Radio.Group onChange={onChangeSubValue} value={subValue} name='phoneNumberSubRadio' options={phoneNumberSubOptions} optionType='button'/> }
                    </div>
                </Form.Item>
            </Form>
            <Divider/>

            <Form
                name="chatForm"
                layout='vertical'
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 14 }}
                onFinish={onFinishChat}
                onFinishFailed={onFinishFailedChat}
                autoComplete="off"
            >
                <h3>Chat</h3>
                <Form.Item label='intents and utterance'>
                    <Input/>
                </Form.Item>
            </Form>
            <Divider/>

            <Form
                name="emailForm"
                layout='vertical'
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 14 }}
                onFinish={onFinishEmail}
                onFinishFailed={onFinishFailedEmail}
                autoComplete="off"
            >
                <h3>Email</h3>
                <Form.Item label='email ID'>
                   <Input/>
                </Form.Item>
                <Form.Item label='specifications'>
                   <Input/>
                </Form.Item>
            </Form>
            <Divider/>

        </Card>

    );

}

export default OnBoardStep3Content;


