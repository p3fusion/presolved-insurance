import React, { useEffect, useState } from 'react'

import ils5 from '../assets/images/illustrations/signup-3.svg'
import ils4 from '../assets/images/illustrations/signup-4.svg'
import logo from '../assets/images/logo-white.png';
import { Layout, Typography, Space, Avatar, Card, Divider, Button } from 'antd';
import { VscUnlock } from "react-icons/vsc";
import { RxPerson } from 'react-icons/rx';
import { Auth, Hub } from "aws-amplify";
import awsConfig from "../../aws-exports";
import Amplify from "aws-amplify";

import '../assets/style/login.less'
import { useDispatch } from 'react-redux';
import { updateUser } from '../store/reducers/user';
import { navigate } from '@gatsbyjs/reach-router';

const isLocalhost = Boolean(
    window.location.hostname === "localhost" ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === "[::1]" ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

const [localRedirectSignIn, productionRedirectSignIn] = awsConfig.oauth.redirectSignIn.split(",");
const [localRedirectSignOut, productionRedirectSignOut] = awsConfig.oauth.redirectSignOut.split(",");

const updatedAwsConfig = {
    ...awsConfig,
    oauth: {

        ...awsConfig.oauth,
        redirectSignIn: isLocalhost
            ? localRedirectSignIn
            : productionRedirectSignIn,
        redirectSignOut: isLocalhost
            ? localRedirectSignOut
            : productionRedirectSignOut,
        client_id: "2ok5ldhlif665l6bilqlk8dhpv",
    },
};
Amplify.configure(updatedAwsConfig);

const AgentSAMLPage = () => {

    const dispatch = useDispatch()
    const [state, setState] = useState({
        isLoggedin: false,
        user: null,
    });

    useEffect(() => {
        Auth.currentAuthenticatedUser()
            .then((login) => {
                setState({ ...state, isLoggedin: true });
                const loginData = login?.attributes;
                dispatch(updateUser({ ...login }));
                navigate("/");
            })
            .catch((err) => {
                console.log("Error is ", err);
            });
    }, [state.isLoggedin]);

    Hub.listen("auth", (data) => {
        const event = data.payload.event;
        if (event === "signIn") {
            setState({ ...state, isLoggedin: true });
        }
    });


    return (


        <Layout className='signup-page'>
            <main className='login-container' style={{ background: `url(${ils5})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right', backgroundSize: '24% 54%' }}>
                <section className='sidebar'>
                    <div className='sidebar-container'>
                        <div className='logo-container'>
                            <img src={logo} height={150} />
                        </div>
                        <div className='footer'>
                            <img src={ils4} />
                        </div>
                    </div>
                </section>

                <section className='main'>
                    <div className='main-container'>
                        <Card>
                            <div className='userinfo'>
                                <Space size={10}>
                                    <Avatar icon={<RxPerson />} size={50} />
                                    <Space direction='vertical' size={0} align="start">
                                        <Typography.Title level={4}>Hi guest</Typography.Title>
                                        <Typography.Text>Welcome to Connect Portal</Typography.Text>

                                    </Space>
                                </Space>
                            </div>
                            <div>
                                <Divider />
                                <Typography.Title level={5}>Authentication is required to access the portal</Typography.Title>
                                <Typography.Paragraph>
                                    Single sign-on (SSO) is an authentication method that enables users to securely authenticate with multiple applications and websites by using just one set of credentials.
                                </Typography.Paragraph>
                                <Divider />
                            </div>

                            <div>
                                <Button icon={<VscUnlock size={16} />} type='primary' block size='large' shape='round'

                                    onClick={() =>
                                        Auth.federatedSignIn({
                                            provider: "CognitoSAML",
                                        }).catch((error) => {
                                            console.error({ error });
                                        })
                                    }

                                > &nbsp; Login With SSO</Button>
                            </div>
                        </Card>

                    </div>
                </section>

            </main>

        </Layout>
    )
}

export default AgentSAMLPage