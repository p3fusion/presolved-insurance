import React, { useState } from 'react';
import { Layout } from 'antd';
import OnBoardSidebar from '../layout/siderbar';
import OnBoardHeader from '../layout/header';
import { Content } from 'antd/lib/layout/layout';
import OnBoardSteps from './steps/steps';


const OnBoardPage = () => {

  const [collapsed, setCollapsed] = useState(true);

  return (
    <Layout className='newdashboard'>
      <OnBoardSidebar collapsed={collapsed} />
      <Layout className="site-layout">
        <OnBoardHeader setCollapsed={setCollapsed} collapsed={collapsed} />
        <Content className="main" style={{ width:'95%',height:'100%', margin: '24px 16px 24px 16px', backgroundColor: '#fafafa', border:'1px dashed #e9e9e9', borderRadius: '2px'  }}>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              background: '#fff',
            }}
          >
            <OnBoardSteps/>
          </div>

        </Content>
      </Layout>
    </Layout>
  )
}

export default OnBoardPage