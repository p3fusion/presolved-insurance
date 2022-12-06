import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Select, Space } from 'antd';
import { sectionFooterSecondaryContent } from 'aws-amplify';
import React, { useState } from 'react';

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 4,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 20,
        },
    },
};
const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 20,
            offset: 4,
        },
    },
};



const chatConfigure = (props) => {

    const [list,setList]=useState([]);

    const [showSelect, setShowSelect] = useState(false);
    const [showAddUtterance, setShowAddUtterance] = useState(false);
    const [intentList, setIntentList] = useState([]);
    const [form] = Form.useForm();
    let selectOptions = [];

    const onFinishIntents = (values) => {
        values.intents.forEach(function (item) {
            selectOptions.push({ label: item, value: item })
        });
        setIntentList(selectOptions);
        setShowSelect(true);
    };




    const onFinishUtterance = (values) => {
        console.log(values);
        document.getElementById("dynamic_form_nest_item").reset();
        setShowAddUtterance(false);
    };

    const handleReset=()=>{
        document.getElementById("dynamic_form_item").reset();
        setIntentList([]);
        showSelect(false);
    }

    const handleChange = (value) => {
        setShowAddUtterance(true);
    };

    return (
        <div>
            <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={onFinishIntents}>
                <Form.List
                    name="intents"
                    rules={[
                        {
                            validator: async (_, names) => {
                                if (!names || names.length < 1) {
                                    return Promise.reject(new Error('At least 1 Indent'));
                                }
                            },
                        },
                    ]}
                >
                    {(intentsFields, { add: addIntents, remove: removeIntents }, { errors }) => (
                        <>
                            {intentsFields.map((field, index) => (
                                <Form.Item
                                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                    label={index === 0 ? 'Intents' : ''}
                                    required={false}
                                    key={field.key}
                                >
                                    <Form.Item
                                        {...field}
                                        validateTrigger={['onChange', 'onBlur']}
                                        rules={[
                                            {
                                                required: true,
                                                whitespace: true,
                                                message: "Please input Intent or delete this field.",
                                            },
                                        ]}
                                        noStyle
                                    >
                                        <Input
                                            placeholder="Intent name"
                                            style={{
                                                width: '60%',
                                            }}
                                        />
                                    </Form.Item>
                                    {intentsFields.length > 1 && !showSelect ? (
                                        <MinusCircleOutlined
                                            className="dynamic-delete-button"
                                            onClick={() => removeIntents(field.name)}
                                        />
                                    ) : null}
                                </Form.Item>
                            ))}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => addIntents()}
                                    style={{
                                        width: '60%',
                                    }}
                                    icon={<PlusOutlined />}
                                >
                                    Add Intents
                                </Button>

                                <Form.ErrorList errors={errors} />
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Form.Item>
                    <Button type="default" htmlType="submit" size='small'>
                        Save Intents
                    </Button>
                    <Button type="default" onClick={handleReset} size='small'>
                        Reset
                    </Button>
                </Form.Item>
            </Form>
            <Divider />

            <Form form={form} name="dynamic_form_nest_item" {...formItemLayoutWithOutLabel} onFinish={onFinishUtterance}  >
                {showSelect &&
                    <Form.Item
                        name="selectedIntent"
                        label="Intents"
                    rules={[
                        {
                            required: true,
                            message: 'Missing area',
                        },
                    ]}
                    >

                        <Select options={intentList} onChange={handleChange} style={{ width: '60%', }} />

                    </Form.Item>
                }
                {showSelect && showAddUtterance &&
                    <div>
                        <Form.List name="utterance">
                            {(utteranceFields, { add: addUtterance, remove: removeUtterance }) => (
                                <>
                                    {utteranceFields.map((field, index) => (
                                        <Form.Item
                                            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                            label={index === 0 ? 'Utterance' : ''}
                                            required={false}
                                            key={field.key}
                                        >
                                            <Form.Item
                                                {...field}
                                                validateTrigger={['onChange', 'onBlur']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        whitespace: true,
                                                        message: "Please input utterance or delete this field.",
                                                    },
                                                ]}
                                                noStyle
                                            >
                                                <Input
                                                    placeholder="utterance"
                                                    style={{
                                                        width: '60%',
                                                    }}
                                                />
                                            </Form.Item>
                                            {utteranceFields.length > 1 ? (
                                                <MinusCircleOutlined
                                                    className="dynamic-delete-button"
                                                    onClick={() => removeUtterance(field.name)}
                                                />
                                            ) : null}
                                        </Form.Item>
                                    ))}

                                    {showAddUtterance &&
                                        <div>
                                            <Form.Item>
                                                <Button type="dashed" onClick={() => addUtterance()} block icon={<PlusOutlined />} style={{
                                        width: '60%',
                                    }}
>
                                                    Add utterance
                                                </Button>
                                            </Form.Item>

                                            <Form.Item>
                                                <Button type="default" htmlType="submit" size='small'>
                                                    save utterance
                                                </Button>
                                            </Form.Item>
                                        </div>
                                    }
                                </>
                            )}
                        </Form.List>
                    </div>
                }
            </Form>
            <Button type="Primary" htmlType="submit" size='small'>
                Save
            </Button>
        </div>
    );
};
export default chatConfigure;