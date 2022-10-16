import { Col, Divider, Row,Layout } from 'antd';
import React from 'react';
import vector1 from './assets/images/6308.jpg';
import vector2 from './assets/images/vector2.jpg';
const {  Content } = Layout;
const LandingContent = () => {
    return (
        <Content>
            <section className='site-content'>
                <Row gutter={[16, 16]}>
                    <Col span={14}>
                        <h2>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h2> <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p><p> It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

                        </p>
                    </Col>
                    <Col span={10}>
                        <img src={vector1} height={150} />
                    </Col>

                </Row>
                <Row gutter={[16, 16]} style={{ marginTop: 30 }}>
                    <Col span={24}><Divider /></Col>
                    <Col span={10}>

                        <img src={vector2} height={150} />
                    </Col>
                    <Col span={14}>
                        <h2>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h2> <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p><p> It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

                        </p>
                    </Col>

                </Row>

            </section>
        </Content>

    )
}

export default LandingContent