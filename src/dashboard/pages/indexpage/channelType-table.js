import { Tabs, Card, Table, Drawer, Layout, Typography, Row, Col } from 'antd';
import React, { useState } from "react";
import { Link } from "@gatsbyjs/reach-router";
import { Storage } from 'aws-amplify'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import moment from 'moment-timezone';
import { LoadEmail } from '../../store/reducers/emails';



const ChannelTypeTable = (props) => {

    const channel = useSelector((state) => state.channels)
    let grouped = _.groupBy(channel.data?.listChannels?.items, data => data?.channelType);
    const [open, setOpen] = useState(false);
    const initialState = {
        selected: null,
        isLoaded: false,
        messageBody: null,
        details: {}

    }
    const dispatch = useDispatch()
    const emails = useSelector((state) => state.emails)

    if (channel.isLoaded) {
        if ('voice' in grouped) {
            grouped.voice = grouped.voice.map((item) => {
                return { ...item, "noOfTasks": Object.keys(item.tasks.items).length };
            })
        }
        if ('email' in grouped) {
            grouped.email = grouped.email.map((item) => {
                return { ...item, "noOfTasks": Object.keys(item.tasks.items).length };
            })
        }

        if ('chat' in grouped) {
            grouped.chat = grouped.chat.map((item) => {
                return { ...item, "noOfTasks": Object.keys(item.tasks.items).length };
            })
        }
    }

    const signedURL = async (id) => {
        let result = await Storage.get(
            `${id}/message.html`,
            { level: "public", download: true }
        );
        return result;
    };
    const getImageURL = async (imageName) => {
        if (imageName.indexOf("image002") > -1) {
            let result = await Storage.get(
                `${state.selected}/image002.png`,
                { level: "public" }
            );
            return result;
        } else {
            return imageName;
        }
    };

    const getMail = (item) => {
        console.clear()
        console.log(item)
        if (emails.body[item.contactID]) {
            setState({
                ...state,
                selected: item.contactID,
                messageBody: emails.body[item.contactID]
            });
        }
        else {
            signedURL(item.contactID).then((result) => {
                result.Body.text().then((text) => {
                    let regex = /src="([^"]*)"/g;
                    let cidImage = text.match(regex);
                    if (cidImage) {
                        cidImage.forEach((image) => {
                            if (image.indexOf("https:") > -1) {
                                return;
                            }
                            getImageURL(image).then((newSrc) => {
                                let newImage = `src="${newSrc}"`;
                                text = text.replace(image, newImage);
                                setState({
                                    ...state,
                                    selected: item.contactID,
                                    messageBody: text
                                });
                                dispatch(LoadEmail({ id: item.contactID, body: text }))
                            });
                        });
                    }

                    setState({
                        ...state,
                        selected: item.contactID,
                        messageBody: text
                    });
                    dispatch(LoadEmail({ id: item.contactID, body: text }))

                });
            });
        }

    }

    const [state, setState] = useState({ ...initialState })


    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };


    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            render: (a, b, c) => <Link to={`/details/`} state={{ channel: b }} channel={b} >{a}</Link>
        },
        {
            title: 'AssignTo',
            dataIndex: 'assignTo',
            key: 'assignTo',
        },
        {
            title: 'Number of tasks',
            dataIndex: 'noOfTasks',
            key: 'noOfTasks',
        },
        {
            title: 'CreatedAt',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (t) => moment(t).format('MM/DD/YYYY HH:mm')
        },
        {
            title: 'UpdatedAt',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (t) => moment(t).format('MM/DD/YYYY HH:mm')
        },
    ];

    const columns_email = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'AssignTo',
            dataIndex: 'assignTo',
            key: 'assignTo',
        },
        {
            title: 'Number of tasks',
            dataIndex: 'noOfTasks',
            key: 'noOfTasks',

        },
        {
            title: 'CreatedAt',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (t) => moment(t).format('MM/DD/YYYY HH:mm')
        },
        {
            title: 'UpdatedAt',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (t) => moment(t).format('MM/DD/YYYY HH:mm')
        },
    ];

    return (
        <>
            <Tabs

                defaultActiveKey="1"
                items={[
                    {
                        label: <Typography.Title level={5} style={{ paddingLeft: '1px' }}>Voice</Typography.Title>,
                        key: 'voice',
                        children:
                            <Table
                                size='large'
                                borderRadius={10}
                                columns={columns}
                                dataSource={grouped.voice}
                                scroll={{ x: 400, y: 250 }}
                            />

                    },
                    {
                        label: <Typography.Title level={5} style={{ paddingLeft: '1px' }}>Chat</Typography.Title>,
                        key: 'chat',
                        children:
                            <Table
                                size='large'
                                borderRadius={10}
                                columns={columns}
                                dataSource={grouped.chat}
                                scroll={{ x: 400, y: 250 }}
                            />

                    },
                    {
                        label: <Typography.Title level={5} style={{ paddingLeft: '1px' }}>Email</Typography.Title>,
                        key: 'email',
                        children:
                            <Table
                                size='large'
                                borderRadius={10}
                                columns={columns_email}
                                dataSource={grouped.email}
                                scroll={{ x: 400, y: 250 }}
                                onRow={(record, rowIndex) => {
                                    return {
                                        onClick: event => {
                                            getMail(record),
                                                showDrawer()
                                        },
                                    };
                                }}
                            />

                    },
                ]}
            />
            <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={open} width="50%" >
                <Card style={{ minHeight: '100vh' }}>
                    {
                        state.selected != null &&
                        <div>
                            <iframe
                                srcDoc={state.messageBody}
                                style={{
                                    width: "100%",
                                    height: "100vh",
                                    pointerEvents: "all",
                                }}
                            />
                        </div>
                    }
                </Card>
            </Drawer>
        </>
    );
}
export default ChannelTypeTable;