import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Form, Input, Button, notification, Tabs } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import {
    Link
} from "react-router-dom";

import { useHistory } from "react-router-dom";

import { patterns } from '../../Regix';

// phone api
import { AddPhone } from '../../../services/apiInteraction';


// import CSS 
import '../auth.css'

const { Title, Paragraph, Text } = Typography;

const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}


const validateMessages = (data) => {
    const args = {
        message: 'Error',
        description:
            `${data?.message}`,
        duration: 5,
    };
    notification.error(args);
};

function PhoneAndEmail() {

    let history = useHistory();

    const [error, setError] = useState(false)

    const [loader, setLoader] = useState(false)

    const [phoneNumber, setPhoneNumber] = useState()

    const onFinish = async (values) => {

        let phone = values.phone.match(patterns.phoneNumber)

        if (phone) {

            let data = {

                phoneNumber: values.phone,
                whosOn: true

            }

            try {

                let resultHandle = await AddPhone(data)
                console.log(resultHandle)

                if (resultHandle?.success == true) {

                    if (resultHandle?.success == true) {

                        localStorage.setItem('phone', phone)
                        setLoader(false)
                        history.push("/signup-confirmation");

                    }
                    else {

                        validateMessages(resultHandle?.message);
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
            setError(true)
        }

    };
    const onFinishEmail = (values) => {
        console.log('Received values of form: ', values);
    };

    return (
        <div style={{ height: '100vh', position: 'relative' }} className="gray-background">
            <Row style={{ height: '100vh', position: 'relative' }}>
                <Col md={8} xs={24} >

                </Col>
                <Col style={{ alignSelf: 'center' }} className="position-relative" md={8} xs={24} >
                    <Card bordered={false} className="custom-card responsive-card">
                        <Title className="d-flex justify-content-center" level={4}>Enter phone number</Title>

                        <Form
                            name="normal_login"
                            className="login-form mt-5"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="phone"
                                rules={[{ required: true, message: 'Please input your Phone Number!' }]}
                            >
                                <Input className="login-field" prefix={<PhoneOutlined className="login-fonts" />} placeholder="Phone Number" />
                            </Form.Item>
                            <Text style={{ display: error == false ? 'none' : 'block' }} type="danger">Phone Number is not valid</Text>
                            <Form.Item>
                                {/* <Link to="/forget-confirmation"> */}
                                <Button type="primary" htmlType="submit" className="button mt-5 w-100" >
                                    Next
                                </Button>
                                {/* </Link> */}
                            </Form.Item>
                        </Form>
                        <Paragraph className="mt-5" style={{ textAlign: 'center' }}>You may receive SMS updates from WHO'S ON and can opt out any time.</Paragraph>

                    </Card>
                </Col>
                <Col md={8} xs={24} >

                </Col>
            </Row>
        </div>
    )
}

export default PhoneAndEmail;