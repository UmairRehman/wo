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

function EnterPassword() {

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
      };

    return (
        <div style={{height:'100vh', position:'relative'}} className="gray-background">
            <Row style={{height:'100vh', position:'relative'}}>
                <Col md={8} xs={24} >
                    
                </Col>
                <Col style={{ alignSelf: 'center' , justifyContent:'center', display:'flex'}}  className="position-relative" md={8} xs={24} >
                    <Card  bordered={false} className="custom-card responsive-card">
                        <Title className="d-flex justify-content-center" level={5}>Create new password</Title>
                        <Paragraph style={{textAlign:'center'}}>Your new password must be different from previous used password.</Paragraph>
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                        >
                             <Form.Item
                                name="password"
                                rules={[
                                    {
                                      required: true,
                                      message: 'Please input your password!',
                                    },
                                  ]}
                                  hasFeedback
                            >
                                <Input
                                className="login-field"
                                prefix={<MdLockOutline  className="login-fonts"  />}
                                type="password"
                                placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item
                                name="confirmPassword"
                                dependencies={['password']}
                                rules={[
                                    {
                                      required: true,
                                      message: 'Please confirm your password!',
                                    },
                                    ({ getFieldValue }) => ({
                                      validator(rule, value) {
                                        if (!value || getFieldValue('password') === value) {
                                          return Promise.resolve();
                                        }
                                        return Promise.reject('The two passwords that you entered do not match!');
                                      },
                                    }),
                                  ]}
                            >
                                <Input
                                className="login-field"
                                prefix={<MdLockOutline  className="login-fonts"  />}
                                type="password"
                                placeholder="Confirm Password"
                                />
                            </Form.Item>
                            <Row>
                                <Col span={12} md={12} xs={24}>
                                    <Form.Item className="login-checkBox" >
                                        <Form.Item name="remember" valuePropName="checked" noStyle>
                                        <Checkbox>Save Password</Checkbox>
                                        </Form.Item>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item>
                                <Link to="/date-of-birth">
                                    <Button type="primary" htmlType="submit" className="button mt-5 w-100" >
                                    Confirm Password
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

export default EnterPassword;