import React from 'react'

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';

import { Layout, Menu, Row, Typography } from 'antd';

import Sidebar from '../../component/sidebar/sidebar';
import Header from '../../component/header/header';
import FollowingCard from '../../component/following/followingCard';

function Following() {

    const { Content } = Layout;
    const { Title, Text, Paragraph } = Typography;

    return (
        <div className="animation2 ">
            <div className="test">
                <Header />
            </div>

            <div style={{ paddingLeft: '5%', paddingRight: '5%' }} className="content ant-page- ">
                <Title level={3}>Following</Title>
                <div>
                    <FollowingCard />
                </div>
            </div>

        </div>
    )
}

export default Following
