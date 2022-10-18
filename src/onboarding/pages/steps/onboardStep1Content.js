import { Radio } from 'antd';
import React, { useState } from 'react';
import { Form, Input, Card } from 'antd';

const OnBoardStep1Content = () => {
    const [value, setValue] = useState('Self Managed AWS account');
    const options = [
        { label: 'Self Managed AWS account', value: 'Self Managed AWS account' },
        { label: 'Presolved Managed AWS account', value: 'Presolved Managed AWS account' }
    ];
    const [showOption, setShowOption] = useState(true);

    const onChange = ({ target: { value } }) => {
        console.log('radio checked', value);
        setValue(value);
        if (value === 'Self Managed AWS account') {
            setShowOption(true);
        }
        else setShowOption(false);
    };

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <Card
            title="Choose"
            bordered={true}
            style={{
                width: '100%',
                height: '100%',
            }}
        >
            <Radio.Group onChange={onChange} value={value} options={options} optionType="button" />
            <div style={{ width: '100%', height: '100%', justify: 'start', alignContent: 'center', margin: '25px 0 25px 0' }}>
                <Form
                    name="step1"
                    layout='vertical'
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 14 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    {showOption &&
                        <Form.Item
                            label="Account ID"
                            name="accountId"
                            rules={[{ required: true, message: 'Please input your account id!' }]}
                        >
                            <Input />
                        </Form.Item>
                    }
                    {!showOption &&
                        <Form.Item
                            label="Account Name"
                            name="accountName"
                            rules={[{ required: true, message: 'Please input your Account Name!' }]}
                        >
                            <Input />
                        </Form.Item>

                    }
                    {!showOption &&
                        <Form.Item
                            label="Email Id"
                            name="emailId"
                            rules={[{ required: true, message: 'Please input your email id!' }]}
                        >
                            <Input />
                        </Form.Item>

                    }
                    
                </Form>
            </div>
        </Card>

    );

}

export default OnBoardStep1Content;