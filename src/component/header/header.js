import React, { useState, useEffect } from 'react'
import { Layout, Menu, Image, Row, PageHeader, Button, Input, message, Dropdown, Modal, notification, Spin } from 'antd';
import { SearchOutlined, BellOutlined, UserOutlined, PlusOutlined, MenuOutlined, ArrowLeftOutlined, UsergroupAddOutlined, LogoutOutlined, ProfileOutlined, MessageOutlined, NotificationOutlined } from '@ant-design/icons';
import User from '../../assets/images/user.png'
import {
    Link
} from "react-router-dom";
import Avatar from 'react-avatar-edit'

import UserImage from '../../assets/images/user-small.png'
import MenuIcon from '../../assets/images/menu.png'

import './header.css'
import Paragraph from 'antd/lib/skeleton/Paragraph';
import { ChangeProfileImage } from '../../services/apiInteraction';

import { GetProfile } from '../../services/apiInteraction';


const validateMessages = (data) => {
    const args = {
        message: 'Error',
        description:
            `${data?.message}`,
        duration: 5,
    };
    notification.error(args);
};


function Header() {

    const [collapsed, setCollapsed] = useState(true)

    const [profileImage, setProfileImage] = useState('')

    const [buttonDisable, setButtonDisable] = useState(false)

    const [preview, setPreview] = useState()


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
        // console.log(profileImage)
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

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1" icon={<UserOutlined />}>
                1st menu item
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
                2nd menu item
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />}>
                3rd menu item
            </Menu.Item>
        </Menu>
    );

    const [loader, setLoader] = useState(false)


    async function submitImage() {

        console.log(profileImage)

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

    const [reload, setReload] = useState(false)

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
    }, [])


    const [isModalVisible, setIsModalVisible] = useState(false);

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


    return (
        <div>
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

                {/* <Row className="sidebar-icon mt-5" style={{position:'absolute', bottom:'100px', right:'0px', fontSize:'30px', color:'white'}}>
                        {React.createElement(collapsed ? ArrowRightOutlined : ArrowLeftOutlined, {
                        className: 'trigger',
                        onClick: toggle,
                        })}
                    </Row> */}

                <PageHeader
                    className="site-page-header"
                    title={<Image style={{ cursor: 'pointer' }} src={MenuIcon} preview={false} onClick={toggle} />}


                    // title={<MenuIcon  onClick={toggle} />}
                    ghost={false}
                    extra={[
                        // <Input classNa   me="search-bar-custom" placeholder="Search" suffix={<SearchOutlined style={{fontSize:'20px'}} />} />,

                        <Dropdown.Button className="notifications-custom" style={{ paddingTop: '20px' }} overlay={menu} placement="bottomCenter" icon={<BellOutlined style={{ fontSize: '25px' }} />}>
                        </Dropdown.Button>,
                        <Image className="mt-3" preview={false} src={UserImage} width={30} height={30} />
                    ]}
                >
                </PageHeader>

            </div>

            <Sider width={300} collapsedWidth={0} className="custom-sidebar position-relative" trigger={null} collapsible collapsed={collapsed}>
                <Row style={{ position: 'relative' }} className="d-flex justify-content-center mt-5">
                    <Image preview={false} width={150} height={150} src={profile?.profilePicUrl} />
                    <PlusOutlined onClick={showModal} className='add-picture' />
                </Row>
                <Row className="justify-content-center mt-3">
                    <Link to='profile-1'>
                        View Profile
                    </Link>
                </Row>
                <Menu className="sidebar-menu" theme="light" mode="inline" defaultSelectedKeys={['1']}>
                    <Link to="./users">
                        <Menu.Item icon={<UsergroupAddOutlined className="font-30" />} key="1" >
                            Followers / Following
                        </Menu.Item>
                    </Link>
                    <Link to="/notification">
                        <Menu.Item icon={<NotificationOutlined className="font-30" />} key="3" >
                            Notifications
                        </Menu.Item>
                    </Link>
                    <Link to="#" >
                        <Menu.Item icon={<ProfileOutlined className="font-30" />} key="4" >
                            Share profile link
                        </Menu.Item>
                    </Link>
                    <Link to="./login">
                        <Menu.Item icon={<LogoutOutlined className="font-30" />} key="5" >
                            Sign out
                        </Menu.Item>
                    </Link>
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
