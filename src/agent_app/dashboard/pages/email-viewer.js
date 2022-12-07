import React, { useEffect, useRef, useState } from 'react';

import { Layout, PageHeader, Button, Form, Input, Row, Col, Card, Table, Modal, Spin, List, Avatar } from 'antd';
import { PlusCircleOutlined, UserOutlined, PhoneOutlined, MinusCircleOutlined } from '@ant-design/icons';
import '../assets/style/outbound.less'
import { Link } from '@gatsbyjs/reach-router';
const { Content } = Layout;
import { API, Auth, Storage } from 'aws-amplify'
import CSVReader from 'react-csv-reader'
import { useSelector } from 'react-redux';



const EmailViewer = () => {
    const emails = useSelector((state) => state.emails)
    const inputFile = useRef(null)
    const [form] = Form.useForm();
    const initialState = {
        selected: null,
        isLoaded: false,
        messageBody:null,
        details: {}

    }

    useEffect(() => {
        if (emails.isLoaded) {
            setState({ ...state, isLoaded: true })
        }

    }, [emails])

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
        let id = item.messageID;     

        signedURL(id).then((result) => {
            console.log({ result });
            result.Body.text().then((text) => {
                //Replace Image

                //reg ex expression to get the src of image
                let regex = /src="([^"]*)"/g;

                // Replace cid:image in the email body with the actual image URL
                let cidImage = text.match(regex);
                if (cidImage) {
                    cidImage.forEach((image) => {
                        console.log("Cid", image);
                        if (image.indexOf("https:") > -1) {
                            return;
                        }
                        getImageURL(image).then((newSrc) => {
                            console.log("New Src", newSrc);
                            let newImage = `src="${newSrc}"`;
                            text = text.replace(image, newImage);
                            setState({
                                ...state,
                                selected: item.messageID,                             
                                messageBody: text
                            });
                        });
                    });
                   
                }
                setState({
                    ...state,
                    selected: item.messageID,                
                    messageBody: text
                });
            });
        });

    }

    const [state, setState] = useState({ ...initialState })


    return (
        <Content className="email-viewer">
            <PageHeader ghost={false} className="site-page-header" onBack={() => null} title="E-Mail viewer" subTitle="email channels" />

            <Row gutter={[16, 16]}>
                <Col span={8} >
                    <Card style={{ minHeight: '100vh' }}>
                        {
                            state.isLoaded ?
                                emails.data.length &&
                                <List
                                    itemLayout="horizontal"
                                    dataSource={emails.data}
                                    renderItem={(item) => (
                                        <List.Item onClick={(e) => getMail(item)} style={{ cursor: 'pointer', backgroundColor: state.selected == item.messageID ? '#f5f5f5' : '#fff' }}>
                                            <List.Item.Meta
                                                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                                title={item.from}
                                                description={item.subject}
                                            />
                                        </List.Item>
                                    )}
                                />
                                :
                                <Spin size='large' />
                        }
                    </Card>
                </Col>
                <Col span={16}>
                    <Card style={{ minHeight: '100vh' }}>
                        {
                            state.selected != null &&
                            <div>
                                <iframe
                                    srcDoc={state.messageBody}
                                    style={{
                                        width: "100%",
                                        height: "600px",
                                        pointerEvents: "all",
                                    }}
                                />
                            </div>
                        }
                    </Card>
                </Col>

            </Row>

        </Content>
    )
}

export default EmailViewer

