import { Checkbox, Radio, Form, Button, Space } from 'antd';
import React, { useState } from 'react';


const CheckboxGroup = Checkbox.Group;
const plainOptions = ['Phone', 'Chat', 'Email'];
const defaultCheckedList = ['Phone'];

const ChooseChannel = (props) => {

    const [value, setValue] = useState(1);
    const [checkedList, setCheckedList] = useState(defaultCheckedList);
    const [isSelectPhone, setIsSelectPhone] = useState(true);

    const onChange = (list) => {
        setCheckedList(list);
        if (list.some(val => (val === 'Phone'))) {
            setIsSelectPhone(true);
        }
        else {
            setIsSelectPhone(false);
        }
    };

    const options = [
        { label: 'Inbound', value: 'inbound' },
        { label: 'Outbound', value: 'outbound' }
    ];

    const onChangeRadio = (e) => {
        setValue(e.target.value);
    }

    const onFinish = (values) => {
        props.chooseChannel(values);
        props.next();
    };

    const onPrev = () => {
        props.prev();
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <Form
            name="step2"
            layout='vertical'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >

            <Form.Item
                initialValue={['Phone']}
                label="Select channel"
                name="channel"
                rules={[{ required: true, message: 'Please select channel!' }]}
            >
                <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} style={{ display: 'flex', flexDirection: 'column' }} />
            </Form.Item>
            {isSelectPhone &&
            <Form.Item
                label="Select phone type"
                name="phoneType"
                rules={[{ required: true, message: 'Please select type!' }]}
            >
                 <Radio.Group onChange={onChangeRadio} value={value} optionType='button' options={options} />
            </Form.Item>
            }
            <Form.Item>
                <Space>
                <Button type="primary" htmlType="submit" >
                    Next
                </Button>
                <Button type="secondary" htmlType="button" onClick={onPrev}>
                    Previous
                </Button>
                </Space>
            </Form.Item>

        </Form>
    );
};

export default ChooseChannel;