import { Radio } from 'antd';
import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';

const SelectAccount = (props) => {
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
        props.selectAccount(values);
        props.next();
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <div
            style={{
                padding: '15px',
            }}
        >
            <Radio.Group onChange={onChange} value={value} options={options} optionType="button" />
            <div style={{ justify: 'start', alignContent: 'center', margin: '25px 0 25px 0' }}>
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
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Next
                        </Button>
                    </Form.Item>

                </Form>
            </div>
        </div>

    );

}

export default SelectAccount;