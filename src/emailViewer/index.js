import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { Layout, Typography } from "antd";
const { Header, Content, Footer } = Layout;
import "antd/dist/antd.less";
import "antd/lib/style/themes/default.less";
import { Amplify, Storage } from "aws-amplify";
import awsconfig from "../aws-exports";
//Amplify.configure(awsconfig);

const AgentLoginPage = () => {
  const [state, setState] = useState({
    messageBody: null,
  });

  const signedURL = async () => {
    let result = await Storage.get(
      "AAMkADU2NTAyNzRjLWM4NGItNDFiOC05YjI3LTZkMTE4ZmE1NmJhOQBGAAAAAACNmbfOVSBeSZLolS9HcGUgBwD8QPSHhHFzR7i-WdKSMMgBAAAAAAEMAAD8QPSHhHFzR7i-WdKSMMgBAAA0PfuPAAA=/message.html",
      { level: "public", download: true }
    );
    return result;
  };

  const getImageURL = async (imageName) => {
    if (imageName.indexOf("image002") > -1) {
      let result = await Storage.get(
        `AAMkADU2NTAyNzRjLWM4NGItNDFiOC05YjI3LTZkMTE4ZmE1NmJhOQBGAAAAAACNmbfOVSBeSZLolS9HcGUgBwD8QPSHhHFzR7i-WdKSMMgBAAAAAAEMAAD8QPSHhHFzR7i-WdKSMMgBAAA0PfuPAAA=/image002.png`,
        { level: "public" }
      );

      console.log("New Image Result", result);
      return result;
    } else {
      console.log("Image Result", imageName);
      return imageName;
    }
  };

  useEffect(() => {
    signedURL().then((result) => {
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
              setState({ messageBody: text });
            });
          });
          setState({ messageBody: text });
        }
        setState({ messageBody: text });
      });
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
          {state.messageBody && (
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
