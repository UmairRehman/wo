import React, { useEffect, useState } from 'react'

import {
    DownOutlined,
    CheckOutlined
} from '@ant-design/icons';

import { Layout, Dropdown, Image, Row, Col, Typography, notification, Button, Menu, Spin, message, Form, Input } from 'antd';
import SuggestIcon from '../../assets/images/suggest.png'
import Header from '../../component/header/header';
import { Link, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import Option from '../../assets/images/option.png'
import Bell from '../../assets/images/bell.jpg'
import Line from '../../assets/images/line.png'
import { checkFollow, GetProfileByID, StatusChange, unFollow } from '../../services/apiInteraction';
import Services from '../../component/services/services';
import { FollowReqest } from '../../services/apiInteraction';
import DefaultImage from '../../assets/images/default.png'
import { statusConstant } from '../../constant/status'
import { useParams } from "react-router-dom";
import CoverImage from '../../assets/images/coverImage.png'

import './profile.css'


const {
    REQUEST,
    ACCEPT,
    REJECT,
    UNFOLLOW,
    BLOCK
} = statusConstant;

const validateMessages = (data) => {
    const args = {
        message: 'Error',
        description:
            `${data?.message}`,
        duration: 5,
    };
    notification.error(args);
};


const validateMessagesFollow = (data) => {
    const args = {
        message: 'Notification',
        description:
            `${data}`,
        duration: 5,
    };
    notification.success(args);
};


function Profile() {

    const { Content } = Layout;

    const { Title, Text, Paragraph } = Typography;

    const location = useLocation();

    const Swal = require('sweetalert2')

    const params = useParams();

    let id = location?.state

    const [loader, setLoader] = useState(false)

    const [profile, setProfile] = useState([])

    const [isFollow, setIsFollow] = useState(false)

    const [reload, setReload] = useState(false)

    const [followStatus, setFollowStatus] = useState(0)

    const [authenticate, setAuthenticate] = useState(false)

    const [currentUser, setCurrentUser] = useState();

    const [searchedUser, setSearchedUser] = useState();

    

    function handleMenuClick(e) {

        message.info('Click on menu item.');
        console.log('click', e);

    }


    const onFinish = async (values: any) => {

        console.log(profile._id)
        let data = {
            "followee": profile._id,
            "message": values.message ? values.message : "",
        }

        try {
            setLoader(true)
            let resultHandle = await FollowReqest(data);

            if (resultHandle?.success == true) {

                validateMessagesFollow("Request Successfully Sent!");
                setReload(!reload)
                setLoader(false)

            }

            else {
                validateMessages(resultHandle);
                setLoader(false)
                setReload(!reload)
            }

        }
        catch (err) {
            console.log(err)
        }

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    function handleStatus(e) {
        if (e.key == 1) {
            Swal.fire({
                title: 'Are you sure?',
                text: "Do you want to unfollow?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#27B824',
                cancelButtonColor: '#27B824',
                confirmButtonText: 'Yes!'
            }).then(async (result) => {
                if (result.isConfirmed) {

                    let data = {
                        followee: profile._id
                    }
                    try {

                        setLoader(true)
                        let resultHandle = await unFollow(data);

                        if (resultHandle?.success == true) {

                            setLoader(false)
                            setReload(!reload)
                            // setProfile(resultHandle?.message.foundUser[0])
                        }

                        else {
                            validateMessages(resultHandle);
                            setLoader(false)
                        }

                    }
                    catch (err) {
                        console.log(err)
                    }
                }
            })
        }
        else {
            Swal.fire({
                title: 'Are you sure?',
                text: "Do you want to Block This Person?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#27B824',
                cancelButtonColor: '#27B824',
                confirmButtonText: 'Yes!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    console.log(profile)
                    let data = {
                        followee: profile._id,
                        status: 5
                    }

                    try {

                        setLoader(true)
                        let resultHandle = await StatusChange(data);

                        if (resultHandle?.success == true) {

                            setLoader(false)
                            setReload(!reload)
                        }

                        else {
                            validateMessages(resultHandle);
                            setLoader(false)
                        }

                    }
                    catch (err) {
                        console.log(err)
                    }



                }
            })
        }
    }

    const followingDropdown = (
        <Menu className="notification-dropdown"
            onClick={handleStatus}
        >
            <Menu.Item key="1">
                <Paragraph style={{ marginBottom: '10px' }}>Unfollow</Paragraph>
            </Menu.Item>

            <Menu.Item key="2">
                <Paragraph style={{ marginBottom: '0px' }} >Block</Paragraph>
            </Menu.Item>

        </Menu>
    );


    const shareDropdowm = (
        <Menu className="notification-dropdown" >
            {/* <Menu.Item key="1">
                <Paragraph style={{ marginBottom: '10px' }}>Share profile via message</Paragraph>
            </Menu.Item> */}
            <Menu.Item onClick={() => { navigator.clipboard.writeText(window.location.href); message.info('Copy to clipboard'); }} key="2">
                <Paragraph style={{ marginBottom: '0px' }}>Copy Profile URL</Paragraph>
            </Menu.Item>
        </Menu>
    );


    const menu = (
        <Menu className="notification-dropdown" onClick={handleMenuClick}>
            <Menu.Item key="1">
                <Paragraph style={{ marginBottom: '0px' }}>Delete</Paragraph>
                <Paragraph className="fade-text">Delete this notification</Paragraph>
            </Menu.Item>
            <Menu.Item key="2">
                <Paragraph style={{ marginBottom: '0px' }}>Stop only this alert</Paragraph>
                <Paragraph className="fade-text">Remove from my alerts</Paragraph>
            </Menu.Item>
            <Menu.Item key="3">
                <Paragraph style={{ marginBottom: '0px' }}>Turn off</Paragraph>
                <Paragraph className="fade-text">Stop receiving notifications like this</Paragraph>
            </Menu.Item>
        </Menu>
    );

    const profileBellIcon = (
        <Menu className="notification-dropdown" onClick={handleMenuClick}>
            <Menu.Item key="1">
                <Paragraph style={{ marginBottom: '0px' }}>Receive On Notifications </Paragraph>
                <Paragraph className="fade-text">Start receiving notifications when this person is ON</Paragraph>
            </Menu.Item>
            <Menu.Item key="2">
                <Paragraph style={{ marginBottom: '0px' }}>Receive Off Notifications </Paragraph>
                <Paragraph className="fade-text">Start receiving notifications  when this person is Off</Paragraph>
            </Menu.Item>
            <Menu.Item key="3">
                <Paragraph style={{ marginBottom: '10px' }}>Receive Both On/Off notifications</Paragraph>
            </Menu.Item>
            <Menu.Item key="4">
                <Paragraph style={{ marginBottom: '0px' }}>Turn Off all notifications for this person</Paragraph>
            </Menu.Item>
        </Menu>
    );

    const optionDropDown = (
        <Menu className="notification-dropdown"
            onClick={handleMenuClick} >
            <Menu.Item key="1" >
                <Paragraph style={{ marginBottom: '10px' }} > Block </Paragraph>
            </Menu.Item >
            <Menu.Item key="2" >
                <Paragraph style={{ marginBottom: '10px' }} > Unfollow </Paragraph>
            </Menu.Item >
        </Menu>
    );



    useEffect(async () => {

        if (localStorage.getItem('token') == null) {
            setAuthenticate(false)
        }
        else {
            setAuthenticate(true)
        }

        let data = {
            id: id
        }

        try {

            setLoader(true)
            let resultHandle = await GetProfileByID(params);

            console.log(params)
            if (resultHandle?.success == true) {

                setLoader(false)
                setProfile(resultHandle?.message.foundUser[0])
                setSearchedUser(resultHandle.message.foundUser[0].username);
                setSearchedUser(params.id)
                setCurrentUser(JSON.parse(localStorage.getItem('user')).username)

                console.log(resultHandle)
            }

            else {
                validateMessages(resultHandle);
                setLoader(false)
            }
            console.log(resultHandle)

        }
        catch (err) {
            console.log(err)
        }

    }, [reload])


    useEffect(async () => {

        let userData = JSON.parse(localStorage.getItem('user'))

        // if (authenticate == true) {

        try {

            let data = {
                followee: profile._id

            }

            setLoader(true)
            let resultHandle = await checkFollow(data);

            console.log(resultHandle)

            if (resultHandle?.success == true) {

                setLoader(false)
                if (resultHandle?.message?.followUser) {
                    setIsFollow(true)
                    setFollowStatus(resultHandle?.message?.followUser?.status);
                }
                else {
                    setIsFollow(false)
                }
            }

            else {
                // validateMessages(resultHandle);
                setLoader(false)
            }

        }
        catch (err) {
            console.log(err)
        }

        // }

    }, [reload, profile])

    return (
        <div className="animation2 " >

            <Spin className="loader" spinning={loader} size="large" />

            <div className="test" >
                <Header />
            </div>
            <Row style={{ position: "absolute", width: '100%', top: '90px' }} >
                <Col className="full-image" md={24}>
                    <Image preview={false} src={CoverImage} />
                </Col>
            </Row>
            <div className="content ant-page- padding-whole-page manage-position-absolute-2" >
                <Row className="mt-5" >
                    <Col md={4} xs={24} >
                        <Image style={{ height: '150px', width: '150px' }} className="border-50" src={profile?.profilePicUrl || DefaultImage} />
                    </Col>

                    <Col className='mt-2' style={{ alignSelf: 'center' }} md={2} xs={6} >
                        <Row>
                            <Paragraph className="follower-counter" > {profile?.follower < 0 ? 0 : profile?.follower} </Paragraph>
                        </Row>
                        <Row>
                            <Paragraph style={{ fontSize: 'larger' }} className="follower-heading" > Followers </Paragraph>
                        </Row >
                    </Col>

                    <Col className='mt-2' style={{ alignSelf: 'center' }} md={2} xs={6} >
                        <Row >
                            <Paragraph className="follower-counter" > {profile?.following < 0 ? 0 : profile?.following} </Paragraph>
                        </Row >
                        <Row>
                            <Paragraph style={{ fontSize: 'larger' }} className="follower-heading" >Following</Paragraph>
                        </Row>
                    </Col>

                    {authenticate == true ?
                        <Col style={{ alignSelf: 'center', display: 'flex', justifyContent: 'end' }} md={16} xs={6} >
                            <Dropdown style={{ border: 'none' }}
                                overlay={profileBellIcon}
                                placement="bottomRight" >
                                <Button style={{ border: 'none' }} >
                                    <Image style={{ width: 'inherit' }} preview={false} src={Bell} />
                                </Button>
                            </Dropdown>
                            {
                                currentUser !== searchedUser &&
                            <Dropdown style={{ border: 'none' }} overlay={followingDropdown} placement="bottomRight" >
                                <Button style={{ border: 'none' }} >
                                    <Image style={{ width: 'inherit' }} preview={false} src={Option} /> </Button>
                            </Dropdown>
                            }
                            
                        </Col>
                        : ""}

                </Row>
                <Row className="" >
                    <Row className='w-100'>
                        <Title level={5}>{profile?.firstName + " " + profile?.lastName}</Title>
                    </Row>
                    {profile?.imOnProfile &&
                        <Row className='w-100'>
                            <Paragraph>{profile?.imOnProfile?.profession_data[0]?.name}</Paragraph>
                        </Row>
                    }
                </Row >

                <Row>

                    <Row className='w-100'>
                        <Col md={12} xs={24}>
                            {profile?.imOnProfile &&
                                <Paragraph>{profile?.imOnProfile?.about}</Paragraph>
                            }
                            {/* <Paragraph>Followed by john hales<span className="g-color anchor">, Alexander and 35 others</span></Paragraph> */}
                        </Col>

                        <Col className="justify-content-end" md={12} xs={24}>
                            {followStatus == ACCEPT ?
                                <Dropdown disabled={!isFollow} className="gray-background following-dropdown mr-2" overlay={followingDropdown} placement="bottomRight" arrow>
                                    <Button className="following-dropdown-button">{ isFollow ? <span>Following</span> : <span>Disabled</span>}<DownOutlined /></Button>
                                </Dropdown>
                                : followStatus == REQUEST ?
                                    <Button style={{ border: 'none' }} className="mr-2 following-dropdown-button2">Follow Request Sucessfully Sent <CheckOutlined /> </Button>
                                    : null
                            }

                            {/* <Button style={{ border: 'none' }} className="gray-background mr-2 following-dropdown-button">Message </Button> */}

                            <Dropdown className="gray-background following-dropdown mr-2" overlay={shareDropdowm} placement="bottomRight" arrow>
                                <Button className="following-dropdown-button-2"><DownOutlined style={{ fontSize: 22 }} /></Button>
                            </Dropdown>

                        </Col>
                    </Row>
                </Row >

                <Row className="d-flex justify-content-center mt-5 w-100">
                    <Image className="w-100" src={Line} preview={false} />
                </Row>

                <Row className="mt-5">
                    {profile?.imOnProfile?.firstName ?

                        <Services services={profile?.imOnProfile?.services} />

                        : null}

                </Row>
                {authenticate == true ?
                    <div>
                        <Row className="mt-5">
                            <Title level={5}>Add a note</Title>
                        </Row>

                        <Row>
                            <Form
                                name="basic"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                                className="w-100"
                            >
                                <Form.Item name={['message']} >
                                    <Input.TextArea style={{ border: 'none', borderRadius: '10px', padding: '10px' }} rows={5} className="gray-background" placeholder="Type Text Here" />
                                </Form.Item>

                                { currentUser !== searchedUser && <Form.Item >
                                    <Button disabled={isFollow} type="primary" htmlType="submit" className="button-normal" >
                                        Send follow request
                                    </Button>
                                </Form.Item>}
                            </Form>
                        </Row>
                    </div>
                    : ''}
            </div>
        </div >
    )
}

export default Profile