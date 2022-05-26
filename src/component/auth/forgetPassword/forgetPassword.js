import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Form, Input, Button, notification, Tabs, Spin } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import {
    Link
} from "react-router-dom";

import { useHistory } from "react-router-dom";

// import CSS 
import '../auth.css'
import { ForgetPhone } from '../../../services/apiInteraction';


import { ForgetEmail } from '../../../services/apiInteraction';

const { Title, Paragraph } = Typography;

const { TabPane } = Tabs;

function callback(key) {
}


const validateMessages = (data) => {
    const args = {
        message: 'Error',
        description:
            `${data.message}`,
        duration: 5,
    };
    notification.error(args);
};


function ForgetPassword() {

    let history = useHistory();

    const [loader, setLoader] = useState(false)

    const [error, setError] = useState(false)

    const onFinish = async (values) => {
        setLoader(true)

        let data = {
            phoneNumber: values.phoneNumber
        }

        try {

            let resultHandle = await ForgetPhone(data)

            if (resultHandle?.success == true) {

                if (resultHandle?.success == true) {
                    setLoader(false)
                    localStorage.setItem('token', resultHandle?.message?.accessToken)
                    history.push('./forget-confirmation')
                }

                else {
                    validateMessages(resultHandle);
                    setLoader(false)
                }

            }

            else {

                console.log("error")
                validateMessages(resultHandle);
                setLoader(false)

            }
        }
        catch (err) {
            console.log(err)
        }
    };



    const onFinishEmail = async (values) => {
        setLoader(true)
        let data = {
            emailAddress: values.email
        }

        try {

            let resultHandle = await ForgetEmail(data)

            if (resultHandle?.success == true) {
                if (resultHandle?.success == true) {
                    setLoader(false)
                    localStorage.setItem('token', resultHandle?.message?.accessToken)
                    history.push('./forget-confirmation')
                }
                else {
                    validateMessages(resultHandle);
                    setLoader(false)
                }
            }
            else {
                console.log("error")
                validateMessages(resultHandle);
                setLoader(false)
            }
        }
        catch (err) {
            console.log(err)
        }


    };

    return (
        <div style={{ height: '100vh', position: 'relative' }} className="gray-background">
            <Spin className="loader" spinning={loader} size="large" />
            <Row style={{ height: '100vh', position: 'relative' }}>
                <Col md={8} xs={24} >

                </Col>
                <Col style={{ alignSelf: 'center', justifyContent: 'center', display: 'flex' }} className="position-relative" md={8} xs={24} >
                    <Card bordered={false} className="custom-card responsive-card">
                        <Title className="d-flex justify-content-center" level={5}>Reset Password</Title>

                        <Tabs defaultActiveKey="1" onChange={callback} centered>
                            <TabPane tab="Phone Number" key="1">

                                <Paragraph style={{ textAlign: 'center' }}>
                                    You will receive a password reset code via SMS at the phone number associated with your account. Standard messaging and data rates may apply.
                                </Paragraph>

                                <Form
                                    name="normal_login"
                                    className="login-form mt-5"
                                    initialValues={{ remember: true }}
                                    onFinish={onFinish}
                                >
                                    <Form.Item
                                        name="phoneNumber"
                                        rules={[{ required: true, message: 'Please input your phone number!' }]}
                                    >
                                        <Input className="login-field" prefix={<PhoneOutlined className="login-fonts rotate-180" />} placeholder="Phone Number" />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" className="button mt-5 w-100" >
                                            Next
                                        </Button>
                                    </Form.Item>
                                </Form>
                                <Paragraph className="mt-5" style={{ textAlign: 'center' }}>You may receive SMS updates from WHO'S ON and can opt out any time.</Paragraph>

                            </TabPane>
                            <TabPane tab="Email Address" key="2">

                                <Paragraph style={{ textAlign: 'center' }}>
                                    You will receive a password reset code at the email address associated with your account.
                                </Paragraph>
                                <Form
                                    name="normal_login"
                                    className="login-form mt-5"
                                    initialValues={{ remember: true }}
                                    onFinish={onFinishEmail}
                                >
                                    <Form.Item
                                        name="email"
                                        rules={[{ required: true, message: 'Please input your Email address!' }]}
                                    >
                                        <Input className="login-field" prefix={<MdOutlineEmail className="login-fonts" />} placeholder="Email Address" />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" className="button mt-5 w-100" >
                                            Next
                                        </Button>
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

export default ForgetPassword;