import React from 'react'

import {
    DownOutlined
} from '@ant-design/icons';

import { Layout, Dropdown, Image, Row, Col, Typography, Card, Button, Menu, message, Form, Input } from 'antd';
import SuggestIcon from '../../assets/images/suggest.png'
import Sidebar from '../../component/sidebar/sidebar';
import Header from '../../component/header/header';
import FollowingCard from '../../component/following/followingCard';
import { Link } from 'react-router-dom';
import Option from '../../assets/images/option.png'
import Bell from '../../assets/images/bell.jpg'
import Line from '../../assets/images/line.png'



import './profile.css'


function Profile() {

    const { Content } = Layout;
    const { Title, Text, Paragraph } = Typography;

    function handleMenuClick(e) {
        message.info('Click on menu item.');
        console.log('click', e);
    }

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

    const shareDropdowm = (
        <Menu className="notification-dropdown" onClick={handleMenuClick}>
            <Menu.Item key="1">
                <Paragraph style={{ marginBottom: '10px' }}>Share profile via message</Paragraph>
            </Menu.Item>
            <Menu.Item key="2">
                <Paragraph style={{ marginBottom: '0px' }}>Share profile via</Paragraph>
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



    return (
        <div className="animation2 " >
            <div className="test" >
                <Header />
            </div>

            <div style={{ paddingLeft: '5%', paddingRight: '5%' }} className="content ant-page- " >
                <Row className="mt-5" >
                    <Col md={3} xs={6} >
                        <Image className="border-50" src={SuggestIcon} />
                    </Col>

                    <Col style={{ alignSelf: 'center' }} md={2} xs={6} >
                        <Row>
                            <Paragraph className="follower-counter" > 40 </Paragraph>
                        </Row>
                        <Row>
                            <Paragraph className="follower-heading" > Followers </Paragraph>
                        </Row >
                    </Col>

                    <Col style={{ alignSelf: 'center' }} md={2} xs={6} >
                        <Row >
                            <Paragraph className="follower-counter" > 32 </Paragraph>
                        </Row >
                        <Row>
                            <Paragraph className="follower-heading" > Following </Paragraph>
                        </Row>
                    </Col>

                    <Col style={{ alignSelf: 'center', display: 'flex', justifyContent: 'end' }} md={17} xs={6} >
                        <Dropdown style={{ border: 'none' }}
                            overlay={profileBellIcon}
                            placement="bottomRight" >
                            <Button style={{ border: 'none' }} >
                                <Image style={{ width: 'inherit' }} preview={false} src={Bell} />
                            </Button>
                        </Dropdown>
                        <Dropdown style={{ border: 'none' }} overlay={optionDropDown} placement="bottomRight" >
                            <Button style={{ border: 'none' }} >
                                <Image style={{ width: 'inherit' }} preview={false} src={Option} /> </Button>
                        </Dropdown>
                    </Col>

                </Row>
                <Row className="" >
                    <Row className='w-100'>
                        <Title level={5}>Kelly Morgan</Title>
                    </Row>
                    <Row className='w-100'>
                        <Paragraph>Barber</Paragraph>
                    </Row>
                </Row >

                <Row >
                    <Row className='w-100'>
                        <Col md={12} xs={24}>
                            <Paragraph>Lorem ipsum dolor sit amet, consetetur pscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</Paragraph>
                            <Paragraph>Followed by john hales<span className="g-color anchor">, Alexander and 35 others</span></Paragraph>
                        </Col>
                        <Col className="justify-content-end" md={12} xs={24}>
                            <Dropdown className="gray-background following-dropdown mr-2" overlay={followingDropdown} placement="bottomRight" arrow>
                                <Button className="following-dropdown-button">Following <DownOutlined /></Button>
                            </Dropdown>

                            <Button style={{ border: 'none' }} className="gray-background mr-2 following-dropdown-button">Message </Button>

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
                    <Title level={4}>Services</Title>
                </Row>

                <Row className="mt-3">
                    <Col md={12} xs={24} >

                        <Row>
                            <Col span={6}>
                                <Paragraph className="font-18">Shave</Paragraph>
                            </Col>
                            <Col span={6}>
                                <Image src={Line} preview={false} />
                            </Col>
                            <Col span={6} className="justify-content-end">
                                <Paragraph className="font-18" strong={true}>100$</Paragraph>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={6}>
                                <Paragraph className="font-18">Hair Cut</Paragraph>
                            </Col>
                            <Col span={6}>
                                <Image src={Line} preview={false} />
                            </Col>
                            <Col span={6} className="justify-content-end">
                                <Paragraph className="font-18" strong={true}>50$</Paragraph>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={6}>
                                <Paragraph className="font-18">Facial</Paragraph>
                            </Col>
                            <Col span={6}>
                                <Image src={Line} preview={false} />
                            </Col>
                            <Col span={6} className="justify-content-end">
                                <Paragraph className="font-18" strong={true}>22$</Paragraph>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={6}>
                                <Paragraph className="font-18">Hair Color</Paragraph>
                            </Col>
                            <Col span={6}>
                                <Image src={Line} preview={false} />
                            </Col>
                            <Col span={6} className="justify-content-end">
                                <Paragraph className="font-18" strong={true}>25$</Paragraph>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={6}>
                                <Paragraph className="font-18">Hair styling</Paragraph>
                            </Col>
                            <Col span={6}>
                                <Image src={Line} preview={false} />
                            </Col>
                            <Col span={6} className="justify-content-end">
                                <Paragraph className="font-18" strong={true}>10$</Paragraph>
                            </Col>
                        </Row>
                    </Col>
                </Row>

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
                        <Form.Item name={['user', 'introduction']}>
                            <Input.TextArea style={{border:'none', borderRadius:'10px', padding:'10px'}} rows={5} className="gray-background" placeholder="Type Text Here"/>
                        </Form.Item>

                        <Form.Item >
                            <Button type="primary" htmlType="submit" className="button-normal" > 
                            Send follow request
                            </Button>
                        </Form.Item>
                    </Form>
                </Row>

            </div>
        </div>
    )
}

export default Profile