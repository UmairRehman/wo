import React, { useEffect, useState } from 'react'

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';

import { Layout, Spin, Row, notification } from 'antd';
import Selection from '../../component/selection/selection'

// import '.css'
import Sidebar from '../../component/sidebar/sidebar';
import Header from '../../component/header/header';
import './intrest.css'





function Intrest() {

    const { Content } = Layout;

 

    return (
        <div style={{ width: '100%' }} className="animation" >
           

            <div className="">
                <Header />
            </div>

            <div className="content">
                <Selection className="w-100" />
            </div>

        </div>
    )
}

export default Intrest
