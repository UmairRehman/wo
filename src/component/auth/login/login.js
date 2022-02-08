import React, { useState, useEffect } from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { Row, Col, Card, Typography, Form, Input, Button, Checkbox, notification, Spin } from 'antd';
import { FacebookOutlined } from '@ant-design/icons';
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import {
    Link
} from "react-router-dom";

import { useHistory } from "react-router-dom";
import { Login as LoginUser } from '../../../services/apiInteraction';

import Amplify, { Auth, Hub } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';


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

const oauth = {
    domain: 'wo.auth.us-east-2.amazoncognito.com',
    scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
    redirectSignIn: 'https://app.whoson.co/',
    redirectSignOut: 'https://app.whoson.co/',
    responseType: 'token'
};

Auth.configure({
    region: "us-east-2",
    userPoolId: "us-east-2_aPujjAawB",
    userPoolWebClientId: "6u3bu80bhobl8rts163gc022m",
    oauth
});

Amplify.configure({
    aws_cognito_region: "us-east-2", // (required) - Region where Amazon Cognito project was created   
    aws_user_pools_id: "us-east-2_aPujjAawB", // (optional) -  Amazon Cognito User Pool ID   
    aws_user_pools_web_client_id: "6u3bu80bhobl8rts163gc022m", // (optional) - Amazon Cognito App Client ID (App client secret needs to be disabled)
    aws_cognito_identity_pool_id: "us-east-2_aPujjAawB", // (optional) - Amazon Cognito Identity Pool ID   
    aws_mandatory_sign_in: "enable" // (optional) - Users are not allowed to get the aws credentials unless they are signed in   
})

function Login() {
    const [user, setUser] = useState(null);
    const [customState, setCustomState] = useState(null);


    useEffect(() => {
        const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
            switch (event) {
                case "signIn":
                    setUser(data);
                    break;
                case "signOut":
                    setUser(null);
                    break;
                case "customOAuthState":
                    setCustomState(data);
            }
        });

        Auth.currentAuthenticatedUser()
            .then(currentUser => setUser(currentUser))
            .catch((err) => console.log(err));

        return unsubscribe;
    }, []);



    const [loader, setLoader] = useState(false)

    let history = useHistory();

    const onFinish = async (values) => {

        let data = {
            emailAddress: values.email.toLowerCase(),
            password: values.password
        }

        try {

            setLoader(true)
            let resultHandle = await LoginUser(data);

            console.log(resultHandle)

            if (resultHandle?.success == true) {

                setLoader(false)

                localStorage.setItem('user', JSON.stringify(resultHandle.message.user))
                localStorage.setItem('email', resultHandle.message.user.emailAddress)
                localStorage.setItem('token', resultHandle.message.accessToken)
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

    const responseFacebook = (response) => {
        console.log(response);
        // setData(response);
        // setPicture(response.picture.data.url);
        if (response.accessToken) {
            // setLogin(true);
        } else {
            // setLogin(false);
        }
    }

    const responseGoogle = (response) => {
        console.log(response);
    }

    return (

        <div style={{ height: '100vh', position: 'relative' }} className="gray-background">
            <div className="App">
                <button onClick={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Facebook })}>Open Facebook</button>
                <button onClick={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })}>Open Google</button>
                <button onClick={() => Auth.federatedSignIn()}>Open Hosted UI</button>
                {/* <button onClick={() => Auth.signOut()}>Sign Out {user?.getUsername()}</button> */}
            </div>

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

                            <Form.Item className="position-relative">
                                <Row style={{ justifyContent: 'center' }} className='facebook-button-span'>
                                    <Button className='facebook-button' onClick={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Facebook })} >
                                        Sign In with Facebook
                                    </Button>
                                </Row>
                            </Form.Item>

                            <Form.Item className="position-relative">
                                <Row style={{ justifyContent: 'center' }} className='facebook-button-span'>
                                    <Button className='gmail-button'  onClick={() => Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google })} >
                                        Sign In with Google
                                    </Button>
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
