import React, { useState } from 'react'
import { Layout, Menu, Image, Row, PageHeader, Button, Input, message, Dropdown } from 'antd';
import { SearchOutlined, BellOutlined, UserOutlined, QrcodeOutlined, MenuOutlined, ArrowLeftOutlined, UsergroupAddOutlined, LogoutOutlined, ProfileOutlined, MessageOutlined, NotificationOutlined } from '@ant-design/icons';
import User from '../../assets/images/user.png'
import {
    Link
} from "react-router-dom";
import UserImage from '../../assets/images/user-small.png'
import MenuIcon from '../../assets/images/menu.png'

import './header.css'
import Paragraph from 'antd/lib/skeleton/Paragraph';

function Header() {

    const [collapsed, setCollapsed] = useState(true)

    const { Sider } = Layout;


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


    return (
            <div >
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
                    <Row className="d-flex justify-content-center mt-5">
                        <Image preview={false} width={150} height={150} src={User} />
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
