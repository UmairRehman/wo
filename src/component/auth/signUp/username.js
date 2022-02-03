import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Form, Input, Button, Checkbox,notification, Spin } from 'antd';
import { FacebookOutlined } from '@ant-design/icons';
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import {
    Link
} from "react-router-dom";

import { useHistory } from "react-router-dom";

import { UserNameAPI } from '../../../services/apiInteraction';

// import CSS 
import '../auth.css'

const { Title, Paragraph } = Typography;


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

function UserName() {

    let history = useHistory();

    const [error, setError] = useState(false)

    const [loader, setLoader] = useState(false)

    const onFinish = async (values) => {
        setLoader(true)

        let data = {
            username: values.userName,
        }

        localStorage.setItem('firstName',  values.firstName)
        localStorage.setItem('lastName', values.lastName)
        localStorage.setItem('userName', values.userName)

        console.log(data)

        try {

            let resultHandle = await UserNameAPI(data)

            if (resultHandle?.success == true) {
                if (resultHandle?.success == true) {
                    setLoader(false)
                    history.push('./date-of-birth')

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

    };

    return (
        <div style={{ height: '100vh', position: 'relative' }} className="gray-background">
            <Spin className="loader" spinning={loader} size="large" />
            <Row style={{ height: '100vh', position: 'relative' }}>
                <Col md={8} xs={24} >

                </Col>
                <Col style={{ alignSelf: 'center' , justifyContent:'center', display:'flex'}} className="position-relative" md={8} xs={24} >
                    <Card bordered={false} className="custom-card responsive-card">
                        <Title className="d-flex justify-content-center" level={5}>Confirm username</Title>
                        <Paragraph style={{ textAlign: 'center' }}>Use a name you'd like your friends to find you with</Paragraph>

                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="firstName"
                                rules={[{ required: true, message: 'Please input your First Name!' }]}
                            >
                                <Input className="login-field" placeholder="First Name" />
                            </Form.Item>

                            <Form.Item
                                name="lastName"
                                rules={[{ required: true, message: 'Please input your Last Name!' }]}
                            >
                                <Input className="login-field" placeholder="Last Name" />
                            </Form.Item>


                            <Form.Item
                                name="userName"
                                rules={[{ required: true, message: 'Please input your Username!' }]}
                            >
                                <Input className="login-field" placeholder="User Name" />
                            </Form.Item>

                            <Row>
                                <Col span={12} md={12} xs={24}>
                                    <Form.Item className="login-checkBox" >
                                        <Form.Item name="remember" valuePropName="checked" noStyle>
                                            <Checkbox>vacinated</Checkbox>
                                        </Form.Item>
                                    </Form.Item>
                                </Col>
                                <Col span={12} md={12} xs={24}>
                                    <Form.Item className="login-checkBox" >
                                        <Form.Item name="remember" valuePropName="" noStyle>
                                            <Checkbox>Not Vacinated</Checkbox>
                                        </Form.Item>
                                    </Form.Item>
                                </Col>
                            </Row>


                            <Form.Item className="position-relative">
                                {/* <Link to="/date-of-birth"> */}
                                <Button
                                    type="primary" htmlType="submit" className="button mt-5 w-100" >
                                    Next
                                </Button>
                                {/* </Link> */}
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