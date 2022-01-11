import React, { useEffect, useState } from 'react'
import {
    DownOutlined,
} from '@ant-design/icons';
import Avatar from 'react-avatar-edit'
import { Layout, Dropdown, Image, Row, Col, Typography, Spin, Button, Menu, message, notification, Modal } from 'antd';
import Header from '../../component/header/header';
import FollowingCard from '../../component/following/followingCard';
import { Link } from 'react-router-dom';
import Bell from '../../assets/images/bell.jpg'
import Line from '../../assets/images/line.png'
import whiteLogo from '../../assets/images/logo-white.png'

import './myProfile.css'
import Services from '../../component/services/services';
import { GetProfile, IMON } from '../../services/apiInteraction';
import './myProfile.css'
import DefaultImage from '../../assets/images/default.png'
import { useHistory } from "react-router-dom";
import { useLocation } from 'react-router-dom'


import { ChangeProfileImage } from '../../services/apiInteraction';

const validateMessages = (data) => {
    const args = {
        message: 'Error',
        description:
            `${data?.message}`,
        duration: 5,
    };
    notification.error(args);
};




function MyProfile() {

    const { Content } = Layout;
    const { Title, Text, Paragraph } = Typography;

    const [isModalVisible, setIsModalVisible] = useState(false);
    let history = useHistory();
    const location = useLocation();
    const showModal = () => {
        setIsModalVisible(true);
    };




    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const followingDropdown = (
        <Menu className="notification-dropdown" onClick={handleMenuClick}>
            <Menu.Item key="1">
                <Paragraph style={{ marginBottom: '10px' }}>Unfollow</Paragraph>
            </Menu.Item>
            <Menu.Item key="2">
                <Paragraph style={{ marginBottom: '0px' }}>Block</Paragraph>
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
            <Menu.Item key="3" >
                <Paragraph style={{ marginBottom: '10px' }} > Copy profile URL </Paragraph>
            </Menu.Item >
            <Menu.Item key="4" >
                <Paragraph style={{ marginBottom: '0px' }} > Share this profile  </Paragraph>
            </Menu.Item >
        </Menu>
    );


    const [loader, setLoader] = useState(false)

    const [getProfile, setGetProfile] = useState({})

    const [status, setStatus] = useState(false)

    useEffect(async () => {
        try {
            setLoader(true)
            let resultHandle = await GetProfile();

            if (resultHandle?.success == true) {

                setLoader(false)
                console.log(resultHandle?.message?.foundUser[0])
                setGetProfile(resultHandle?.message?.foundUser[0])

            }

            else {
                validateMessages(resultHandle);
                setLoader(false)
            }

        }
        catch (err) {
            console.log(err)
        }
    }, [status])

    const [preview, setPreview] = useState()


    function onClose() {
        // setPreview(UserImage)
    }

    function onCrop(preview) {
        setProfileImage(preview)
        // console.log(profileImage)
    }

    function onUpload(file) {
    }

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const [buttonDisable, setButtonDisable] = useState(false)


    const [profileImage, setProfileImage] = useState('')


    async function submitImage() {

        console.log(profileImage)

        localStorage.setItem("profileImage", profileImage)

        let data = {

            type: 2,
            image: profileImage

        }

        try {
            setLoader(true)

            let resultHandle = await ChangeProfileImage(data);

            console.log(resultHandle)

            if (resultHandle?.success == true) {

                setLoader(false)

                setIsModalVisible(false)
                window.location.reload(false);
            }

            else {
                validateMessages(resultHandle);
                setLoader(false)
                setIsModalVisible(false)

            }

        }
        catch (err) {
            console.log(err)
            setLoader(false)
            setIsModalVisible(false)

        }

    }

    function submit(file) {

        console.log(file)

    }

    function onBeforeFileLoad(elem) {
        if (elem.target.files[0].size > 7168000000) {
            alert("File is too big!");
            elem.target.value = "";
        }
    }


    async function onClickStatus() {

        try {

            setLoader(true)
            let resultHandle = await IMON();

            console.log(resultHandle)

            if (resultHandle?.success == true) {

                setLoader(false)
                setStatus(!status)

                // validateMessages(resultHandle);

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

    const shareDropdowm = (
        <Menu className="notification-dropdown"
            onClick={handleMenuClick}
        >
            {/* <Menu.Item key="1">
                <Paragraph style={{ marginBottom: '10px' }}>Share profile via message</Paragraph>
            </Menu.Item> */}
            <Menu.Item key="2">
                <Paragraph style={{ marginBottom: '10px' }}>Copy Profile URL</Paragraph>
            </Menu.Item>
            <Menu.Item key="3" >
                <Paragraph style={{ marginBottom: '0px' }}>Edit Profile</Paragraph>
            </Menu.Item>
        </Menu>
    );


    function handleMenuClick(e) {
        if (e.key == 3) {
            history.push({
                pathname: "/edit-profile",
                state: getProfile
            });

        }
        else {
            console.log("nothing else")
        }
    }



    return (
        <div className="animation2 " >
            <Spin className="loader" spinning={loader} size="large" />

            <Modal
                // title="Basic Modal"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                className='change-profile-modal'
            >
                <Row className="justify-content-center manage-Background-color" >

                    <Avatar
                        width={300}
                        height={300}
                        onCrop={onCrop}
                        cropRadius={20}
                        minCropRadius={10}
                        onClose={onClose}
                        onFileLoad={submit}
                        onBeforeFileLoad={onBeforeFileLoad}
                        onFileLoad={onUpload}
                        label={`Choose Image`}
                        imageWidth={300}
                        imageHeight={400}
                        mimeTypes={'image/jpeg,image/png'}
                    />


                </Row>
                <Row className="justify-content-center ">
                    <Button
                        disabled={buttonDisable}
                        onClick={submitImage}
                        type="primary" htmlType="submit" className="button-profile-image mt-5 ">
                        Change
                    </Button>
                </Row>
            </Modal>


            <div className="test" >
                <Header />
            </div>

            <div className="content ant-page- padding-whole-page" >

                {/* <Row> */}
                {/* <Col className="full-image" md={24}> */}
                {/* <Image height={300} preview={false} src={getProfile?.backgroundPicUrl} /> */}
                {/* <CameraOutlined onClick={showModal} className='add-picture-camere' /> */}

                {/* </Col> */}
                {/* </Row> */}

                <Row className="mt-5" >
                    <Col md={3} xs={6} >
                        <Image className="border-50" preview={false} src={getProfile?.profilePicUrl || DefaultImage} />
                    </Col>

                    <Col style={{ alignSelf: 'center' }} md={2} xs={6} >
                        {/* <Row>
                            <Paragraph className="follower-counter" > 40 </Paragraph>
                        </Row>
                        <Row>
                            <Paragraph className="follower-heading" > Followers </Paragraph>
                        </Row > */}
                    </Col>

                    <Col style={{ alignSelf: 'center' }} md={2} xs={6} >

                    </Col>

                    <Col style={{ alignSelf: 'end', display: 'flex', justifyContent: 'end' }} md={17} xs={6} >
                        <Dropdown style={{ border: 'none' }}
                            overlay={profileBellIcon}
                            placement="bottomRight" >
                            <Button className='no-focus' style={{ border: 'none' }} >
                                <Image style={{ width: 'inherit' }} preview={false} src={Bell} />
                            </Button>
                        </Dropdown>
                    </Col>

                </Row>

                <Row className="" >
                    <Row className='w-100'>
                        <Title level={5}>{getProfile?.firstName} {getProfile?.lastName} </Title>
                    </Row>
                    {getProfile?.imOnProfile ?
                        <Row className='w-100'>
                            <Paragraph>{getProfile?.imOnProfile?.profession_data[0]?.name}</Paragraph>
                        </Row>
                        : null}
                </Row >

                <Row  >
                    <Row className='w-100'>

                        {console.log(getProfile)}

                        <Col md={12} xs={24}>
                            <Paragraph className="m-0" style={{ color: '#A8A8A8' }}>{getProfile?.private == false ? "Public Account" : "Private Account"}</Paragraph>
                            {getProfile?.imOnProfile ?
                                <Paragraph>{getProfile?.imOnProfile?.address}</Paragraph>
                                : null}
                            <Paragraph>{getProfile?.emailAddress}</Paragraph>
                            <Paragraph>{getProfile?.phoneNumber}</Paragraph>
                            {console.log(getProfile)}
                            <Title level={5} >Dashboard</Title>
                            <Row>


                                <div className="follow-card">
                                    <Row style={{ color: '#FD6700' }}>
                                        {getProfile?.following || 0}
                                    </Row>
                                    <Row>
                                        Following
                                    </Row>
                                </div>

                                <div className="follow-card">
                                    <Row style={{ color: '#FD6700' }}>
                                        {getProfile?.follower || 0}
                                    </Row>
                                    <Row>
                                        Followers
                                    </Row>
                                </div>

                            </Row>

                        </Col>
                        <Col className="justify-content-end mt-3" md={12} xs={24}>
                            {getProfile?.imOnProfile?.On == true ?

                                <Button className='imon-button mr-2' onClick={() => onClickStatus()} ><span style={{ marginTop: '2px' }}>I'm On</span> <span style={{ marginLeft: '20px' }} > <Image preview={false} src={whiteLogo} /> </span></Button>
                                :
                                <Button className='imon-button2 mr-2' onClick={() => onClickStatus()} > <span style={{ marginTop: '2px' }}>I'm On</span> <span style={{ marginLeft: '20px' }} > <Image preview={false} src={whiteLogo} /> </span></Button>

                            }



                            <Dropdown className="gray-background following-dropdown mr-2" overlay={shareDropdowm} placement="bottomRight" arrow>
                                <Button style={{
                                    border: 'none', popsition: 'relative',
                                    border: 'none',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: '10px'
                                }} className="following-dropdown-button-2"><DownOutlined style={{ fontSize: 22 }} /></Button>
                            </Dropdown>

                        </Col>
                    </Row>
                    {getProfile?.imOnProfile?.firstName ?
                        <Row className="mt-5">
                            <Row className="w-100">
                                <Title level={5}>About</Title>
                            </Row>

                            <Row>
                                <Paragraph>
                                    {getProfile?.imOnProfile?.about}
                                </Paragraph>
                            </Row>

                        </Row>
                        : null}
                </Row >

                <Row className="d-flex justify-content-center mt-5 w-100">
                    <Image className="w-100" src={Line} preview={false} />
                </Row>
                {getProfile?.imOnProfile?.firstName ?
                    <Row className=" mt-5 w-100">

                        <Services services={getProfile?.imOnProfile?.services} />

                    </Row>
                    : null}
            </div>
        </div>
    )
}

export default MyProfile