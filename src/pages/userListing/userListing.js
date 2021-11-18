import React from 'react'

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';

import { Layout, Image, Row, Col, Typography, Card, Button, Tabs, Dropdown, Menu, message } from 'antd';
import SuggestIcon from '../../assets/images/suggest.png'
import Sidebar from '../../component/sidebar/sidebar';
import Header from '../../component/header/header';
import FollowingCard from '../../component/following/followingCard';
import Suggest from '../../assets/images/suggest.png'
import optionIcon from '../../assets/images/option.png'
import { Link } from 'react-router-dom';
import './userListing.css'


const { Title, Text, Paragraph } = Typography;


function callback(key) {
    console.log(key);
}

function handleMenuClick(e) {
    message.info('Click on menu item.');
    console.log('click', e);
}

const optionDropDown = (
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


const { TabPane } = Tabs;

const FunctionalTabs = () => (
    <Tabs animated tabPosition="top" centered defaultActiveKey="1" onChange={callback}>
        <TabPane tab={<Paragraph className="font-20">35 Followers</Paragraph>} key="1">
            <Row>
                <Col md={12}>
                    <Card style={{ borderRadius: '30px', margin: '20px' }} className="gray-background ">
                        <Row>
                            <Col className="mobile-center" md={4} xs={24} >
                                <Image style={{ maxWidth: '120px', maxHeight: '120px' }} preview={false} className="border-50 d-flex justify-content-center" src={Suggest} />
                            </Col>
                            <Col style={{ alignSelf: 'center' }} md={12} xs={24}>
                                <Row className="mobile-center" style={{ paddingLeft: '20px' }}>
                                    <Title level={4} className="m-0">
                                        Tom Mathew
                                    </Title>
                                </Row>
                                <Row className="mobile-center" style={{ paddingLeft: '20px' }}>
                                    <Paragraph level={5}>
                                        Barber
                                    </Paragraph>
                                </Row>
                            </Col>
                            <Col className="mobile-center" style={{ alignSelf: 'center' }} md={8} xs={24}>
                                <Button className="follow-button">
                                    Follow
                                </Button>
                                <Button className="unfollow-button">
                                    Remove
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                </Col>

                <Col md={12}>
                    <Card style={{ borderRadius: '30px', margin: '20px' }} className="gray-background ">
                        <Row>
                            <Col className="mobile-center" md={4} xs={24} >
                                <Image style={{ maxWidth: '120px', maxHeight: '120px' }} preview={false} className="border-50 d-flex justify-content-center" src={Suggest} />
                            </Col>
                            <Col style={{ alignSelf: 'center' }} md={12} xs={24}>
                                <Row className="mobile-center" style={{ paddingLeft: '20px' }}>
                                    <Title level={4} className="m-0">
                                        Tom Mathew
                                    </Title>
                                </Row>
                                <Row className="mobile-center" style={{ paddingLeft: '20px' }}>
                                    <Paragraph level={5}>
                                        Barber
                                    </Paragraph>
                                </Row>
                            </Col>
                            <Col className="mobile-center" style={{ alignSelf: 'center' }} md={8} xs={24}>
                                <Button className="follow-button">
                                    Follow
                                </Button>
                                <Button className="unfollow-button">
                                    Remove
                                </Button>
                            </Col>

                        </Row>
                    </Card>
                </Col>

                <Col md={12}>
                    <Card style={{ borderRadius: '30px', margin: '20px' }} className="gray-background ">
                        <Row>
                            <Col className="mobile-center" md={4} xs={24} >
                                <Image style={{ maxWidth: '120px', maxHeight: '120px' }} preview={false} className="border-50 d-flex justify-content-center" src={Suggest} />
                            </Col>
                            <Col style={{ alignSelf: 'center' }} md={12} xs={24}>
                                <Row className="mobile-center" style={{ paddingLeft: '20px' }}>
                                    <Title level={4} className="m-0">
                                        Tom Mathew
                                    </Title>
                                </Row>
                                <Row className="mobile-center" style={{ paddingLeft: '20px' }}>
                                    <Paragraph level={5}>
                                        Barber
                                    </Paragraph>
                                </Row>
                            </Col>
                            <Col className="mobile-center" style={{ alignSelf: 'center' }} md={8} xs={24}>
                                <Button className="follow-button">
                                    Follow
                                </Button>
                                <Button className="unfollow-button">
                                    Remove
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                </Col>

                <Col md={12}>
                    <Card style={{ borderRadius: '30px', margin: '20px' }} className="gray-background ">
                        <Row>
                            <Col className="mobile-center" md={4} xs={24} >
                                <Image style={{ maxWidth: '120px', maxHeight: '120px' }} preview={false} className="border-50 d-flex justify-content-center" src={Suggest} />
                            </Col>
                            <Col style={{ alignSelf: 'center' }} md={12} xs={24}>
                                <Row className="mobile-center" style={{ paddingLeft: '20px' }}>
                                    <Title level={4} className="m-0">
                                        Tom Mathew
                                    </Title>
                                </Row>
                                <Row className="mobile-center" style={{ paddingLeft: '20px' }}>
                                    <Paragraph level={5}>
                                        Barber
                                    </Paragraph>
                                </Row>
                            </Col>
                            <Col className="mobile-center" style={{ alignSelf: 'center' }} md={8} xs={24}>
                                <Button className="follow-button">
                                    Follow
                                </Button>
                                <Button className="unfollow-button">
                                    Remove
                                </Button>
                            </Col>

                        </Row>
                    </Card>
                </Col>
            </Row>



        </TabPane>
        <TabPane tab={<Paragraph className="font-20">35 Following</Paragraph>} key="2">
            <Row>
                <Col md={12}>
                    <Card style={{ borderRadius: '30px', margin: '20px' }} className="gray-background ">
                        <Row>
                            <Col className="mobile-center" md={4} xs={24} >
                                <Image style={{ maxWidth: '120px', maxHeight: '120px' }} preview={false} className="border-50 d-flex justify-content-center" src={Suggest} />
                            </Col>
                            <Col style={{ alignSelf: 'center' }} md={14} xs={24}>
                                <Row className="mobile-center" style={{ paddingLeft: '20px' }}>
                                    <Title level={4} className="m-0">
                                        Tom Mathew
                                    </Title>
                                </Row>
                                <Row className="mobile-center" style={{ paddingLeft: '20px' }}>
                                    <Paragraph level={5}>
                                        Barber
                                    </Paragraph>
                                </Row>
                            </Col>
                            <Col className="mobile-center" style={{ alignSelf: 'center' }} md={4} xs={24}>
                                <Button className="follow-button">
                                    Follow
                                </Button>
                            </Col>

                            <Col className="mobile-center" style={{ alignSelf: 'center' }} md={2} xs={24}>
                                <Dropdown style={{ border: 'none' }}
                                    overlay={optionDropDown}
                                    placement="bottomRight" >
                                    <Button style={{ border: 'none', background: 'none' }} >
                                        <Image style={{ width: 'inherit' }} preview={false} src={optionIcon} />
                                    </Button>
                                </Dropdown>
                            </Col>
                        </Row>
                    </Card>
                </Col>

                <Col md={12}>
                    <Card style={{ borderRadius: '30px', margin: '20px' }} className="gray-background ">
                        <Row>
                            <Col className="mobile-center" md={4} xs={24} >
                                <Image style={{ maxWidth: '120px', maxHeight: '120px' }} preview={false} className="border-50 d-flex justify-content-center" src={Suggest} />
                            </Col>
                            <Col style={{ alignSelf: 'center' }} md={14} xs={24}>
                                <Row className="mobile-center" style={{ paddingLeft: '20px' }}>
                                    <Title level={4} className="m-0">
                                        Tom Mathew
                                    </Title>
                                </Row>
                                <Row className="mobile-center" style={{ paddingLeft: '20px' }}>
                                    <Paragraph level={5}>
                                        Barber
                                    </Paragraph>
                                </Row>
                            </Col>
                            <Col className="mobile-center" style={{ alignSelf: 'center' }} md={4} xs={24}>
                                <Button className="follow-button">
                                    Follow
                                </Button>
                            </Col>

                            <Col className="mobile-center" style={{ alignSelf: 'center' }} md={2} xs={24}>
                                <Dropdown style={{ border: 'none' }}
                                    overlay={optionDropDown}
                                    placement="bottomRight" >
                                    <Button style={{ border: 'none', background: 'none' }} >
                                        <Image style={{ width: 'inherit' }} preview={false} src={optionIcon} />
                                    </Button>
                                </Dropdown>
                            </Col>
                        </Row>
                    </Card>
                </Col>

                <Col md={12}>
                    <Card style={{ borderRadius: '30px', margin: '20px' }} className="gray-background ">
                        <Row>
                            <Col className="mobile-center" md={4} xs={24} >
                                <Image style={{ maxWidth: '120px', maxHeight: '120px' }} preview={false} className="border-50 d-flex justify-content-center" src={Suggest} />
                            </Col>
                            <Col style={{ alignSelf: 'center' }} md={14} xs={24}>
                                <Row className="mobile-center" style={{ paddingLeft: '20px' }}>
                                    <Title level={4} className="m-0">
                                        Tom Mathew
                                    </Title>
                                </Row>
                                <Row className="mobile-center" style={{ paddingLeft: '20px' }}>
                                    <Paragraph level={5}>
                                        Barber
                                    </Paragraph>
                                </Row>
                            </Col>
                            <Col className="mobile-center" style={{ alignSelf: 'center' }} md={4} xs={24}>
                                <Button className="follow-button">
                                    Follow
                                </Button>
                            </Col>

                            <Col className="mobile-center" style={{ alignSelf: 'center' }} md={2} xs={24}>
                                <Dropdown style={{ border: 'none' }}
                                    overlay={optionDropDown}
                                    placement="bottomRight" >
                                    <Button style={{ border: 'none', background: 'none' }} >
                                        <Image style={{ width: 'inherit' }} preview={false} src={optionIcon} />
                                    </Button>
                                </Dropdown>
                            </Col>
                        </Row>
                    </Card>
                </Col>

                <Col md={12}>
                    <Card style={{ borderRadius: '30px', margin: '20px' }} className="gray-background ">
                        <Row>
                            <Col className="mobile-center" md={4} xs={24} >
                                <Image style={{ maxWidth: '120px', maxHeight: '120px' }} preview={false} className="border-50 d-flex justify-content-center" src={Suggest} />
                            </Col>
                            <Col style={{ alignSelf: 'center' }} md={14} xs={24}>
                                <Row className="mobile-center" style={{ paddingLeft: '20px' }}>
                                    <Title level={4} className="m-0">
                                        Tom Mathew
                                    </Title>
                                </Row>
                                <Row className="mobile-center" style={{ paddingLeft: '20px' }}>
                                    <Paragraph level={5}>
                                        Barber
                                    </Paragraph>
                                </Row>
                            </Col>
                            <Col className="mobile-center" style={{ alignSelf: 'center' }} md={4} xs={24}>
                                <Button className="follow-button">
                                    Follow
                                </Button>
                            </Col>

                            <Col className="mobile-center" style={{ alignSelf: 'center' }} md={2} xs={24}>
                                <Dropdown style={{ border: 'none' }}
                                    overlay={optionDropDown}
                                    placement="bottomRight" >
                                    <Button style={{ border: 'none', background: 'none' }} >
                                        <Image style={{ width: 'inherit' }} preview={false} src={optionIcon} />
                                    </Button>
                                </Dropdown>
                            </Col>
                        </Row>
                    </Card>
                </Col>

                <Col md={12}>
                    <Card style={{ borderRadius: '30px', margin: '20px' }} className="gray-background ">
                        <Row>
                            <Col className="mobile-center" md={4} xs={24} >
                                <Image style={{ maxWidth: '120px', maxHeight: '120px' }} preview={false} className="border-50 d-flex justify-content-center" src={Suggest} />
                            </Col>
                            <Col style={{ alignSelf: 'center' }} md={14} xs={24}>
                                <Row className="mobile-center" style={{ paddingLeft: '20px' }}>
                                    <Title level={4} className="m-0">
                                        Tom Mathew
                                    </Title>
                                </Row>
                                <Row className="mobile-center" style={{ paddingLeft: '20px' }}>
                                    <Paragraph level={5}>
                                        Barber
                                    </Paragraph>
                                </Row>
                            </Col>
                            <Col className="mobile-center" style={{ alignSelf: 'center' }} md={4} xs={24}>
                                <Button className="follow-button">
                                    Follow
                                </Button>
                            </Col>

                            <Col className="mobile-center" style={{ alignSelf: 'center' }} md={2} xs={24}>
                                <Dropdown style={{ border: 'none' }}
                                    overlay={optionDropDown}
                                    placement="bottomRight" >
                                    <Button style={{ border: 'none', background: 'none' }} >
                                        <Image style={{ width: 'inherit' }} preview={false} src={optionIcon} />
                                    </Button>
                                </Dropdown>
                            </Col>
                        </Row>
                    </Card>
                </Col>

                <Col md={12}>
                    <Card style={{ borderRadius: '30px', margin: '20px' }} className="gray-background ">
                        <Row>
                            <Col className="mobile-center" md={4} xs={24} >
                                <Image style={{ maxWidth: '120px', maxHeight: '120px' }} preview={false} className="border-50 d-flex justify-content-center" src={Suggest} />
                            </Col>
                            <Col style={{ alignSelf: 'center' }} md={14} xs={24}>
                                <Row className="mobile-center" style={{ paddingLeft: '20px' }}>
                                    <Title level={4} className="m-0">
                                        Tom Mathew
                                    </Title>
                                </Row>
                                <Row className="mobile-center" style={{ paddingLeft: '20px' }}>
                                    <Paragraph level={5}>
                                        Barber
                                    </Paragraph>
                                </Row>
                            </Col>
                            <Col className="mobile-center" style={{ alignSelf: 'center' }} md={4} xs={24}>
                                <Button className="follow-button">
                                    Follow
                                </Button>
                            </Col>

                            <Col className="mobile-center" style={{ alignSelf: 'center' }} md={2} xs={24}>
                                <Dropdown style={{ border: 'none' }}
                                    overlay={optionDropDown}
                                    placement="bottomRight" >
                                    <Button style={{ border: 'none', background: 'none' }} >
                                        <Image style={{ width: 'inherit' }} preview={false} src={optionIcon} />
                                    </Button>
                                </Dropdown>
                            </Col>
                        </Row>
                    </Card>
                </Col>

            </Row>
        </TabPane>
    </Tabs>
);





function UserListing() {

    const { Content } = Layout;

    return (
        <div className="animation2 ">
            <div className="test">
                <Header />
            </div>

            <div style={{ paddingLeft: '5%', paddingRight: '5%' }} className="content ant-page- ">
                <FunctionalTabs />
                {/* <Row className="mt-5 d-flex" >
                    <Title level={3}>All followers</Title>
                </Row>

                <div>
                    <Row>

                        <Col md={12}>
                            <Card style={{ borderRadius: '30px', margin: '20px' }} className="gray-background ">
                                <Row>
                                    <Col className="mobile-center" md={4} xs={24} >
                                        <Image style={{ maxWidth: '120px', maxHeight: '120px' }} preview={false} className="border-50 d-flex justify-content-center" src={SuggestIcon} />
                                    </Col>
                                    <Col style={{ alignSelf: 'center' }} md={16} xs={24}>
                                        <Row className="mobile-center" style={{ paddingLeft: '20px' }}>
                                            <Title level={4} className="m-0">
                                                Tom Mathew
                                            </Title>
                                        </Row>
                                        <Row className="mobile-center" style={{ paddingLeft: '20px' }}>
                                            <Paragraph level={5}>
                                                Barber
                                            </Paragraph>
                                        </Row>
                                    </Col>
                                    <Col className="mobile-center" style={{ alignSelf: 'center' }} md={4} xs={24}>
                                        <Button className="follow-button">
                                            Follow
                                        </Button>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>

                        <Col md={12}>
                            <Card style={{ borderRadius: '30px', margin: '20px' }} className="gray-background ">
                                <Row>
                                    <Col className="mobile-center" md={4} xs={24} >
                                        <Image style={{ maxWidth: '120px', maxHeight: '120px' }} preview={false} className="border-50 d-flex justify-content-center" src={SuggestIcon} />
                                    </Col>
                                    <Col style={{ alignSelf: 'center' }} md={16} xs={24}>
                                        <Row className="mobile-center" style={{ paddingLeft: '20px' }}>
                                            <Title level={4} className="m-0">
                                                Tom Mathew
                                            </Title>
                                        </Row>
                                        <Row className="mobile-center" style={{ paddingLeft: '20px' }}>
                                            <Paragraph level={5}>
                                                Barber
                                            </Paragraph>
                                        </Row>
                                    </Col>
                                    <Col className="mobile-center" style={{ alignSelf: 'center' }} md={4} xs={24}>
                                        <Button className="follow-button">
                                            Follow
                                        </Button>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>


                    </Row>

                </div> */}


            </div>

        </div>
    )
}

export default UserListing
