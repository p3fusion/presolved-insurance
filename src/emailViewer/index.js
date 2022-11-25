import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { Layout, Typography } from "antd";
const { Header, Content, Footer } = Layout;
import "antd/dist/antd.less";
import "antd/lib/style/themes/default.less";
import { Amplify, Storage } from "aws-amplify";
import awsconfig from "../aws-exports";
Amplify.configure(awsconfig);

const AgentLoginPage = () => {
  const [state, setState] = useState({
    messageURL: null,
  });

  const signedURL = async () => {
    let result = await Storage.get(
      "AAMkADU2NTAyNzRjLWM4NGItNDFiOC05YjI3LTZkMTE4ZmE1NmJhOQBGAAAAAACNmbfOVSBeSZLolS9HcGUgBwD8QPSHhHFzR7i-WdKSMMgBAAAAAAEMAAD8QPSHhHFzR7i-WdKSMMgBAAAeph2tAAA=/",
      { expires: 60 }
    );
    return result;
  };

  signedURL().then((result) => {
    console.log(result);
  });

  console.log("signedURL", signedURL);

  useEffect(() => {
    signedURL().then((result) => {
      setState({ messageURL: result });
    });
  }, []);

  //Simple Page
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <div className="site-layout-content">
          <Typography.Title level={2}>Agent Login</Typography.Title>
          {state.messageURL && (
            <div>
              <iframe src={state.messageURL} width="100%" height="1000px" />
            </div>
          )}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Presolved ©2021 Created by Presolved
      </Footer>
    </Layout>
  );
};

export default AgentLoginPage;
