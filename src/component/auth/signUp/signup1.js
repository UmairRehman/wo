import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Form, Input, Button, Checkbox, notification, Spin } from 'antd';
import { FacebookOutlined } from '@ant-design/icons';
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import {
    Link
} from "react-router-dom";

import { useHistory } from "react-router-dom";

import { SignupApi } from '../../../services/apiInteraction';

import { patterns } from '../../Regix';
import { CheckLogin } from '../../../services/apiInteraction';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

// import CSS 
import '../auth.css'

const { Title, Text } = Typography;


const validateMessages = (data) => {
    const args = {
        message: 'Error',
        description:
            `${data?.message}`,
        duration: 5,
    };
    notification.error(args);
};


const validateMessagesSocial = (message) => {
    const args = {
        message: 'Error',
        description:
            `${message}`,
        duration: 5,
    };
    notification.error(args);
};



function Signup() {

    let history = useHistory();

    const [passwordError, setPasswordError] = useState(false)

    const [error, setError] = useState(false)

    const [loader, setLoader] = useState(false)

    const [facebookLogin, setFacebookLogin] = useState(false)

    const [gmailLogin, setGmailLogin] = useState(false)



    const responseFacebook = async (response) => {
        console.log("facebook responce" + response);

        setFacebookLogin(!facebookLogin)
        // setData(response);
        // setPicture(response.picture.data.url);
        // if login success 
        if (response.accessToken) {
            let data = {
                provider: 'FB',
                token: response.accessToken
            }
            console.log(response)

            try {

                setLoader(true)
                let resultHandle = await CheckLogin(data);

                console.log(resultHandle.message.login)
                if (resultHandle?.success == true) {

                    if (resultHandle.message.login == false) {

                        localStorage.setItem('token', resultHandle?.message?.accessToken)
                        history.push("/signup-1");
                    }

                    else if (resultHandle.message.login == true) {

                        setLoader(false)
                        localStorage.setItem('token', response.accessToken)
                        localStorage.setItem('user', JSON.stringify(resultHandle.message.foundUser))
                        localStorage.setItem('email', resultHandle.message.foundUser.emailAddress)
                        localStorage.setItem('provider', resultHandle.message.foundUser.provider)
                        history.push("/select");
                    }
                }
                else {
                    validateMessages(
                        {
                            message: 'Allready have an account from other social app'
                        }
                    );
                    setLoader(false)
                }

                setLoader(false)

            }

            catch (err) {
                console.log(err)
                setLoader(false)

            }


        } else {
            // setLogin(false);
            validateMessagesSocial("Unknown Error, Contact to support");
            setLoader(false)
        }
    }


    const responseGoogle = async (response) => {
        console.log(response);



        if (response.accessToken) {

            let data = {

                provider: 'Google',
                token: response.accessToken

            }
            console.log(response.accessToken)

            try {

                setLoader(true)
                let resultHandle = await CheckLogin(data);

                console.log(resultHandle.message.login)
                if (resultHandle?.success == true) {
                    setLoader(false)
                    if (resultHandle.message.login == false) {

                        localStorage.setItem('token', resultHandle?.message?.accessToken)
                        history.push("/signup-1");
                    }

                    else if (resultHandle.message.login == true) {

                        setLoader(false)
                        localStorage.setItem('token', response.accessToken)
                        localStorage.setItem('user', JSON.stringify(resultHandle.message.foundUser))
                        localStorage.setItem('email', resultHandle.message.foundUser.emailAddress)
                        localStorage.setItem('provider', resultHandle.message.foundUser.provider)
                        history.push("/select");
                    }
                    else {
                        validateMessagesSocial("Unknown Error, Contact to support");
                    }

                }
                else {
                    validateMessages(
                        {
                            message: 'Allready have an account from other social app'
                        }
                    );
                    setLoader(false)
                }

            }

            catch (err) {
                console.log(err)
                setLoader(false)

            }


        } else {
            validateMessagesSocial("Unknown Error, Contact to support");
            setLoader(false)
        }

    }


    const onFinish = async (values) => {

        let password = values.password.match(patterns.password)

        let data = {
            emailAddress: values.email.toLowerCase(),
            password: values.password,
            Cpassword: values.confirmPassword
        }

        if (password) {

            try {
                let resultHandle = await SignupApi(data)
                console.log(resultHandle)

                if (resultHandle.success == true) {
                    if (resultHandle.success == true) {

                        setLoader(false)
                        console.log(data)
                        localStorage.setItem('email', data.emailAddress)
                        localStorage.setItem('token', resultHandle.message.accessToken)
                        setLoader(false)

                        history.push("/signup-1");

                    }

                    else {
                        validateMessages(resultHandle);
                        setLoader(false)

                    }
                }

                else {
                    validateMessages(resultHandle);
                    setLoader(false)

                }

            }
            catch (err) {

                setLoader(false)
                console.log(err)

            }


        }

        else {
            setPasswordError(true)
        }

    };



    return (
        <div style={{ height: '100vh', position: 'relative' }} className="gray-background position-relative">
            <Spin className="loader" spinning={loader} size="large" />
            <Row style={{ height: '100vh', position: 'relative' }}>
                <Col md={8} xs={24} >

                </Col>
                <Col style={{ alignSelf: 'center', justifyContent: 'center', display: 'flex' }} className="position-relative" md={8} xs={24} >
                    <Card bordered={false} className="custom-card responsive-card">
                        {/* <Title level={5}></Title> */}
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                        >
                            <Form.Item

                                name="email"
                                rules={[{ type: 'email', required: true, message: 'Please input your valid email!' }]}
                            >
                                <Input className="login-field" prefix={<MdOutlineEmail className="login-fonts" />} placeholder="Email" />
                            </Form.Item>

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
                                <Input.Password
                                    className="login-field"
                                    prefix={<MdLockOutline className="login-fonts" />}
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
                                            <Checkbox>Save Password</Checkbox>
                                        </Form.Item>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item>
                                {/* <Link to="./signup-1"> */}
                                <Button type="primary" htmlType="submit" className="button mt-5 w-100" >
                                    Sign up
                                </Button>
                                {/* </Link> */}
                            </Form.Item>


                            <Form.Item>

                                <Row style={{ justifyContent: 'center' }} className='gmail-button'>
                                    <GoogleLogin
                                        clientId="679274960122-g2cbmfm6abqo1smltkl6bh4l8qbk3sbf.apps.googleusercontent.com"
                                        buttonText="Login"
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle}
                                        cookiePolicy={'single_host_origin'}
                                        className="gmail-button"
                                    />
                                </Row>
                            </Form.Item>


                            <Form.Item className="position-relative">
                                <Row style={{ justifyContent: 'center' }} className='facebook-button-span'>
                                    <FacebookLogin
                                        style={{ borderRadius: '20px' }}
                                        appId="1294356171049052"
                                        autoLoad={false}
                                        fields="name,email,picture"
                                        scope="public_profile,user_friends,email"
                                        callback={responseFacebook}
                                        icon="fa-facebook"
                                    />
                                </Row>
                            </Form.Item>

                        </Form>
                        <Row className='j-c-c'>
                            <Text>Allready have an account?
                                <Link to='./login'>
                                    <span style={{ color: '#27B824' }}> Sign in</span>
                                </Link>
                            </Text>
                        </Row>
                    </Card>
                </Col>
                <Col md={8} xs={24} >

                </Col>
            </Row>
        </div>
    )
}

export default Signup;