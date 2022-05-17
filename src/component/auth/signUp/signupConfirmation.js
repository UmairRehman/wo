import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Form, Input, Button, notification, Spin } from 'antd';
import { FacebookOutlined } from '@ant-design/icons';
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import {
    Link
} from "react-router-dom";

import { useHistory } from "react-router-dom";

import { ResendOTP } from '../../../services/apiInteraction';

import { VarifyPhoneOTP } from '../../../services/apiInteraction';

// import CSS 
import '../auth.css'

const { Title, Paragraph } = Typography;


const validateMessages = (data) => {
    // console.log(data)
    const args = {
        message: 'Error',
        description:
            `${data.message}`,
        duration: 5,
    };
    notification.error(args);
};

function SignupConfirmation() {

    let history = useHistory();

    const [error, setError] = useState(false)

    const [loader, setLoader] = useState(false)

    let phoneFromLocal = localStorage.getItem('phone')

    const onFinish = async (values) => {

        setLoader(true)

        let data = {
            OTP: values.ConfirmationCode,
        }

        try {

            let resultHandle = await VarifyPhoneOTP(data)

            if (resultHandle.success == true) {
                if (resultHandle.success == true) {
                    setLoader(false)
                    history.push("./username");
                }
                else {
                    validateMessages(resultHandle);
                    // console.log(resultHandle)
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



    async function Resend() {

        try {

            let resultHandle = await ResendOTP()

            if (resultHandle.success == true) {
                if (resultHandle.success == true) {
                    setLoader(false)
                }
                else {
                    validateMessages(resultHandle);
                    setLoader(false)
                }
            }
            else {
                setLoader(false)
            }
        }
        catch (err) {
            console.log(err)
        }

    }

    function split() {
        let firstLetter = phoneFromLocal.substring(0, 3);
        let lastLetter = phoneFromLocal.substring(phoneFromLocal.length - 4);
        let center = "********";
        let emailDemo = firstLetter + center + lastLetter;
        return emailDemo

    }

    return (
        <div style={{ height: '100vh', position: 'relative' }} className="gray-background">
            <Spin className="loader" spinning={loader} size="large" />
            <Row style={{ height: '100vh', position: 'relative' }}>
                <Col md={8} xs={24} >

                </Col>
                <Col style={{ alignSelf: 'center', justifyContent: 'center', display: 'flex' }} className="position-relative" md={8} xs={24} >
                    <Card bordered={false} className="custom-card responsive-card">
                        <Title className="d-flex justify-content-center" level={5}>Enter confirmation code</Title>
                        <Paragraph style={{ textAlign: 'center' }}>Enter the confirmation code we sent to {split()}</Paragraph>

                        <Form
                            style={{ marginBottom: '50px' }}
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="ConfirmationCode"
                                rules={[{ required: true, message: 'Please input your OTP!' }]}
                            >
                                <Input className="login-field" placeholder="Varification Code" />
                            </Form.Item>

                            <Form.Item className="position-relative">
                                {/* <Link to="/username"> */}
                                <Button
                                    type="primary" htmlType="submit" className="button mt-5 w-100" >
                                    Next
                                </Button>
                                {/* </Link> */}
                            </Form.Item>
                        </Form>
                        <p onClick={Resend} style={{ position: 'absolute', bottom: '0px', left: '0px', width: '100%', cursor: 'pointer' }} className="d-flex justify-content-center g-color font-16">Resend Code</p>
                    </Card>
                </Col>
                <Col md={8} xs={24} >

                </Col>
            </Row>
        </div>
    )
}

export default SignupConfirmation;