import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Form, Input, Button, Checkbox, Image } from 'antd';
import { FacebookOutlined } from '@ant-design/icons';
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import {
    Link
} from "react-router-dom";

import { useHistory } from "react-router-dom";

// import CSS 
import '../auth.css'

const { Title, Paragraph } = Typography;

function SignupConfirmationEmail() {

    const onFinish = (values) => {
    };

    return (
        <div style={{ height: '100vh', position: 'relative' }} className="gray-background">
            <Row style={{ height: '100vh', position: 'relative' }}>
                <Col md={8} xs={24} >

                </Col>
                <Col style={{ alignSelf: 'center', justifyContent: 'center', display: 'flex' }} className="position-relative" md={8} xs={24} >
                    <Card bordered={false} className="custom-card responsive-card">
                        <Title className="d-flex justify-content-center" level={5}>Enter confirmation code</Title>
                        <Paragraph style={{ textAlign: 'center' }}>Enter the confirmation code we sent to who'son@gmail.com</Paragraph>

                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="ConfirmationCode"
                                rules={[{ required: true, message: 'Please input your Username!' }]}
                            >
                                <Input className="login-field" placeholder="Varification Code" />
                            </Form.Item>

                            <Form.Item className="position-relative">
                                <Link to="/username">
                                    <Button
                                        type="primary" htmlType="submit" className="button mt-5 w-100" >
                                        Next
                                    </Button>
                                </Link>
                            </Form.Item>
                        </Form>
                        <p style={{ position: 'absolute', bottom: '0px', left: '0px', width: '100%' }} className="d-flex justify-content-center g-color font-16">Resend Code</p>
                    </Card>
                </Col>
                <Col md={8} xs={24} >

                </Col>
            </Row>
        </div>
    )
}

export default SignupConfirmationEmail;