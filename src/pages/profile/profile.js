import React, { useEffect, useState } from 'react'

import {
    DownOutlined,
    CheckOutlined,
    LockOutlined,
} from '@ant-design/icons';

import { Layout, Dropdown, Image, Row, Col, Typography, notification, Button, Menu, Spin, message, Form, Input, Switch, Empty } from 'antd';
import SuggestIcon from '../../assets/images/suggest.png'
import Header from '../../component/header/header';
import { Link, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import Option from '../../assets/images/option.png'
import Bell from '../../assets/images/bell.jpg'
import Line from '../../assets/images/line.png'
import { checkBlockStatus, checkFollow, GetProfileByID, StatusChange, unFollow, MuteNOtification } from '../../services/apiInteraction';
import Services from '../../component/services/services';
import { FollowReqest } from '../../services/apiInteraction';
import DefaultImage from '../../assets/images/default.png'
import { statusConstant } from '../../constant/status'
import { useParams } from "react-router-dom";
import CoverImage from '../../assets/images/coverImage.png'
import io from 'socket.io-client'
import './profile.css'
import imOff from "../../assets/images/logo-white.png"
import imOn from "../../assets/images/imoff.png"
import { useHistory } from "react-router-dom";
import apiConfig from '../../Enviroment/enviroment'
import { OS } from './OS';

const {
    socketUrl
} = apiConfig

const socketNamespace = 'imOnOff'

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





function Profile(props) {

    let history = useHistory();

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

    const [checkBlock, setCheckBlock] = useState()

    const [checkNotification, setCheckNotification] = useState({})

    const [notify, setNotify] = useState({
        onNotify: false,
        offNotify: false,
    })




    const onFinish = async (values) => {

        let data = {
            "followee": profile._id,
            "message": values.message || " ",
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
            setLoader(false)
        }

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    async function handleStatus(e) {

        if (e.key == 1) {
            Swal.fire({
                title: 'Are you sure?',
                text: "Do you really want to unfollow?",
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
                        }

                        else {
                            validateMessages(resultHandle);
                            setLoader(false)
                        }

                    }
                    catch (err) {
                        console.log(err)
                        setLoader(false)

                    }
                }
            })
        }

        else if (e.key == 2 || e.key == 4) {
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
                        followee: profile._id,
                        status: e.key == 2 ? 5 : 2
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
                        setLoader(false)

                    }

                }
            })
        }
        else if (e.key == 3) {

            try {

                setLoader(true)

                let data = {

                    followee: profile._id,
                    on: false,
                    off: false

                }

                let resultHandle = await MuteNOtification(data);

                if (resultHandle?.success == true) {

                    setLoader(false)
                }

                else {
                    validateMessages(resultHandle);
                    setLoader(false)
                }

            }

            catch (err) {
                console.log(err)
                setLoader(false)
            }
        }

    }

    const followingDropdown = (
        <Menu className="notification-dropdown"
            onClick={handleStatus}
        >
            {followStatus == 2 ?
                <Menu.Item key="1">
                    <Paragraph style={{ marginBottom: '10px' }}>Unfollow</Paragraph>
                </Menu.Item>
                : null}

            {checkBlock == 2 ?
                <Menu.Item key="2">
                    <Paragraph style={{ marginBottom: '10px' }} >Block</Paragraph>
                </Menu.Item>
                : null
            }

            {checkBlock == 5 ?
                <Menu.Item key="4">
                    <Paragraph style={{ marginBottom: '10px' }} >Unblock</Paragraph>
                </Menu.Item>
                : null
            }

            {/* {getNotificationOFF.OffNotification == true ?
                <Menu.Item key="3">
                    <Paragraph style={{ marginBottom: '10px' }} >Receive on notification</Paragraph>
                </Menu.Item>
                : null
            } */}

        </Menu>
    );


    const shareDropdowm = (
        <Menu className="notification-dropdown" >
            <Menu.Item onClick={() => { navigator.clipboard.writeText(window.location.href); message.info('Copied to clipboard'); }} key="2">
                <Paragraph style={{ marginBottom: '0px' }}>Copy Profile URL</Paragraph>
            </Menu.Item>
        </Menu>
    );




    async function handleMenuClick(checked) {

        // if (checked.on) setNotify({ ...notify, onNotify: checked.on })


        try {

            setNotify({ onNotify: checked.on, offNotify: checked.off })

            let data = {
                followee: profile?._id,
                on: checked.on,
                off: checked.off
            }


            setLoader(true)


            let resultHandle = await MuteNOtification(data);


            if (resultHandle?.success == true) {

                setLoader(false)
            }

            else {
                validateMessages(resultHandle);
                setLoader(false)
            }

        }

        catch (err) {
            console.log(err)
            setLoader(false)
        }

    }

    // const handleAll = () => {

    //     const data = {
    //         on: true,
    //         off: true
    //     }

    //     setNotify({onNotify: true, offNotify: true})

    //     handleMenuClick(data)
    //     setReload(!reload)
    // }

    const profileBellIcon = (

        <Menu className="notification-dropdown" >
            <Menu.Item key="1">
                <Paragraph style={{ marginBottom: '0px' }}>Receive On Notifications </Paragraph>
                <Paragraph className="fade-text">Start receiving notifications when this person is ON</Paragraph>
                <Switch defaultChecked={notify?.onNotify} onChange={(checked) => handleMenuClick({ on: checked, off: notify?.offNotify })} />
            </Menu.Item>
            <Menu.Item key="2">
                <Paragraph style={{ marginBottom: '0px' }}>Receive Off Notifications </Paragraph>
                <Paragraph className="fade-text">Start receiving notifications  when this person is Off</Paragraph>
                <Switch defaultChecked={notify?.offNotify} onChange={(checked) => handleMenuClick({ off: checked, on: notify?.onNotify })} />
            </Menu.Item>
            {/* <Menu.Item key="3">
                <Paragraph  style={{ marginBottom: '10px' }}>Receive Both On/Off notifications</Paragraph>
            </Menu.Item> */}
        </Menu>

    );

    const [exists, setExists] = useState(true)
    const [isPrivate, setIsPrivate] = useState(false)

    const [imOnStatus, setImOnStatus] = useState(false)

    const socket = io(`${socketUrl}${socketNamespace}`, { transports: ['websocket'] });

    useEffect(() => {

        try {
            if (profile?._id && !socket.connected) {

                socket.on("connect", () => {
                    socket.emit('join', profile._id)

                    socket.on('connect_error', (error) => {
                        socket.disconnect()
                    });
                    socket.on('statusUpdated', (data) => {
                        setImOnStatus(data?.status)
                    });
                    socket.on('disconnect', () => {
                        socket.disconnect()
                    })

                });

            }
        } catch (error) {
            console.log({ error })
            socket.disconnect()
        }
        return () => {
            socket.disconnect()
        }
    }, [profile])


    useEffect(async () => {

        if (window.navigator.platform == OS.iphone) {
            // window.location.replace("https://apps.apple.com/pk/app/whos-on/id1599268330");

            (function () {
                var app = {
                    launchApp: function () {
                        window.location.replace("org.liqteq.react.native.Whoson://");
                        this.timer = setTimeout(this.openWebApp, 1000);
                    },

                    openWebApp: function () {
                        window.location.replace("https://apps.apple.com/pk/app/whos-on/id1599268330");
                    }
                };

                app.launchApp();
            })();

        }
        else if (window.navigator.platform == OS.android) {
            window.location.replace(`whosonapp://userProfile/${params.id}`);
            console.log("else")
            alert(window.navigator.platform)
        }
        // else {
        //     window.location.replace("https://apps.apple.com/pk/app/whos-on/id1599268330");
        // }


        if (localStorage.getItem('token') == null) {
            setAuthenticate(false)
        }
        else {
            setAuthenticate(true)
        }

        try {

            setLoader(true)
            let resultHandle = await GetProfileByID(params);


            if (resultHandle?.success == true) {

                setIsPrivate(resultHandle.message.foundUser[0].private)
                setProfile(resultHandle?.message.foundUser[0])
                setImOnStatus(resultHandle?.message.foundUser[0]?.imOnProfile?.On)
                setSearchedUser(resultHandle.message.foundUser[0].username);
                setSearchedUser(params.id)
                setCurrentUser(JSON.parse(localStorage.getItem('user')).username)
                setLoader(false)
            }

            else {
                setExists(false)
                validateMessages(resultHandle);
                setLoader(false)
            }

        }
        catch (err) {
            console.log(err)
            setLoader(false)

        }

    }, [reload])


    useEffect(async () => {

        let token = localStorage.getItem('token')
        if (token !== null) {

            try {

                let data = {
                    followee: profile._id
                }

                setLoader(true)
                let resultHandle = await checkFollow(data);


                if (resultHandle?.success == true) {

                    setLoader(false)
                    if (resultHandle?.message?.followUser) {
                        setIsFollow(true)
                        setFollowStatus(resultHandle?.message?.followUser?.status);
                        setCheckNotification(resultHandle?.message?.followUser)
                        setNotify({ onNotify: resultHandle?.message?.followUser?.OnNotification, offNotify: resultHandle?.message?.followUser?.OffNotification })
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
                setLoader(false)
            }

        }

    }, [reload, profile])


    const [getNotificationOFF, setGetNotificationOFF] = useState({})



    // check Block status 

    useEffect(async () => {

        let token = localStorage.getItem('token')
        if (token !== null) {

            setLoader(true)

            try {

                let data = {
                    followee: profile._id
                }

                let resultHandle = await checkBlockStatus(data);

                if (resultHandle?.success == true) {

                    setLoader(false)

                    if (resultHandle?.message?.followUser) {
                        setCheckBlock(resultHandle?.message?.followUser.status)
                        setGetNotificationOFF(resultHandle?.message?.followUser)
                    }
                    // else {
                    //     setCheckBlock(false)
                    // }
                }

                else {
                    setLoader(false)
                }

            }
            catch (err) {
                console.log(err)
                setLoader(false)
            }

        }

    }, [reload, profile])

    const handleURL = () => {
        window.open("https://" + profile?.imOnProfile?.website)
    }

    const [displayFlag, setDisplayFlag] = useState(true)
    const handleDisplay = () => {

        if (isFollow) setDisplayFlag(true)

        if (!isFollow) {
            if (isPrivate) setDisplayFlag(false)
        }
    }
    useEffect(() => {
        handleDisplay()
    }, [isFollow, isPrivate])


    const buttonStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly"
    }


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
                <Row className="" >
                    <Col md={4} xs={24} >
                        <Image style={{ height: '150px', width: '150px' }} className="border-50 mt-5" src={profile?.profilePicUrl || DefaultImage} />
                    </Col>

                    <Col className='mt-5' style={{ alignSelf: 'center' }} md={2} xs={6} >
                        <Row>
                            <Paragraph className="follower-counter" > {profile?.follower < 0 ? 0 : profile?.follower} </Paragraph>
                        </Row>
                        <Row>
                            <Paragraph style={{ fontSize: 'larger' }} className="follower-heading" > Followers </Paragraph>
                        </Row >
                    </Col>

                    <Col className='mt-5' style={{ alignSelf: 'center' }} md={2} xs={6} >
                        <Row >
                            <Paragraph className="follower-counter" > {profile?.following < 0 ? 0 : profile?.following} </Paragraph>
                        </Row >
                        <Row>
                            <Paragraph style={{ fontSize: 'larger' }} className="follower-heading" >Following</Paragraph>
                        </Row>
                    </Col>

                    {authenticate == true ?
                        <Col style={{ alignSelf: 'center', display: 'flex', justifyContent: 'end' }} md={16} xs={6} >

                            {isFollow && <div style={{ display: "flex", alignItems: "center" }}>
                                {imOnStatus ? <div style={buttonStyle} className='imon-button mr-2'  ><span className='mr-1' style={{ marginTop: '2px' }}>I'm On</span> <Image preview={false} src={imOff} /></div> :
                                    <div style={buttonStyle} className='imon-button2 mr-2' > <span className='mr-1' style={{ marginTop: '2px' }}>I'm Off</span><Image preview={false} src={imOn} /></div>}


                                <Dropdown style={{ border: 'none' }}
                                    overlay={profileBellIcon}
                                    placement="bottomRight" >
                                    <Button style={{ border: 'none' }} >
                                        {currentUser !== searchedUser &&
                                            <Image style={{ width: 'inherit' }} preview={false} src={Bell} />
                                        }
                                    </Button>
                                </Dropdown>
                            </div>}

                            {/* {
                                currentUser !== searchedUser &&
                                <Dropdown style={{ border: 'none' }} overlay={followingDropdown} placement="bottomRight" >

                                    <Button style={{ border: 'none', display: checkBlock == true ? 'none' : 'flex' }} >
                                        <Image style={{ width: 'inherit' }} preview={false} src={Option} />
                                    </Button>

                                </Dropdown>
                            } */}

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


                    {followStatus == ACCEPT && <>  {profile?.imOnProfile &&
                        <Row className='w-100'>
                            <Paragraph>{profile?.imOnProfile?.address}</Paragraph>
                        </Row>
                    }

                        {profile?.imOnProfile &&
                            <Row className='w-100'>
                                <Paragraph>{profile?.imOnProfile?.phoneNumber}</Paragraph>
                            </Row>
                        } </>
                    }


                    <Row className='w-100 ' style={{ marginBottom: "10px" }}>
                        <Paragraph onClick={handleURL} style={{ cursor: "pointer", textDecoration: "underline", color: "#FB6400" }} target="_blank" href={`https://${profile?.imOnProfile?.website}`} level={5}>{profile?.imOnProfile?.website}</Paragraph>
                    </Row>
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
                                    <Button className="following-dropdown-button">{isFollow ? <span>Following</span> : <span>Disabled</span>}<DownOutlined /></Button>
                                </Dropdown>
                                : followStatus == REQUEST ?
                                    <Button style={{ border: 'none' }} className="mr-2 following-dropdown-button2">Follow Request Sucessfully Sent <CheckOutlined /> </Button>
                                    : null
                            }

                            {/* <Button style={{ border: 'none' }} className="gray-background mr-2 following-dropdown-button">Message </Button> */}

                            {isFollow && <Dropdown className="gray-background following-dropdown mr-2" overlay={shareDropdowm} placement="bottomRight" arrow>
                                <Button className="following-dropdown-button-2"><DownOutlined style={{ fontSize: 22 }} /></Button>
                            </Dropdown>}

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
                {authenticate == true && isFollow == false ?
                    <div>
                        {currentUser !== searchedUser &&
                            <Row className="mt-5">
                                <Title level={5}>Add a note</Title>
                            </Row>
                        }
                        {currentUser !== searchedUser &&
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

                                    <Form.Item >
                                        <Button disabled={isFollow} type="primary" htmlType="submit" className="button-normal" >
                                            Send follow request
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Row>
                        }
                    </div>
                    : ''}
            </div>
            {/* {(exists && !displayFlag) && <div style={{ marginTop: "-200px", maxHeight: "100px", display: "flex", alignItems: "center", justifyContent: "center" }}><LockOutlined style={{ fontSize: "30px", marginBottom: "15px", marginRight: "10px" }} /><h3 >Private Account!</h3></div>}
            {!exists && <div style={{ marginTop: "-300px", maxHeight: "100px", display: "flex", flexDirection: "column", alignItems: "center" }}><h3>User does not exist!</h3><Empty /></div>} */}
        </div >
    )
}

export default Profile