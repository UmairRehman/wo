import React from 'react'

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';

import { Layout, Menu, Row } from 'antd';

import './dashboard.css'
import Sidebar from '../../component/sidebar/sidebar';
import Header from '../../component/header/header';

function Dashboard() {
    
    const { Content } = Layout;

    return (
        <div>
            <div className="test">
                <Header />
            </div>

            <div className="content">
                aksjbakjsaskaska sk a
            </div>
        
        </div>
    )
}

export default Dashboard
