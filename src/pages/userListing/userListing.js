import React, { useEffect, useState } from 'react'

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';

import { Layout, Image, Row, Col, Typography, Card, Button, Tabs, Dropdown, notification, Menu, message } from 'antd';
import SuggestIcon from '../../assets/images/suggest.png'
import Sidebar from '../../component/sidebar/sidebar';
import Header from '../../component/header/header';
import FollowingCard from '../../component/following/followingCard';
import Suggest from '../../assets/images/suggest.png'
import userIcon from '../../assets/images/option.png'
import { Link } from 'react-router-dom';
import './userListing.css'
import { GetFollowers, GetFollowing } from '../../services/apiInteraction';
import { useHistory } from "react-router-dom";
import TabsComponent from '../../component/tabsComponent/tabsComponent'


const { Title, Text, Paragraph } = Typography;



const validateMessages = (data) => {
    const args = {
        message: 'Error',
        description:
            `${data?.message}`,
        duration: 5,
    };
    notification.error(args);
};



function UserListing() {

    const { Content } = Layout;

    const [loader, setLoader] = useState(false)

    const [getProfile, setGetProfile] = useState([])

    const [getFollowing, setGetFollowing] = useState([])




    return (
        <div className="animation2 ">
            <div className="test">
                <Header />
            </div>

            <div style={{ paddingLeft: '5%', paddingRight: '5%' }} className="content ant-page- ">

                <TabsComponent />

            </div>

        </div>
    )
}

export default UserListing
