import React , {useEffect} from 'react';
import { Button, Layout, PageHeader } from 'antd';
import { PlusCircleOutlined, UserOutlined, PhoneOutlined } from '@ant-design/icons';
import { Link } from '@reach/router';
import  "amazon-connect-streams";

const { Content } = Layout;

const DashboardIndexPAge = () => {

    useEffect(() => {
        const container = document.getElementById("ccp");
        connect.core.initCCP(container, {
            ccpUrl: "https://p3fusion-uat.my.connect.aws/ccp-v2",
           
            loginPopup: true,
            loginPopupAutoClose: true,
            region: "us-east-1",
            softphone: {
                allowFramedSoftphone: true
            }
        });
    }, []);

    return (
        <Content className="dashboard">
            <PageHeader ghost={false} className="site-page-header" onBack={() => null}
                title="Dashboard" subTitle="Initiate a call" />


            {/* <section className='quick-links'>
                <div className='items'>
                    <Button type='dashed' size='large' icon={<PlusCircleOutlined />} />
                    <span className='text'>Add Data</span>
                </div>
                <Link to="/outbound-calls" style={{color:'#000'}}>
                    <div className='items'>

                        <Button type='dashed' size='large' icon={<PhoneOutlined />} />
                        <span className='text'>Outbound Call</span>

                    </div>
                </Link>
                <div className='items'>
                    <Button type='dashed' size='large' icon={<UserOutlined />} />
                    <span className='text'>Execute</span>
                </div>
            </section> */}
        </Content>
    )
}

export default DashboardIndexPAge