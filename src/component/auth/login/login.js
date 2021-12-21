import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Form, Input, Button, Checkbox, notification, Spin } from 'antd';
import { FacebookOutlined } from '@ant-design/icons';
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import {
    Link
} from "react-router-dom";

import { useHistory } from "react-router-dom";
import { Login as LoginUser } from '../../../services/apiInteraction';



// import CSS 
import '../auth.css'

const { Title } = Typography;


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

    useEffect(() => {
    }, [])


    const [loader, setLoader] = useState(false)

    let history = useHistory();

    const onFinish = async (values) => {

        let data = {
            emailAddress: values.email,
            password: values.password
        }

        try {

            setLoader(true)
            let resultHandle = await LoginUser(data);

            console.log(resultHandle)

            if (resultHandle?.success == true) {

                setLoader(false)

                localStorage.setItem('user', JSON.stringify(resultHandle.message.user[0]))
                console.log(resultHandle.message.user[0])
                localStorage.setItem('email', resultHandle.message.user[0].emailAddress)
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
        }


    };

    return (
        <div style={{ height: '100vh', position: 'relative' }} className="gray-background">
            <Spin className="loader" spinning={loader} size="large" />
            <Row style={{ height: '100vh', position: 'relative' }}>
                <Col md={8} xs={24} >

                </Col>
                <Col style={{ alignSelf: 'center' }} className="position-relative" md={8} xs={24} >
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
                                rules={[{ required: true, message: 'Please input your Username!' }]}
                            >
                                <Input className="login-field" prefix={<MdOutlineEmail className="login-fonts" />} placeholder="Username" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your Password!' }]}
                            >
                                <Input
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
                                            <Checkbox>Remember me</Checkbox>
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
                                <Button type="primary" htmlType="submit" className="gmail-icon mt-5 w-100" >
                                    Sign in with Google
                                </Button>
                            </Form.Item>


                            <Form.Item className="position-relative">
                                <Button
                                    // icon={<Image preview={false} 
                                    // src={Facebook} />}
                                    type="primary" htmlType="submit" className="faceook-button mt-5 w-100" >
                                    Sign in with Facebook
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


export default Login;
