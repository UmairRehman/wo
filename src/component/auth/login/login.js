import React, { useState, useEffect } from 'react';
import GoogleLogin from 'react-google-login';
import { Row, Col, Card, Typography, Form, Input, Button, Checkbox, notification, Spin } from 'antd';
import { FacebookOutlined } from '@ant-design/icons';
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import {
    Link
} from "react-router-dom";

import { useHistory } from "react-router-dom";
import { Login as LoginUser } from '../../../services/apiInteraction';
import FacebookLogin from 'react-facebook-login';
import { CheckLogin } from '../../../services/apiInteraction';


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



function Login() {

    const [user, setUser] = useState(null);

    const [customState, setCustomState] = useState(null);

    const [loader, setLoader] = useState(false)

    const [facebookLogin, setFacebookLogin] = useState(false)

    const [gmailLogin, setGmailLogin] = useState(false)

    let history = useHistory();

    const firebaseToken = localStorage.getItem('firebaseToken');

    useEffect(() => {
        const token = localStorage.getItem('user');
        if (token) history.push('/profile-1')
    }, [])

    const responseFacebook = async (response) => {

        setFacebookLogin(!facebookLogin)
        // setData(response);
        // setPicture(response.picture.data.url);
        // if login success 
        if (response.accessToken) {
            let data = {
                provider: 'FB',
                token: response.accessToken,
                firebaseToken: firebaseToken
            }

            try {

                setLoader(true)
                let resultHandle = await CheckLogin(data);

                if (resultHandle?.success == true) {

                    if (resultHandle.message.login == false) {

                        localStorage.setItem('token', resultHandle?.message?.accessToken)
                        history.push("/signup-1");
                    }

                    else if (resultHandle.message.login == true) {

                        setLoader(false)
                        localStorage.setItem('token', resultHandle?.message?.authorization)
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
            // validateMessagesSocial("Unknown Error, Contact to support");
            setLoader(false)
        }
    }


    const responseGoogle = async (response) => {

        if (response.accessToken) {

            console.log(response)

            let data = {

                provider: 'Google',
                token: response.accessToken,
                firebaseToken: firebaseToken

            }

            try {

                setLoader(true)
                let resultHandle = await CheckLogin(data);

                if (resultHandle?.success == true) {
                    setLoader(false)
                    if (resultHandle.message.login == false) {

                        localStorage.setItem('token', resultHandle?.message?.accessToken)
                        history.push("/signup-1");
                    }

                    else if (resultHandle.message.login == true) {

                        setLoader(false)
                        localStorage.setItem('token', (resultHandle?.message?.authorization))
                        localStorage.setItem('user', JSON.stringify(resultHandle.message.foundUser))
                        localStorage.setItem('email', resultHandle.message.foundUser.emailAddress)
                        localStorage.setItem('provider', resultHandle.message.foundUser.provider)
                        history.push("/select");
                    }
                    else {
                        // validateMessagesSocial("Unknown Error, Contact to support");    
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
            // setLogin(false);
            // validateMessagesSocial("Unknown Error, Contact to support");
            setLoader(false)
        }




    }

    const onFinish = async (values) => {

        let data = {
            emailAddress: values.email,
            password: values.password
        }

        try {

            setLoader(true)
            let resultHandle = await LoginUser(data);


            if (resultHandle?.success == true) {

                setLoader(false)

                localStorage.setItem('user', JSON.stringify(resultHandle.message.user))
                localStorage.setItem('email', resultHandle.message.user.emailAddress)
                localStorage.setItem('token', resultHandle.message.accessToken)
                localStorage.setItem('provider', "Cognito")
                history.push("/select");
            }

            else {
                validateMessages(resultHandle);
                setLoader(false)
            }

        }
        catch (err) {
            console.log(err)
            setLoader(false)

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
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="email"
                                rules={[{ required: true, message: 'Please input your Username/Email!' }]}
                            >
                                <Input className="login-field" prefix={<MdOutlineEmail className="login-fonts" />} placeholder="Username/Email" />
                            </Form.Item>
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
                            <Row>
                                <Col span={12} md={12} xs={24}>
                                    <Form.Item className="login-checkBox" >
                                        <Form.Item name="remember" valuePropName="checked" noStyle>
                                            <Checkbox className='text-black' >Remember me</Checkbox>
                                        </Form.Item>
                                    </Form.Item>
                                </Col>
                                <Col style={{ paddingTop: '5px' }} span={12} md={12} xs={24}>
                                    <Link style={{ display: 'flex', justifyContent: 'right' }} className="login-form-forgot" to="/forget-password">
                                        Forgot password
                                    </Link>
                                </Col>
                            </Row>
                            <Form.Item>
                                {/* <Link to="./select"> */}
                                <Button type="primary" htmlType="submit" className="button mt-5 w-100" >
                                    Sign in
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
                                        accessType="offline"
                                        approvalPrompt="force"
                                        prompt='consent'
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
                            <Text>Don't have an account?
                                <Link to='./signup-0'>
                                    <span style={{ color: '#27B824' }}> Sign up</span>
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


export default Login;