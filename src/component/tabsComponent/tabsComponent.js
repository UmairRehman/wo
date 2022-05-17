import React, { useEffect, useState, useRef } from 'react'

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';

import { Layout, Image, Row, Col, Typography, Card, Button, Tabs, Spin, notification, Menu, message } from 'antd';
import SuggestIcon from '../../assets/images/suggest.png'
import Sidebar from '../sidebar/sidebar';
import Header from '../header/header';
import FollowingCard from '../following/followingCard';
import Suggest from '../../assets/images/suggest.png'
import userIcon from '../../assets/images/option.png'
import { Link } from 'react-router-dom';
import { GetFollowers, GetFollowing, GetProfile } from '../../services/apiInteraction';
import { useHistory } from "react-router-dom";
import DefaultImage from '../../assets/images/default.png'

function TabsComponent() {

    const { TabPane } = Tabs;

    const { Title, Text, Paragraph } = Typography;

    const [loader, setLoader] = useState(false)

    const [activeKey, setActiveKey] = useState()

    let history = useHistory();


    function callback(key) {
        setActiveKey(key)

    }

    function handleMenuClick(e) {
        message.info('Click on menu item.');
    }




    const optionDropDown = (
        <Menu className="notification-dropdown" onClick={handleMenuClick}>
            <Menu.Item key="1">
                <Paragraph style={{ marginBottom: '0px' }}>Receive On Notifications </Paragraph>
                <Paragraph className="fade-text">Start receiving notifications when this person is ON</Paragraph>
            </Menu.Item>
            <Menu.Item key="2">
                <Paragraph style={{ marginBottom: '0px' }}>Receive Off Notifications </Paragraph>
                <Paragraph className="fade-text">Stop receiving notifications  when this person is Off</Paragraph>
            </Menu.Item>
            <Menu.Item key="3">
                <Paragraph style={{ marginBottom: '10px' }}>Receive Both On/Off notifications</Paragraph>
            </Menu.Item>
            <Menu.Item key="4">
                <Paragraph style={{ marginBottom: '0px' }}>Turn Off all notifications for this person</Paragraph>
            </Menu.Item>
        </Menu>
    );


    function onClickFollow(data) {
        // console.log(data)
    }

    const onClickView = (data) => {
        history.push({
            pathname: `/profile/${data?.followerDetail[0]?.username}`,
            state: data?.follower
        });
    }


    function onClickFollowing(data) {
        history.push({
            pathname: `/profile/${data?.followeeDetail[0]?.username}`,
            state: data?.followee
        });

    }

    const validateMessages = (data) => {
        const args = {
            message: 'Error',
            description:
                `${data?.message}`,
            duration: 5,
        };
        notification.error(args);
    };


    const [getProfile, setGetProfile] = useState([])

    const [followData, setFollowData] = useState({
        follower: 0,
        following: 0,
    })

    const [getFollowing, setGetFollowing] = useState([])

    const [componentLoader, setComponentLoader] = useState(false)

    const scroolValue = useRef(0)

    const [offSet, setOffSet] = useState(0)

    const [offSetFollowing, setOffSetFollowing] = useState(0)

    window.addEventListener("scroll", myScript);

    function myScript() {

        var scrollY = window.pageYOffset || document.documentElement.scrollTop;

        if (window.innerHeight + document.documentElement.scrollTop === document.scrollingElement.scrollHeight) {
            setOffSet(offSet + 1)
            setOffSetFollowing(offSetFollowing + 1)

        }

    }

    useEffect(async () => {
        try {
            setLoader(true)
            let resultHandle = await GetProfile();

            if (resultHandle?.success == true) {

                setLoader(false)
                setFollowData(resultHandle?.message?.foundUser[0])
            }

            else {
                validateMessages(resultHandle);
                setLoader(false)
            }

        }
        catch (err) {
            console.log(err)
        }
    }, [])
    

    useEffect(async () => {

        try {
            setLoader(true)
            setComponentLoader(true)
            let resultHandle = await GetFollowers(offSet);

            if (resultHandle?.success == true) {

                setLoader(false)
                setComponentLoader(false)
                setGetProfile([...getProfile, ...resultHandle?.message.followUser])

            }

            else {
                validateMessages(resultHandle);
                setLoader(false)
                setComponentLoader(false)
            }

        }
        catch (err) {
            console.log(err)
        }


    }, [offSet])




    useEffect(async () => {

        try {
            setLoader(true)
            setComponentLoader(true)
            let resultHandle = await GetFollowing();

            if (resultHandle?.success == true) {

                setLoader(false)
                setComponentLoader(false)
                setGetFollowing(resultHandle?.message?.followUser)

            }

            else {
                validateMessages(resultHandle);
                setLoader(false)
                setComponentLoader(false)
            }

        }
        catch (err) {
            console.log(err)
        }

    }, [offSetFollowing])





    return (
        <div>
            <Tabs animated tabPosition="top" centered defaultActiveKey="1" onChange={callback} className='mt-5'>

                <TabPane tab={
                    <Paragraph className="font-20">
                        {followData?.follower + " "}Followers

                    </Paragraph>} key="1">
                    <Row>
                        {getProfile.map((data) =>
                            <Col md={12}>
                                <Card style={{ borderRadius: '30px', margin: '20px' }} className="gray-background ">
                                    <Row>
                                        <Col className="mobile-center" style={{  display: "flex" , alignItems: "end" }} md={5} xs={24} >
                                            <Image style={{ maxWidth: '100px', maxHeight: '100px', width: '80px', height: '80px' , zIndex: "1" }} preview={false} className="border-50 d-flex justify-content-center" src={data?.followerDetail[0]?.profilePicUrl || DefaultImage} />
                                            <div style={{width: "15px" , height: "15px" , borderRadius: "50%" , background: `${data?.followerDetail[0]?.imOnProfile?.On ? 'green' : 'rgb(255, 0, 0)'}` , marginLeft: "-25px" , zIndex: "2"}}></div>
                                        </Col>
                                        <Col style={{ alignSelf: 'center' }} md={11} xs={24}>
                                            <Row className="mobile-center" style={{ paddingLeft: '20px' }}>
                                                <Title level={4} className="m-0">
                                                    {data?.followerDetail[0]?.firstName + " " + data?.followerDetail[0]?.lastName}
                                                </Title>
                                            </Row>
                                            <Row className="mobile-center" style={{ paddingLeft: '20px' }}>
                                                <Paragraph level={5}>
                                                    {data?.professionData[0]?.name}
                                                </Paragraph>
                                            </Row>
                                        </Col>
                                        <Col className="mobile-center" style={{ alignSelf: 'center', display: 'flex', justifyContent: 'right' }} md={8} xs={24}>
                                            <Button onClick={(e) => onClickView(data)} className="follow-button">
                                                View Profile
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        )
                        }
                        <Row
                            style={{
                                justifyContent: 'center', alignItems: 'center', width: '100%',
                                display: componentLoader == true ? null : 'none'
                            }}
                            className='component-loader j-c-c' >

                            <Spin className='j-c-c' spinning={true} size="large" />

                        </Row>
                    </Row>




                </TabPane>


                <TabPane tab={<Paragraph className="font-20">{followData?.following + " "} Following</Paragraph>} key="2">
                    <Row>
                        {
                            getFollowing.map((data) =>
                                <Col md={12}>
                                    <Card style={{ borderRadius: '30px', margin: '20px' }} className="gray-background ">
                                        <Row>
                                            <Col className="mobile-center" style={{  display: "flex" , alignItems: "end" }} md={5} xs={24} >
                                                <Image style={{ maxWidth: '120px', maxHeight: '120px', width: '100px', height: '100px' }} preview={false} className="border-50 d-flex justify-content-center" src={data?.followeeDetail[0].profilePicUrl} />
                                                <div style={{width: "15px" , height: "15px" , borderRadius: "50%" , background: `${data?.followeeDetail[0]?.imOnProfile?.On ? 'green' : 'rgb(255, 0, 0)'}` , marginLeft: "-25px" , zIndex: "2"}}></div>
                                            </Col>
                                            <Col style={{ alignSelf: 'center' }} md={11} xs={24}>
                                                <Row className="mobile-center" style={{ paddingLeft: '20px' }}>
                                                    <Title level={4} className="m-0">
                                                        {data?.followeeDetail[0]?.firstName + ' ' + data?.followeeDetail[0]?.lastName}
                                                    </Title>
                                                </Row>
                                                <Row className="mobile-center" style={{ paddingLeft: '20px' }}>
                                                    <Paragraph level={5}>
                                                        {data?.professionData[0]?.name}
                                                    </Paragraph>
                                                </Row>
                                            </Col>
                                            <Col className="mobile-center" style={{ alignSelf: 'center', display: 'flex', justifyContent: 'right' }} md={8} xs={24}>
                                                <Button onClick={() => onClickFollowing(data)} className="follow-button">
                                                    View Profile
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Col>
                            )
                        }
                        <Row
                            style={{
                                justifyContent: 'center', alignItems: 'center', width: '100%',
                                display: componentLoader == true ? null : 'none'
                            }}
                            className='component-loader j-c-c' >

                            <Spin className='j-c-c' spinning={true} size="large" />

                        </Row>
                    </Row>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default TabsComponent
