import { Tabs, Card, Table, Drawer, Layout, Typography, Row, Col } from 'antd';
import React, { useState } from "react";
import { Link } from "@gatsbyjs/reach-router";
import { data } from "./data";
import { Storage } from 'aws-amplify'
import { useSelector } from 'react-redux';
import { LoadEmail } from '../../store/reducers/emails';
import { useDispatch } from 'react-redux';
import moment from 'moment-timezone';



const ChannelDetails = () => {

    const [tab, activeTab] = useState('voice')
    const [open, setOpen] = useState(false);
    const initialState = {
        selected: null,
        isLoaded: false,
        messageBody: null,
        details: {}

    }

    const dispatch = useDispatch()
    const emails = useSelector((state) => state.emails)

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
            render:(t)=><Link to={`/channel-Details/${t}`}>{t}</Link>
        },
        {
            title: 'AssignTo',
            dataIndex: 'assignTo',
            key: 'assignTo',
        },
        {
            title: 'ContactID',
            dataIndex: 'contactID',
            key: 'contactID',
        },
        {
            title: 'Number of tasks',
            dataIndex: 'tasks',
            key: 'tasks',

        },
        {
            title: 'CreatedAt',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render:(t)=>moment(t).format('MM/DD/YYYY HH:mm')
        },
        {
            title: 'UpdatedAt',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render:(t)=>moment(t).format('ll')
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
            title: 'ContactID',
            dataIndex: 'contactID',
            key: 'contactID',
        },
        {
            title: 'Number of tasks',
            dataIndex: 'tasks',
            key: 'tasks',
        },
        {
            title: 'CreatedAt',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'UpdatedAt',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
        },
    ];

    const grouped = _.groupBy(data.items, data => data.channelType);

    const onChange = (e) => {
        activeTab(e)
    };

    return (
        <>

            <Card
                title="Channels"
                extra={<Link to="/view-all">View all</Link>}
            >
                <Tabs
                    type="card"
                    defaultActiveKey="1"
                    activeKey={tab}
                    onChange={onChange}
                    style={{
                        background: "#fbfbfb",
                    }}
                    items={[
                        {
                            label: `Voice`,
                            key: 'voice',
                            children: <Card>
                                <Table
                                    size='large'
                                    borderRadius={10}
                                    columns={columns}
                                    dataSource={grouped.voice}
                                    scroll={{ x: 400, y: 250 }}
                                    rowKey="id"
                                    expandable={{
                                        expandedRowRender: (record) => (
                                            <p
                                                style={{
                                                    margin: 0,
                                                }}
                                            >
                                                {record.contactAttributes}
                                            </p>
                                        ),

                                    }}
                                />
                            </Card>
                        },
                        {
                            label: `Chat`,
                            key: 'chat',
                            children: <Card>
                                <Table
                                    rowKey="id"
                                    expandable={{
                                        expandedRowRender: (record) => <DynamicTable record={record} />,
                                        rowExpandable: (record) => record.id !== 'Not Expandable',
                                    }}
                                    size='large'
                                    borderRadius={10}
                                    columns={columns}
                                    dataSource={grouped.chat}
                                    scroll={{ x: 400, y: 250 }}
                                />
                            </Card>
                        },
                        {
                            label: `Email`,
                            key: 'email',
                            children: <Card>
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
                            </Card>
                        },
                    ]}
                />
            </Card>
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

export default ChannelDetails;


const DynamicTable = ({ record }) => {

    //task releated columns and data
    const { tasks } = record
    const column = Object.keys(tasks.items[0]);
    const columns = column.map((data) => {
        return {
            title: data,
            dataIndex: data,
            key: data,
        }
    })


   /*  const { contactAttributes } = record
    let attrib = JSON.parse(contactAttributes);
    const attribKeys = Object.keys(attrib);
    //contact Attributes releated data
    console.log({attrib, attribKeys }); */


    return (
        <section style={{ padding: '10px 20px', background: '#fff' }}>
            <Row>
                <Col span={18}>
                    <Typography.Title level={4}>Task Details</Typography.Title>
                    <Table columns={columns} dataSource={tasks.items} />
                </Col>
            </Row>
        </section>
    )
}