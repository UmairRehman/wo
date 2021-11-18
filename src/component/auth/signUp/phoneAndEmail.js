import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Form, Input, Button, Checkbox, Tabs } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import {
    Link
} from "react-router-dom";

import { useHistory } from "react-router-dom";

// import CSS 
import '../auth.css'

const { Title, Paragraph } = Typography;

const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}

function PhoneAndEmail() {

    const [activeTabKey, setActiveTabKey] = useState('1')

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        setActiveTabKey('2')
        console.log(activeTabKey)
    };
    const onFinishEmail = (values) => {
        console.log('Received values of form: ', values);
    };

    return (
        <div style={{ height: '100vh', position: 'relative' }} className="gray-background">
            <Row style={{ height: '100vh', position: 'relative' }}>
                <Col md={8} xs={24} >

                </Col>
                <Col style={{ alignSelf: 'center' }} className="position-relative" md={8} xs={24} >
                    <Card bordered={false} className="custom-card responsive-card">
                        <Title className="d-flex justify-content-center" level={4}>Enter phone number or email address</Title>

                        <Tabs className="mt-5" defaultActiveKey="1" activeKey={activeTabKey} onChange={callback} centered>
                            <TabPane tab="Phone Number" key="1">
                                <Form
                                    name="normal_login"
                                    className="login-form mt-5"
                                    initialValues={{ remember: true }}
                                    onFinish={onFinish}
                                >
                                    <Form.Item
                                        name="username"
                                        rules={[{ required: true, message: 'Please input your Phone Number!' }]}
                                    >
                                        <Input className="login-field" prefix={<PhoneOutlined className="login-fonts" />} placeholder="Phone Number" />
                                    </Form.Item>
                                    <Form.Item>
                                        {/* <Link to="/forget-confirmation"> */}
                                            <Button type="primary" htmlType="submit" className="button mt-5 w-100" >
                                                Next
                                            </Button>
                                        {/* </Link> */}
                                    </Form.Item>
                                </Form>
                                <Paragraph className="mt-5" style={{ textAlign: 'center' }}>You may receive SMS updates from WHO'S ON and can opt out any time.</Paragraph>

                            </TabPane>
                            <TabPane tab="Email Address" key="2">
                                <Form
                                    name="normal_login"
                                    className="login-form mt-5"
                                    initialValues={{ remember: true }}
                                    onFinish={onFinishEmail}
                                >
                                    <Form.Item
                                        name="Email"
                                        rules={[{ required: true, message: 'Please input your Username!' }]}
                                    >
                                        <Input className="login-field" prefix={<MdOutlineEmail className="login-fonts" />} placeholder="Username" />
                                    </Form.Item>
                                    <Form.Item>
                                        <Link to="./signup-confirmation">
                                            <Button type="primary" htmlType="submit" className="button mt-5 w-100" >
                                                Next
                                            </Button>
                                        </Link>
                                    </Form.Item>
                                </Form>
                                <Paragraph className="mt-5" style={{ textAlign: 'center' }}>You may receive code on your email address.</Paragraph>
                            </TabPane>
                        </Tabs>
                    </Card>
                </Col>
                <Col md={8} xs={24} >

                </Col>
            </Row>
        </div>
    )
}

export default PhoneAndEmail;