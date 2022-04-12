import React, { useState, useEffect } from 'react'
import { Layout, Menu, Image, Row, PageHeader, Button, Input, message, Dropdown, Modal, notification, Spin, Col, Typography } from 'antd';
import { SearchOutlined, BellOutlined, AlertOutlined, HomeOutlined, PlusOutlined, MenuOutlined, ArrowLeftOutlined, UsergroupAddOutlined, LogoutOutlined, ProfileOutlined, MessageOutlined, NotificationOutlined } from '@ant-design/icons';
import User from '../../assets/images/user.png'
import {
    Link
} from "react-router-dom";
import Avatar from 'react-avatar-edit'

import UserImage from '../../assets/images/user-small.png'
import MenuIcon from '../../assets/images/menu.png'

import './header.css'
import Paragraph from 'antd/lib/skeleton/Paragraph';
import { ChangeProfileImage, Logout, readAPI } from '../../services/apiInteraction';

import { GetProfile } from '../../services/apiInteraction';
import { useHistory } from "react-router-dom";
import DefaultImage from '../../assets/images/default.png'
import { GetNotification } from '../../services/apiInteraction';

const { Title, Text } = Typography;


const validateMessages = (data) => {
    const args = {
        message: 'Error',
        description:
            `${data?.message}`,
        duration: 5,
    };
    notification.error(args);
};


function Header(props) {

    const [collapsed, setCollapsed] = useState(true)

    const [profileImage, setProfileImage] = useState('')

    const [buttonDisable, setButtonDisable] = useState(false)

    const [preview, setPreview] = useState()

    const [searchField, setSearchField] = useState('')

    const [authenticate, setAuthenticate] = useState(false)

    const [unRead, setUnread] = useState(false);


    let history = useHistory();

    const { Sider } = Layout;

    function onBeforeFileLoad(elem) {
        if (elem.target.files[0].size > 7168000000) {
            alert("File is too big!");
            elem.target.value = "";
        }
    }


    function onClose() {
        setPreview(UserImage)
    }

    function onCrop(preview) {
        setProfileImage(preview)
    }

    function onUpload(file) {
    }


    function toggle() {
        setCollapsed(!collapsed)
    }

    function handleButtonClick(e) {
        message.info('Click on left button.');
        console.log('click left button', e);
    }

    function handleMenuClick(e) {
        message.info('Click on menu item.');
        console.log('click', e);
    }

    const [getNotification, setGetNotification] = useState([])



    const handleRead = async (notificationID) => {
        try {

            setLoader(true)

            let resultHandle = await readAPI(notificationID);

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


    useEffect(async () => {

        const token = localStorage.getItem('token');

        if (token) {
            setAuthenticate(true)
        }
        else {
            setAuthenticate(false)
        }
        let data = {

            offset: 0

        }

        try {

            setLoader(true)
            let resultHandle = await GetNotification(data);

            if (resultHandle?.success === true) {
                setLoader(false)
                setGetNotification([...resultHandle?.message?.notify]);
                // console.log("header",resultHandle.message.notify)
                const data = resultHandle.message.notify;
                data.slice(0, 3).forEach((item) => {
                    console.log(item)
                    if (!item.isRead) {
                        setUnread(true);
                    }
                })
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


    }, [])

    const menu = (
        <Menu className='notification-menu'>
            <div>
                {getNotification?.slice(0, 4).map((data) =>
                    <div>
                        {data.isRead == false ?

                            <Link to='../notification'>
                                <Menu.Item onClick={() => handleRead(data._id)} key="1">
                                    <Row>
                                        <Col style={{ display: 'flex', alignItems: 'center', }} span={5}>
                                            {data?.from_data[0]?.profilePicUrl ?
                                                <Image style={{ borderRadius: "50px" }} className='notification-image' preview={false} src={data?.from_data[0]?.profilePicUrl} alt={data.from_data[0].firstName[0]} /> :
                                                <Image style={{ borderRadius: "50px" }} className='notification-image' preview={false} src={DefaultImage} >{data.from_data[0].firstName[0]}</Image>}
                                        </Col>
                                        <Col style={{ display: 'flex', alignItems: 'center' }} span={19}>
                                            {data.type == 1 ?
                                                <Text style={{ whiteSpace: 'pre-wrap' }} >{`${data.from_data[0]?.firstName + data.from_data[0]?.lastName} wants to follow you`}</Text>
                                                : data.type == 2 ?
                                                    <Text style={{ whiteSpace: 'pre-wrap' }} >{`${data.onOff == true ? `${data.from_data[0]?.firstName + "  " + data.from_data[0]?.lastName} is Available` : `${data.from_data[0]?.firstName + "  " + data.from_data[0]?.lastName}  is not Available`}`}</Text>
                                                    : data.type == 3 ?
                                                        <Text style={{ whiteSpace: 'pre-wrap' }}>{`${data.from_data[0]?.firstName + data.from_data[0]?.lastName} accepted your follow request`}</Text>
                                                        : null}
                                        </Col>
                                    </Row>
                                </Menu.Item>
                            </Link>
                            : null}
                    </div>

                )}
                <Menu.Item className='no-padding-notification' key="4">
                    <Link to='../notification'>
                        <Row className='view-all p-0 m-0'>View All</Row>
                    </Link>
                </Menu.Item>
            </div>

        </Menu>

    );

    const [loader, setLoader] = useState(false)

    const [reload, setReload] = useState(false)

    const [isModalVisible, setIsModalVisible] = useState(false);

    async function submitImage(props) {


        localStorage.setItem("profileImage", profileImage)

        let data = {

            type: 1,
            image: profileImage

        }

        try {
            setLoader(true)

            let resultHandle = await ChangeProfileImage(data);

            if (resultHandle?.success == true) {

                setLoader(false)

                setIsModalVisible(false)
                // window.location.reload(false);
            }

            else {
                validateMessages(resultHandle);
                setLoader(false)
                setIsModalVisible(false)
                setReload(!reload)
            }

        }
        catch (err) {
            console.log(err)
            setLoader(false)
            setIsModalVisible(false)

        }

    }


    const [profile, setGetProfile] = useState({})

    const loadprofile = async () => {
        try {
            setLoader(true)

            let resultHandle = await GetProfile();

            if (resultHandle?.success == true) {
                setGetProfile(resultHandle?.message?.foundUser[0])
                setLoader(false)
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
    useEffect(() => {
        loadprofile();
    }, [reload])

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    function submit(file) {
        console.log(file)
    }

    const [test, setTest] = useState(false)

    function submitSearch() {
        // window.location.href = '/search';
        if (searchField) {
            history.push({
                pathname: '/search',
                state: searchField
            });
            setTest(!test)
        }

        else {
            console.log("empty")
        }

    }
    function shareProfile() {
        navigator.clipboard.writeText(`${window.location.origin}/profile/${profile.username}`);
        message.info(`copy to clipboard`);

        console.log(`${window.location.origin}/profile/${profile.username}`)
        // console.log(profile)
    }
    function test2(e) {
        if (e.key === 'Enter') {
            if (searchField) {
                history.push({
                    pathname: '/search',
                    state: searchField
                });
                setTest(!test)
            }

            else {
                console.log("empty")
            }
        }
    }


    async function signOut() {

        localStorage.clear()
        history.push('/login')



        // let data = {

        //     emailAddress: profile?.emailAddress,
        //     firebaseToken: profile?.firebaseToken,
        // }
        // try {

        //     setLoader(true)

        //     let resultHandle = await Logout(data);

        //     if (resultHandle?.success == true) {

        //         setLoader(false)
        //         window.localStorage.clear();
        //         history.push('./login')

        //     }

        //     else {
        //         validateMessages(resultHandle);
        //         setLoader(false)
        //     }

        // }
        // catch (err) {
        //     console.log(err)
        //     setLoader(false)
        // }
    }

    return (
        <div>
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
            <div className="site-page-header-ghost-wrapper">

                <PageHeader
                    className="site-page-header"
                    title={<Image style={{ cursor: 'pointer' }} src={MenuIcon} preview={false} onClick={toggle} />}


                    ghost={false}
                    extra={[
                        <Input style={{ display: authenticate == true ? null : "none", marginRight: "20px" }} className="search-bar-custom" placeholder="Search" onKeyDown={test2} onChange={(e) => setSearchField(e.target.value)} suffix={<SearchOutlined onClick={submitSearch} style={{ fontSize: '20px' }} />} />,


                        <Dropdown.Button style={{ display: authenticate == true ? null : "none", paddingTop: '20px' }} className="notifications-custom" overlay={menu} trigger={['click']} placement="bottomRight" icon={!unRead ? <BellOutlined style={{ fontSize: '25px' }} /> : <div style={{ display: "flex", height: "100%" }}><p style={{ fontSize: "70px", color: "#F1171C", marginTop: "-72px", zIndex: "999" }}>.</p><BellOutlined style={{ fontSize: '25px', position: "absolute" }} /></div>}>
                        </Dropdown.Button>,
                        // <Image className="mt-3" preview={false} src={profile?.profilePicUrl + "?" + Math.random() || DefaultImage} width={30} height={30} />
                    ]}
                >
                </PageHeader>

            </div>


            <Sider width={300} collapsedWidth={0} className="custom-sidebar position-relative" trigger={null} collapsible collapsed={collapsed}>
                <Row style={{ position: 'relative' }} className="d-flex justify-content-center mt-5">
                    {profile?.profilePicUrl ?
                        <Image preview={false} style={{ borderRadius: '50%' }} width={150} height={150} src={profile?.profilePicUrl + "?" + Math.random()} />
                        :
                        <Image preview={false} width={150} height={150} src={DefaultImage} />

                    }
                    {/* <Image preview={false} width={150} height={150} src={profile?.profilePicUrl + "?" + Math.random() || DefaultImage} /> */}

                    <PlusOutlined onClick={showModal} className='add-picture' />

                </Row>

                {authenticate == true ?
                    <Row className="justify-content-center mt-3">

                        <Link to={`../profile-1`}
                        >
                            View Profile
                        </Link>
                    </Row>
                    : ""}
                <Menu className="sidebar-menu" theme="light" mode="inline" defaultSelectedKeys={['1']}>
                    {authenticate == true ?
                        <div>
                            <Link to="../following" >
                                <Menu.Item icon={<HomeOutlined className="font-30" />} key="993" >
                                    Home
                                </Menu.Item>
                            </Link>
                            <Link to="../users">
                                <Menu.Item icon={<UsergroupAddOutlined className="font-30" />} key="1" >
                                    Followers / Following
                                </Menu.Item>
                            </Link>
                            <Link to="../notification">
                                <Menu.Item icon={<NotificationOutlined className="font-30" />} key="3" >
                                    Notifications
                                </Menu.Item>
                            </Link>
                            <Link to="#" >
                                <Menu.Item icon={<ProfileOutlined className="font-30" />} onClick={() => shareProfile()} key="4" >
                                    Share profile link
                                </Menu.Item>
                            </Link>
                            {/* <Link to="./login"> */}
                            <Menu.Item onClick={signOut} icon={<LogoutOutlined className="font-30" />} key="5" >
                                Sign out
                            </Menu.Item>
                            {/* </Link> */}
                            :
                        </div>
                        :
                        <div>
                            <Link to="../login">
                                <Menu.Item icon={<UsergroupAddOutlined className="font-30" />} key="1" >
                                    Login
                                </Menu.Item>
                            </Link>
                        </div>
                    }
                    {/* <Row className="sidebar-icon" style={{position:'absolute', bottom:'100px', right:'0px', fontSize:'30px', color:'white'}}>
                                {React.createElement(collapsed ? ArrowRightOutlined : ArrowLeftOutlined, {
                                className: 'trigger',
                                onClick: toggle,
                                })}
                            </Row> */}
                </Menu>
            </Sider>
        </div>
    )
}

export default Header
