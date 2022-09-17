import React from 'react'
import { Button, Input, PageHeader, Row, Tabs, Menu, Radio, Col, Card, Space, Collapse, Modal, Form, Divider, Steps, notification, Spin, Dropdown, DatePicker, Select } from 'antd';
import { PlusCircleOutlined, SettingOutlined, MinusSquareOutlined, InsuranceOutlined, PropertySafetyOutlined, CloseOutlined } from '@ant-design/icons';
import moment from 'moment-timezone';

export const RenderField = ({ data, index }) => {
    console.log({data,index});
    return (
        <Col span={24} key={index}>
            <Form.Item
                initialValue={data.defaultValue}
                help={data.description}
                label={data.name}
                name={["case", "task", index, data.name]}
               /*  rules={
                    [{
                        required: data.required,
                        message: data.description,
                    }]
                } */
            >
                {data.type === 'text' && <Input />}
                {data.type === 'textarea' && <Input.TextArea rows={data.rows} />}
                {data.type === 'select' &&
                    <Select>
                        {
                            data.options.map((opt, selindex) =>
                                <Select.Option key={selindex} value={opt}>{opt}</Select.Option>
                            )}
                    </Select>
                }
                {data.type === 'date' &&
                    <DatePicker format="MM/DD/YYYY" allowClear
                        defaultValue={moment(moment().subtract(data?.defaultValue.split("days")[0] || 7, 'days'), 'MM/DD/YYYYY')} />}
            </Form.Item>
        </Col>
    )

}

export default RenderField