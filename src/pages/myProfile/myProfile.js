import React, { useEffect, useState } from 'react'
import {
    DownOutlined,
    ShareAltOutlined,
    EditOutlined
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
import CoverImage from '../../assets/images/coverImage.png'
import { useHistory } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import off from "../../assets/images/off.png"
import on from "../../assets/images/on.png"
import imOff from "../../assets/images/imoff.png"



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
            {/* <Menu.Item key="2">
                <Paragraph style={{ marginBottom: '0px' }}>Stop only this alert</Paragraph>
                <Paragraph className="fade-text">Remove from my alerts</Paragraph>
            </Menu.Item> */}
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
                console.log("profile" + JSON.stringify(resultHandle?.message))
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
    function shareProfile() {
        navigator.clipboard.writeText(`${window.location.origin}/profile/${getProfile.username}`);
        message.info(`copy to clipboard`);

        console.log(`${window.location.origin}/profile/${getProfile._id}`)
        // console.log(profile._id)
    }

    const shareDropdowm = (
        <Menu className="notification-dropdown"
            onClick={handleMenuClick}
        >
            {/* <Menu.Item key="1">
                <Paragraph style={{ marginBottom: '10px' }}>Share profile via message</Paragraph>
            </Menu.Item> */}
            <Menu.Item onClick={() => shareProfile()} key="2">
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

    const buttonStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly"
    }



    function onClickEdit() {
        history.push({
            pathname: "/edit-profile",
            state: getProfile
        });
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

            <div className="content ant-page-" >

                <Row style={{ position: "absolute", width: '100%' }} >
                    <Col className="full-image" md={24}>
                        <Image preview={false} src={CoverImage} />
                        {/* <CameraOutlined onClick={showModal} className='add-picture-camere' /> */}

                    </Col>
                </Row>

                <Row className="mt-5  padding-whole-page manage-position-absolute" >
                    <Col md={3} xs={6} >
                        <Image className="border-50" preview={false} src={getProfile?.profilePicUrl || DefaultImage} />
                    </Col>

                    <Col style={{ alignSelf: 'center' }} md={2} xs={6} >

                    </Col>

                    <Col style={{ alignSelf: 'center' }} md={2} xs={6} >

                    </Col>

                    <Col style={{ alignSelf: 'end', display: 'flex', justifyContent: 'end' }} md={17} xs={6} >

                    </Col>

                </Row>

                <Row className="  padding-whole-page " >
                    <Row className='w-100'>
                        <Title level={5}>{getProfile?.firstName} {getProfile?.lastName} </Title>
                    </Row>
                    {getProfile?.imOnProfile ?
                        <Row className='w-100'>
                            <Paragraph>{getProfile?.imOnProfile?.profession_data[0]?.name}</Paragraph>
                        </Row>
                        : null}
                </Row >

                <Row className=' padding-whole-page' >
                    <Row className='w-100'>

                        <Col md={12} xs={24}>
                            <Paragraph className="m-0" style={{ color: '#A8A8A8' }}>{getProfile?.private == false ? "Public Account" : "Private Account"}</Paragraph>
                            {getProfile?.imOnProfile ?
                                <Paragraph>{getProfile?.imOnProfile?.address}</Paragraph>
                                : null}
                            <Paragraph>{getProfile?.emailAddress}</Paragraph>
                            <Paragraph>{getProfile?.phoneNumber}</Paragraph>
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
                            {console.log(getProfile?.imOnProfile?.profession_data.length)}
                            {getProfile?.imOnProfile?.profession_data.length > 0 ?
                                <div>

                                    {getProfile?.imOnProfile?.On == true ?

                                        <Button style={buttonStyle} className='imon-button mr-2' onClick={() => onClickStatus()} ><span className='mr-1' style={{ marginTop: '2px' }}>I'm On</span> <Image preview={false} src={whiteLogo} /> <Image style={{ marginTop: "5px" }} preview={false} src={on} /> </Button>
                                        :
                                        <Button style={buttonStyle} className='imon-button2 mr-2' onClick={() => onClickStatus()} > <span className='mr-1' style={{ marginTop: '2px' }}>I'm Off</span><Image preview={false} src={imOff} /> <Image style={{ marginTop: "5px" }} preview={false} src={off} /></Button>

                                    }
                                </div>
                                : ''}
                            <Button onClick={() => shareProfile()} className='gray-background share-button mr-1' ><ShareAltOutlined /></Button>

                            {getProfile?.imOnProfile?.profession_data.length > 0 ?
                                <Button onClick={() => onClickEdit()} className='gray-background share-button' ><EditOutlined /></Button>

                                : null
                            }


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

                <Row className="d-flex justify-content-center mt-5 w-100  padding-whole-page">
                    <Image className="w-100" src={Line} preview={false} />
                </Row>
                {getProfile?.imOnProfile?.firstName ?
                    <Row className=" mt-5 w-100  padding-whole-page">

                        <Services services={getProfile?.imOnProfile?.services} />

                    </Row>
                    : null}
            </div>
        </div>
    )
}

export default MyProfile