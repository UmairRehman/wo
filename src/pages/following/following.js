import React from 'react'

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';

import { Layout, Image, Row, Col, Typography, Card, Button } from 'antd';
import Suggest from '../../assets/images/suggest.png'
import Sidebar from '../../component/sidebar/sidebar';
import Header from '../../component/header/header';
import FollowingCard from '../../component/following/followingCard';
import { Link } from 'react-router-dom';
import './following.css'

function Following() {

    const { Content } = Layout;
    const { Title, Text, Paragraph } = Typography;

    return (
        <div className="animation2 ">
            <div className="test">
                <Header />
            </div>

            <div style={{ paddingLeft: '5%', paddingRight: '5%' }} className="content ant-page- ">
                <Title level={3}>Following</Title>
                <div>
                    <FollowingCard />
                </div>
                
                <Row className="mt-5 d-flex" >
                    <Col span={20}>
                        <Title  level={3}>Suggested for you</Title>                
                    </Col>
                    <Col style={{justifyContent:'end', display:'flex'}} span={4}>
                        <Link to='./suggest' >See All</Link>
                    </Col>
                </Row>

                <div>
                    <Row>
                     
                        <Col md={12}>
                            <Card style={{borderRadius:'30px' , margin:'20px'}} className="gray-background ">
                                <Row>
                                    <Col className="mobile-center" md={4} xs={24} >
                                        <Image style={{maxWidth:'120px', maxHeight:'120px'}} preview={false} className="border-50 d-flex justify-content-center" src={Suggest} />
                                    </Col>
                                    <Col style={{alignSelf:'center'}} md={16} xs={24}>
                                        <Row className="mobile-center" style={{paddingLeft:'20px'}}>
                                            <Title level={4} className="m-0">
                                                Tom Mathew
                                            </Title>
                                        </Row>
                                        <Row className="mobile-center" style={{paddingLeft:'20px'}}>
                                            <Paragraph level={5}>    
                                                Barber
                                            </Paragraph>
                                        </Row>
                                    </Col>
                                    <Col className="mobile-center" style={{alignSelf:'center'}} md={4} xs={24}>
                                        <Button className="follow-button">
                                            Follow
                                        </Button>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>

                        <Col md={12}>
                            <Card style={{borderRadius:'30px' , margin:'20px'}} className="gray-background ">
                                <Row>
                                    <Col className="mobile-center" md={4} xs={24} >
                                        <Image style={{maxWidth:'120px', maxHeight:'120px'}} preview={false} className="border-50 d-flex justify-content-center" src={Suggest} />
                                    </Col>
                                    <Col style={{alignSelf:'center'}} md={16} xs={24}>
                                        <Row className="mobile-center" style={{paddingLeft:'20px'}}>
                                            <Title level={4} className="m-0">
                                                Tom Mathew
                                            </Title>
                                        </Row>
                                        <Row className="mobile-center" style={{paddingLeft:'20px'}}>
                                            <Paragraph level={5}>    
                                                Barber
                                            </Paragraph>
                                        </Row>
                                    </Col>
                                    <Col className="mobile-center" style={{alignSelf:'center'}} md={4} xs={24}>
                                        <Button className="follow-button">
                                            Follow
                                        </Button>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>

                        <Col md={12}>
                            <Card style={{borderRadius:'30px' , margin:'20px'}} className="gray-background ">
                                <Row>
                                    <Col className="mobile-center" md={4} xs={24} >
                                        <Image style={{maxWidth:'120px', maxHeight:'120px'}} preview={false} className="border-50 d-flex justify-content-center" src={Suggest} />
                                    </Col>
                                    <Col style={{alignSelf:'center'}} md={16} xs={24}>
                                        <Row className="mobile-center" style={{paddingLeft:'20px'}}>
                                            <Title level={4} className="m-0">
                                                Tom Mathew
                                            </Title>
                                        </Row>
                                        <Row className="mobile-center" style={{paddingLeft:'20px'}}>
                                            <Paragraph level={5}>    
                                                Barber
                                            </Paragraph>
                                        </Row>
                                    </Col>
                                    <Col className="mobile-center" style={{alignSelf:'center'}} md={4} xs={24}>
                                        <Button className="follow-button">
                                            Follow
                                        </Button>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>

                        <Col md={12}>
                            <Card style={{borderRadius:'30px' , margin:'20px'}} className="gray-background ">
                                <Row>
                                    <Col className="mobile-center" md={4} xs={24} >
                                        <Image style={{maxWidth:'120px', maxHeight:'120px'}} preview={false} className="border-50 d-flex justify-content-center" src={Suggest} />
                                    </Col>
                                    <Col style={{alignSelf:'center'}} md={16} xs={24}>
                                        <Row className="mobile-center" style={{paddingLeft:'20px'}}>
                                            <Title level={4} className="m-0">
                                                Tom Mathew
                                            </Title>
                                        </Row>
                                        <Row className="mobile-center" style={{paddingLeft:'20px'}}>
                                            <Paragraph level={5}>    
                                                Barber
                                            </Paragraph>
                                        </Row>
                                    </Col>
                                    <Col className="mobile-center" style={{alignSelf:'center'}} md={4} xs={24}>
                                        <Button className="follow-button">
                                            Follow
                                        </Button>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>


                    </Row>
                    
                </div>
            </div>

        </div>
    )
}

export default Following
