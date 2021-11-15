import React, {useState} from 'react'
import { Layout, Menu, Image, Row } from 'antd';
import {
    UsergroupAddOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
  MessageOutlined,
  NotificationOutlined,
  ProfileOutlined,
  LogoutOutlined
} from '@ant-design/icons';

import './sidebar.css'
import User from '../../assets/images/user.png'

const { Header, Sider, Content } = Layout;

function Sidebar() {


    const [collapsed, setCollapsed] = useState(false)

    function toggle(){
        setCollapsed(!collapsed)
    }

    return (
        <div>
            <Sider width={300} className="custom-sidebar position-relative" trigger={null} collapsible collapsed={collapsed}>
            <Row className="d-flex justify-content-center mt-5">
                <Image style={{borderRadius:'50%', height:'150px', width:'150px'}} preview={false}  src={User} />
            </Row>    
                <Menu className="sidebar-menu" theme="light" mode="inline" 
                // defaultSelectedKeys={['1']}
                >
                    <Menu.Item icon={<UsergroupAddOutlined className="font-30"/>} key="1" >
                    Followers / Following
                    </Menu.Item>
                    <Menu.Item icon={<MessageOutlined className="font-30"/>} key="2" >
                    Message
                    </Menu.Item>
                    <Menu.Item icon={<NotificationOutlined className="font-30"/>} key="3" >
                    Notifications
                    </Menu.Item>
                    <Menu.Item icon={<ProfileOutlined className="font-30"/>} key="4" >
                    Share profile link
                    </Menu.Item>
                    <Menu.Item icon={<LogoutOutlined className="font-30"/>} key="5" >
                    Sign out
                    </Menu.Item>
                    <Row className="sidebar-icon" style={{position:'absolute', bottom:'100px', right:'0px', fontSize:'30px', color:'white'}}>
                        {React.createElement(collapsed ? ArrowRightOutlined : ArrowLeftOutlined, {
                        className: 'trigger',
                        onClick: toggle,
                        })}
                    </Row>
                </Menu>
            </Sider>
        </div>
    )
}

export default Sidebar
