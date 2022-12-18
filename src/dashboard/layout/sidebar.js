
import { RxTextAlignLeft, RxDashboard,RxBackpack } from "react-icons/rx";
import { SlEnvolopeLetter, SlEnvolope } from "react-icons/sl";

import {Link} from '@gatsbyjs/reach-router'

import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
const { Sider } = Layout;

const DashboardPrimarySidebar = () => {
    const items1 = ['1', '2', '3'].map((key) => ({
        key,
        label: `nav ${key}`,
    }));
    const [collapse, setCollapse] = useState(true)
    return (
        <Sider 
            collapsed={collapse} 
            trigger={null} 
            width={200} 
            collapsible 
            theme='dark' 
            collapsedWidth={100}   
            onMouseEnter={()=>setCollapse(!collapse)}
            onMouseLeave={()=>setCollapse(!collapse)}
            >
            <div className={collapse ? 'menu-items-closed' : 'menu-items-expanded'}>
                <ul>
                    <li>
                        <Link to='/'><RxTextAlignLeft  size={20}  /><span>Navigations</span></Link>
                    </li>
                    <li>
                        <Link to='/'><RxDashboard  size={20}  /><span>Dashboard</span></Link>
                    </li>
                    <li>
                        <Link to='/channels'><RxBackpack  size={20}  /><span>Interactions</span></Link>
                    </li>
                    <li>
                        <Link to='/channels'><SlEnvolopeLetter  size={20}  /><span>Reports</span></Link>
                    </li>
                    <li>
                        <Link to='/channels'><SlEnvolope  size={20}  /><span>Email</span></Link>
                    </li>
                </ul>
            </div>
            
        </Sider>
    )
}

export default DashboardPrimarySidebar