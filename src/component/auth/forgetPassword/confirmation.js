import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Form, Input, Button, notification, Spin } from 'antd';
import { FacebookOutlined } from '@ant-design/icons';
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import {
    Link
} from "react-router-dom";

import { useHistory } from "react-router-dom";

import { ForgetVarification, ForgetResendOTP } from '../../../services/apiInteraction';

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


function ForgetConfirmation() {

    let history = useHistory();

    const [loader, setLoader] = useState(false)

    const onFinish = async (values) => {

        setLoader(true)

        let data = {
            OTP: values.ConfirmationCode
        }

        try {

            let resultHandle = await ForgetVarification(data)

            if (resultHandle?.success == true) {

                if (resultHandle?.success == true) {
                    setLoader(false)
                    localStorage.setItem('token' , resultHandle.message.accessToken)
                    history.push('./create-new-password')
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
            setLoader(true)
            let resultHandle = await ForgetResendOTP()

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


    return (
        <div style={{ height: '100vh', position: 'relative' }} className="gray-background">
            <Spin className="loader" spinning={loader} size="large" />
            <Row style={{ height: '100vh', position: 'relative' }}>
                <Col md={8} xs={24} >

                </Col>
                <Col style={{ alignSelf: 'center' , justifyContent:'center', display:'flex'}}  className="position-relative" md={8} xs={24} >
                    <Card bordered={false} className="custom-card responsive-card">
                        <Title className="d-flex justify-content-center" level={5}>Enter confirmation code</Title>
                        <Paragraph style={{ textAlign: 'center' }}>Enter the confirmation code we sent to who'son@gmail.com.</Paragraph>

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
                                <Input className="login-field" placeholder="Verification Code" />
                            </Form.Item>

                            <Form.Item className="position-relative">
                                <Button
                                    type="primary" htmlType="submit" className="button mt-5 w-100" >
                                    Next
                                </Button>
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

export default ForgetConfirmation;