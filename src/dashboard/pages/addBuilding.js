import {
    DatePicker, Form,
    Input, Select, Button 
} from 'antd';
import React from 'react';


const AddBuilding = (props) => {
    const [form] = Form.useForm();
    const { id } = props
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };


    return (
        <Form
            layout='vertical'
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
        >
            <Form.Item name="name" label="Task Name" rules={[{ required: true, message: 'Please input Task Name' },]}>
                <Input />
            </Form.Item>

            <Form.Item name="description" label="Task Description" rules={[{ required: true, message: 'Please input Task Description' },]}>
                <Input.TextArea />
            </Form.Item>
            <Form.Item name="building_type" label="Building Type" rules={[{ required: true, message: 'Please select Building Type' },]}>
                <Select>
                    <Select.Option value="newly_purchased_building">Newly Purchased Building </Select.Option>
                    <Select.Option value="newly_constructed_building">Newly Constructed Building </Select.Option>
                </Select>
            </Form.Item>
            <Form.Item name="address" label="Address of location" rules={[{ required: true, message: 'Please input Address of location' },]}>
                <Input.TextArea />
            </Form.Item>
            <Form.Item name="assign_to" label="Assign To" rules={[{ required: true, message: 'Please select the Assignee' },]}>
                <Select>
                    <Select.Option value="agent_1">Agent 1</Select.Option>
                    <Select.Option value="agent_2">Agent 2</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item name="schedule_date" label="Schedule date/time (Optional)" >
                <DatePicker />
            </Form.Item>
            <Form.Item label=" ">
                <Button type="primary" htmlType="submit">
                    Add task to {id}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddBuilding;