import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import OnBoardSidebar from '../layout/siderbar';
import OnBoardHeader from '../layout/header';
import { Content } from 'antd/lib/layout/layout';
import OnBoardSteps from './steps/steps';
import { useSelector } from 'react-redux';
import { navigate } from '@reach/router';

const OnBoardPage = () => {

  const user = useSelector((state) => state.user)
  
  useEffect(() => {
    if(!user.AppAuth.isLoggedin)
    {
      navigate("/signup")
    }
  }, []);

  const [collapsed, setCollapsed] = useState(true);

  return (
    <Layout className='newdashboard'>
      <OnBoardSidebar collapsed={collapsed} />
      <Layout className="site-layout">
        <OnBoardHeader setCollapsed={setCollapsed} collapsed={collapsed} />
        <Content className="main" style={{ margin: '24px 16px 24px 16px' }}>
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