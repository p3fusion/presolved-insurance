import React from 'react'
import { Auth, Hub } from "aws-amplify";
import { Authenticator, Button, Flex, Heading, ThemeProvider, View } from '@aws-amplify/ui-react';
import logo from '../assets/images/logo.png'
import '@aws-amplify/ui-react/styles.css';
import '../assets/style/index.less'
const OnboardClientSignupPage = () => {
    return (
        <section className="client-signuppage">
            <div className='container'>
                <div className='logo'>
                    <img src={logo} height={50} />
                </div>
                <div className='cognito'>
                    <Authenticator >
                        {({ signOut }) => (
                            <main>
                                <Heading level={2}>Please wailt while we load the page . . .</Heading>
                                <Button onClick={signOut} isFullWidth={true} variation="primary" size="large" loadingText="">Sign out</Button>
                            </main>
                        )}
                    </Authenticator>
                </div>
            </div>
        </section>
    )
}

export default OnboardClientSignupPage