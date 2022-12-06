
import React, { useState } from 'react';
import { Form, Input, Radio, Button } from 'antd';


const PhoneConfigure = (props) => {
    const [value, setValue] = useState('portingNumber');
    const [subValue, setSubValue] = useState(1);
    const [showOption, setShowOption] = useState(false);
    const [showSubOption, setShowSubOption] = useState(false);

    const phoneNumberOptions = [
        { label: 'Use my porting number', value: 'portingNumber' },
        { label: 'Allocate new number', value: 'newNumber' }
    ];

    const portingNumberSubOptions = [
        { label: 'TFN', value: 'TFN' },
        { label: 'DID', value: 'DID' }
    ];

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
        if (e.target.value === 'newNumber') {
            setShowOption(true);
        }
        else {
            setShowOption(false),
                setShowSubOption(false)
        };
    };

    const onChangeSubValue = (e) => {
        setSubValue(e.target.value);
        if (e.target.value == 'TFN') {
            setShowSubOption(true);
        } else setShowSubOption(false);
    };

    const onFinish = (values) => {
        props.phoneConfigure(values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="phoneConfigure"
            layout='vertical'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >

            <Form.Item initialValue={'oldNumber'} label='Select number' name='portingType' rules={[{ required: true, message: 'Please select any one number' }]}>
                <Radio.Group onChange={onChange} value={value}  options={phoneNumberOptions} optionType='button' />
            </Form.Item>
            {!showOption &&
                <Form.Item label='Enter your number' name='oldNumber' rules={[{ required: true, message: 'Please input your old number' }]} style={{ marginTop: '20px' }}>
                    <Input style={{
                        width: '60%',
                    }} />
                </Form.Item>
            }
            {showOption &&
                <Form.Item label='Choose option' name='newNumberSubOption' rules={[{ required: true, message: 'Please select any one method' }]} style={{ marginTop: '20px' }}>
                    <Radio.Group onChange={onChangeSubValue} value={subValue} name='portingNumberSubRadio' options={portingNumberSubOptions} optionType='button' />
                </Form.Item>
            }
            {showSubOption &&
                <Form.Item label='Number of TFN required' name='noOfTFN' rules={[{ required: true, message: 'Please input your required number of TFN' }]} style={{ marginTop: '20px' }}>
                    <Input style={{
                        width: '60%',
                    }} />
                </Form.Item>
            }
            <Form.Item>
                <Button type="default" htmlType="submit" size='small'>
                    Save
                </Button>
            </Form.Item>
        </Form>
    );
}

export default PhoneConfigure;

