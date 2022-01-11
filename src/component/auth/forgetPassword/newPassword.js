import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Form, Input, Button, Checkbox, notification, Spin } from 'antd';
import { FacebookOutlined } from '@ant-design/icons';
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import {
    Link
} from "react-router-dom";

import { useHistory } from "react-router-dom";

import { ForgetConfirmPassword } from '../../../services/apiInteraction';

import { patterns } from '../../Regix';


// import CSS 
import '../auth.css'

const { Title, Paragraph, Text } = Typography;

const validateMessages = (data) => {
    console.log(data)
    const args = {
        message: 'Error',
        description:
            `${data.message}`,
        duration: 5,
    };
    notification.error(args);
};


function NewPassword() {

    let history = useHistory();

    const [loader, setLoader] = useState(false)

    const [passwordError, setPasswordError] = useState(false)

    const onFinish = async (values) => {

        console.log('Received values of form: ', values);

        let password = values.password.match(patterns.password)

        let data = {
            password: values.password,
            Cpassword: values.Cpassword
        }

        if (password) {
            try {
                setLoader(true)
                let resultHandle = await ForgetConfirmPassword(data)

                if (resultHandle?.success == true) {

                    if (resultHandle?.success == true) {
                        setLoader(false)
                        localStorage.setItem('token' , resultHandle.message.accessToken)
                        history.push('./varified')
                    }

                    else {
                        validateMessages(resultHandle);
                        console.log(resultHandle)
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
        }
        else {
            setPasswordError(true)
        }

    };

    return (
        <div style={{ height: '100vh', position: 'relative' }} className="gray-background">
            <Spin className="loader" spinning={loader} size="large" />
            <Row style={{ height: '100vh', position: 'relative' }}>
                <Col md={8} xs={24} >

                </Col>
                <Col style={{ alignSelf: 'center' , justifyContent:'center', display:'flex'}}  className="position-relative" md={8} xs={24} >
                    <Card bordered={false} className="custom-card responsive-card">
                        <Title className="d-flex justify-content-center" level={5}>Create new password</Title>
                        <Paragraph style={{ textAlign: 'center' }}>Your new password must be different from previous used password.</Paragraph>
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your Password!' }]}
                            >
                                <Input.Password
                                    className="login-field"
                                    prefix={<MdLockOutline className="login-fonts" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item
                                name="Cpassword"
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
                                <Input.Password
                                    className="login-field"
                                    prefix={<MdLockOutline className="login-fonts" />}
                                    type="password"
                                    placeholder="Confirm Password"
                                />
                            </Form.Item>
                            {passwordError == true ?
                                <Row>
                                    <Text type="danger">Password must containt special Characters like ("@$#*") and capital letters</Text>
                                </Row>
                                : null}
                            <Row>
                                <Col span={12} md={12} xs={24}>
                                    <Form.Item className="login-checkBox" >
                                        <Form.Item name="remember" valuePropName="checked" noStyle>
                                            <Checkbox className='text-black'>Save Password</Checkbox>
                                        </Form.Item>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="button mt-5 w-100" >
                                    Next
                                </Button>
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

export default NewPassword;