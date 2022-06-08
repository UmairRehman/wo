import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Form, Input, Button, DatePicker, Image, notification } from 'antd';
import { FacebookOutlined } from '@ant-design/icons';
import moment from "moment"
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import {
    Link
} from "react-router-dom";

import { useHistory } from "react-router-dom";

// import CSS 
import '../auth.css'

const { Title, Paragraph } = Typography;

function DateOfBirth() {

    let history = useHistory();

    const [dateofBirth, setDateofBirth] = useState('')

    const onFinish = (values) => {

        
        const selectedDate = dateofBirth?.split(' ')
        const today = dateToday?.split(' ')
        if (parseInt(selectedDate[2]) > parseInt(today[2]) ) return toast("Invalid date!")

        let data = {
            dateofBirth
        }

        localStorage.setItem('dateofBirth', dateofBirth)
        history.push('/profile-picture')

    };


    const toast = (data) => {
        const args = {
            message: 'Error',
            description: data,
            duration: 5,
        };
        notification.error(args);
    }

    function onChange(date,dateString) {
        setDateofBirth(dateString)
    }

    const dateToday = moment(new Date()).format('MMMM Do YYYY')

    return (
        <div style={{ height: '100vh', position: 'relative' }} className="gray-background">
            <Row style={{ height: '100vh', position: 'relative' }}>
                <Col md={8} xs={24} >

                </Col>
                <Col style={{ alignSelf: 'center' , justifyContent:'center', display:'flex'}}  className="position-relative" md={8} xs={24} >
                    <Card bordered={false} className="custom-card responsive-card">
                        <Title className="d-flex justify-content-center" level={5}>Add your date of birth</Title>
                        <Paragraph style={{ textAlign: 'center' }}>This won't be part of your public profile. Why do i need to provide my date of birth?</Paragraph>

                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="ConfirmationCode"
                                rules={[{ required: true, message: 'Please enter your data of birth!' }]}
                            >
                                <DatePicker disabledDate={(current) => {
                                    return current && current > moment(new Date(), "YYYY-MM-DD");
                                }} format={'DD-MM-YYYY'} className="w-100 custom-date-of-birth" onChange={onChange} />

                            </Form.Item>

                            <Form.Item className="position-relative">
                                <Button
                                    type="primary" htmlType="submit" className="button mt-5 w-100">
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

export default DateOfBirth;