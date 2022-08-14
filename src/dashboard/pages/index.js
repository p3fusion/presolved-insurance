import React from 'react';
import { Button, Layout, PageHeader } from 'antd';
import { PlusCircleOutlined, UserOutlined, PhoneOutlined } from '@ant-design/icons';
import { Link } from '@reach/router';


const { Content } = Layout;

const DashboardIndexPAge = () => {
    return (
        <Content className="dashboard">
            <PageHeader ghost={false} className="site-page-header" onBack={() => null}
                title="Dashboard" subTitle="Initiate a call" />

            <section className='quick-links'>
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
            </section>
        </Content>
    )
}

export default DashboardIndexPAge