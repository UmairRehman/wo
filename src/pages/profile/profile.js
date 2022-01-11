import React, { useEffect, useState } from 'react'

import {
    DownOutlined,
    CheckOutlined
} from '@ant-design/icons';

import { Layout, Dropdown, Image, Row, Col, Typography, notification, Button, Menu, Spin, message, Form, Input } from 'antd';
import SuggestIcon from '../../assets/images/suggest.png'
import Header from '../../component/header/header';
import { useLocation } from 'react-router-dom'
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

    console.log("prams" + params?.id)


    const [loader, setLoader] = useState(false)

    const [profile, setProfile] = useState([])

    const [isFollow, setIsFollow] = useState(false)

    const [reload, setReload] = useState(false)

    const [followStatus, setFollowStatus] = useState(0)

    const [authenticate, setAuthenticate] = useState(false)
    function handleMenuClick(e) {
        message.info('Click on menu item.');
        console.log('click', e);
    }


    const onFinish = async (values: any) => {

        let data = {
            "followee": params.id,
            "message": values.message
        }

        try {
            setLoader(true)
            let resultHandle = await FollowReqest(data);

            if (resultHandle?.success == true) {

                setLoader(false)
                validateMessagesFollow("Successfully Request Send");
                setReload(!reload)
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
                        followee: id
                    }

                    try {

                        setLoader(true)
                        let resultHandle = await unFollow(data);

                        console.log(resultHandle)

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

                    let data = {
                        followee: params.id,
                        status: 5
                    }

                    try {

                        setLoader(true)
                        let resultHandle = await StatusChange(data);

                        console.log(resultHandle)

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

    // console.log(statusConstant)

    const followingDropdown = (
        <Menu className="notification-dropdown" onClick={handleStatus}>

            <Menu.Item key="1">
                <Paragraph style={{ marginBottom: '10px' }}>Unfollow</Paragraph>
            </Menu.Item>

            <Menu.Item key="2">
                <Paragraph style={{ marginBottom: '0px' }} onClick={onClickBlock} >Block</Paragraph>
            </Menu.Item>

        </Menu>
    );

    function onClickBlock() {

        console.log(profile?.imOnProfile?.profession_data[0]?._id)

    }

    const shareDropdowm = (
        <Menu className="notification-dropdown" onClick={handleMenuClick}>
            {/* <Menu.Item key="1">
                <Paragraph style={{ marginBottom: '10px' }}>Share profile via message</Paragraph>
            </Menu.Item> */}
            <Menu.Item onClick={navigator.clipboard.writeText("test")} key="2">
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

        console.log(localStorage.getItem('token'))
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

            console.log(resultHandle)

            if (resultHandle?.success == true) {

                setLoader(false)
                setProfile(resultHandle?.message.foundUser[0])
            }

            else {
                validateMessages(resultHandle);
                setLoader(false)
            }

        }
        catch (err) {
            console.log(err)
        }

    }, [reload])


    useEffect(async () => {

        try {

            let data = {
                followee: params.id
            }

            setLoader(true)
            let resultHandle = await checkFollow(data);

            console.log(resultHandle)

            if (resultHandle?.success == true) {

                setLoader(false)
                console.log(resultHandle?.message?.followUser)
                if (resultHandle?.message?.followUser) {
                    setIsFollow(true)
                    setFollowStatus(resultHandle?.message?.followUser?.status);
                    console.log(resultHandle?.message?.followUser?.status)
                }
                else {
                    setIsFollow(false)
                }
            }

            else {
                validateMessages(resultHandle);
                setLoader(false)
            }

        }
        catch (err) {
            console.log(err)
        }

    }, [reload])

    return (
        <div className="animation2 " >

            <Spin className="loader" spinning={loader} size="large" />


            <div className="test" >
                <Header />
            </div>

            <div className="content ant-page- padding-whole-page" >
                <Row className="mt-5" >
                    <Col md={4} xs={6} >
                        <Image style={{ height: '150px', width: '150px' }} className="border-50" src={profile?.profilePicUrl || DefaultImage} />
                    </Col>

                    <Col style={{ alignSelf: 'center' }} md={2} xs={6} >
                        <Row>
                            <Paragraph className="follower-counter" > {profile?.follower || 0} </Paragraph>
                        </Row>
                        <Row>
                            <Paragraph style={{ fontSize: 'larger' }} className="follower-heading" > Followers </Paragraph>
                        </Row >
                    </Col>

                    <Col style={{ alignSelf: 'center' }} md={2} xs={6} >
                        <Row >
                            <Paragraph className="follower-counter" > {profile?.following || 0} </Paragraph>
                        </Row >
                        <Row>
                            <Paragraph style={{ fontSize: 'larger' }} className="follower-heading" > Following </Paragraph>
                        </Row>
                    </Col>

                    {authenticate == true ?
                        <Col style={{ alignSelf: 'center', display: 'flex', justifyContent: 'end' }} md={16} xs={6} >
                            {/* <Dropdown style={{ border: 'none' }}
                                overlay={profileBellIcon}
                                placement="bottomRight" >
                                <Button style={{ border: 'none' }} >
                                    <Image style={{ width: 'inherit' }} preview={false} src={Bell} />
                                </Button>
                            </Dropdown> */}
                            <Dropdown style={{ border: 'none' }} overlay={optionDropDown} placement="bottomRight" >
                                <Button style={{ border: 'none' }} >
                                    <Image style={{ width: 'inherit' }} preview={false} src={Option} /> </Button>
                            </Dropdown>
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
                            {console.log(profile)}
                            {/* <Paragraph>Followed by john hales<span className="g-color anchor">, Alexander and 35 others</span></Paragraph> */}
                        </Col>

                        <Col className="justify-content-end" md={12} xs={24}>
                            {followStatus == ACCEPT ?
                                <Dropdown className="gray-background following-dropdown mr-2" overlay={followingDropdown} placement="bottomRight" arrow>
                                    <Button className="following-dropdown-button">Following <DownOutlined /></Button>
                                </Dropdown>
                                : followStatus == REQUEST ?
                                    <Button style={{ border: 'none' }} className="mr-2 following-dropdown-button2">Follow Request Sent <CheckOutlined /> </Button>
                                    : null}

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
                                <Form.Item name={['message']} rules={[{ required: true, message: 'Please enter mesage' }]}>
                                    <Input.TextArea style={{ border: 'none', borderRadius: '10px', padding: '10px' }} rows={5} className="gray-background" placeholder="Type Text Here" />
                                </Form.Item>

                                <Form.Item >
                                    <Button disabled={isFollow} type="primary" htmlType="submit" className="button-normal" >
                                        Send follow request
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Row>
                    </div>
                    : ''}
            </div>
        </div >
    )
}

export default Profile