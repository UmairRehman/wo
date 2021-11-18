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

function UserName() {

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
      };

    return (
        <div style={{height:'100vh', position:'relative'}} className="gray-background">
            <Row style={{height:'100vh', position:'relative'}}>
                <Col md={8} xs={24} >
                    
                </Col>
                <Col style={{alignSelf:'center'}} className="position-relative" md={8} xs={24} >
                    <Card  bordered={false} className="custom-card responsive-card">
                        <Title className="d-flex justify-content-center" level={5}>Confirm username</Title>
                        <Paragraph style={{textAlign:'center'}}>Use a name you'd like your friends to find you with</Paragraph>

                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="ConfirmationCode"
                                rules={[{ required: true, message: 'Please input your First Name!' }]}
                            >
                                <Input className="login-field" placeholder="First Name" />
                            </Form.Item>

                            <Form.Item
                                name="ConfirmationCode"
                                rules={[{ required: true, message: 'Please input your Last Name!' }]}
                            >
                                <Input className="login-field" placeholder="Last Name" />
                            </Form.Item>

                            
                            <Form.Item
                                name="ConfirmationCode"
                                rules={[{ required: true, message: 'Please input your Username!' }]}
                            >
                                <Input className="login-field" placeholder="User Name" />
                            </Form.Item>
    
                            <Form.Item className="position-relative">
                                <Link to="/create-password">
                                    <Button
                                    type="primary" htmlType="submit" className="button mt-5 w-100" >
                                    Next
                                    </Button>
                                </Link>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
                <Col md={8} xs={24} >
                
                </Col>
            </Row>
        </div>
    )
}

export default UserName;