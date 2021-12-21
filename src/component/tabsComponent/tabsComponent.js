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
import Sidebar from '../sidebar/sidebar';
import Header from '../header/header';
import FollowingCard from '../following/followingCard';
import Suggest from '../../assets/images/suggest.png'
import userIcon from '../../assets/images/option.png'
import { Link } from 'react-router-dom';
import { GetFollowers, GetFollowing } from '../../services/apiInteraction';
import { useHistory } from "react-router-dom";

function TabsComponent() {

    const { TabPane } = Tabs;

    const { Title, Text, Paragraph } = Typography;

    const [loader, setLoader] = useState(false)

    let history = useHistory();


    function callback(key) {
        console.log(key);

    }

    function handleMenuClick(e) {
        message.info('Click on menu item.');
        console.log('click', e);
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
        console.log(data)
    }

    function onClickView(data) {

        // console.log(data.followerDetail[0]._id)
        history.push({
            pathname: "/profile",
            state: data.followerDetail[0]._id
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

    const [getFollowing, setGetFollowing] = useState([])

    useEffect(async () => {

        try {
            setLoader(true)
            let resultHandle = await GetFollowers();

            if (resultHandle?.success == true) {

                setLoader(false)
                console.log(resultHandle?.message)
                setGetProfile(resultHandle?.message.followUser)

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
            let resultHandle = await GetFollowing();

            if (resultHandle?.success == true) {

                setLoader(false)
                setGetFollowing(resultHandle?.message?.followUser)

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





    return (
        <div>
            <Tabs animated tabPosition="top" centered defaultActiveKey="1" onChange={callback}>

                <TabPane tab={<Paragraph className="font-20">35 Followers</Paragraph>} key="1">
                    <Row>
                        {
                            getProfile.map((data) =>
                                <Col md={12}>
                                    <Card style={{ borderRadius: '30px', margin: '20px' }} className="gray-background ">
                                        <Row>
                                            <Col className="mobile-center" md={4} xs={24} >
                                                <Image style={{ maxWidth: '120px', maxHeight: '120px', width: '100px', height: '100px' }} preview={false} className="border-50 d-flex justify-content-center" src={data?.followerDetail[0]?.profilePicUrl ? data?.followerDetail[0]?.profilePicUrl : userIcon} />
                                            </Col>
                                            <Col style={{ alignSelf: 'center' }} md={12} xs={24}>
                                                <Row className="mobile-center" style={{ paddingLeft: '20px' }}>
                                                    <Title level={4} className="m-0">
                                                        {data?.followerDetail[0]?.firstName}
                                                    </Title>
                                                </Row>
                                                <Row className="mobile-center" style={{ paddingLeft: '20px' }}>
                                                    <Paragraph level={5}>
                                                        {data?.professionData[0]?.name}
                                                    </Paragraph>
                                                </Row>
                                            </Col>
                                            <Col className="mobile-center" style={{ alignSelf: 'center', display: 'flex', justifyContent: 'right' }} md={8} xs={24}>
                                                <Button onClick={() => onClickFollow(data)} className="follow-button">
                                                    Follow
                                                </Button>
                                                <Button onClick={() => onClickView(data)} className="follow-button">
                                                    View Profile
                                                </Button>
                                                {/* <Button className="unfollow-button">
                                            Remove
                                        </Button> */}
                                            </Col>
                                        </Row>
                                    </Card>
                                </Col>


                            )
                        }
                    </Row>



                </TabPane>

                <TabPane tab={<Paragraph className="font-20">35 Following</Paragraph>} key="2">
                    <Row>
                        {
                            getFollowing.map((data) =>
                                <Col md={12}>
                                    <Card style={{ borderRadius: '30px', margin: '20px' }} className="gray-background ">
                                        <Row>
                                            <Col className="mobile-center" md={4} xs={24} >
                                                <Image style={{ maxWidth: '120px', maxHeight: '120px', width: '100px', height: '100px' }} preview={false} className="border-50 d-flex justify-content-center" src={data?.profilePicUrl} />
                                            </Col>
                                            <Col style={{ alignSelf: 'center' }} md={12} xs={24}>
                                                <Row className="mobile-center" style={{ paddingLeft: '20px' }}>
                                                    <Title level={4} className="m-0">
                                                        {data?.firstName}
                                                    </Title>
                                                </Row>
                                                <Row className="mobile-center" style={{ paddingLeft: '20px' }}>
                                                    <Paragraph level={5}>
                                                        {data?.imOnProfile?.profession_data[0]?.name}
                                                    </Paragraph>
                                                </Row>
                                            </Col>
                                            <Col className="mobile-center" style={{ alignSelf: 'center', display: 'flex', justifyContent: 'right' }} md={8} xs={24}>
                                                <Button onClick={() => onClickFollow(data)} className="follow-button">
                                                    Follow
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Col>
                            )
                        }

                    </Row>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default TabsComponent
