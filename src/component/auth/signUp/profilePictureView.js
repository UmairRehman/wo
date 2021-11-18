import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Form, Input, Button, DatePicker, Image } from 'antd';
import { FacebookOutlined } from '@ant-design/icons';
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import {
    Link
} from "react-router-dom";

import { useHistory } from "react-router-dom";

// import CSS 
import '../auth.css'

const { Title, Paragraph } = Typography;

function ProfilePictureView() {

    const [person, setPerson] = useState(localStorage.getItem("profileImage"))


    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    function onChange(date, dateString) {
        console.log(date, dateString);
    }

    return (
        <div style={{ height: '100vh', position: 'relative' }} className="gray-background">
            <Row style={{ height: '100vh', position: 'relative' }}>
                <Col md={8} xs={24} >

                </Col>
                <Col style={{ alignSelf: 'center' }} className="position-relative" md={8} xs={24} >
                    <Card bordered={false} style={{ height: '80vh' }} className="custom-card responsive-card">

                        <Row className="justify-content-center">
                            <Image style={{ borderRadius: '50%' }} src={person} preview={false} />
                        </Row>
                        <Link to='./profile-picture'>
                            <Paragraph className="font-20" style={{ textAlign: 'center', color: '#27B824' }}>Change Photo</Paragraph>
                        </Link>

                        <Row style={{ position: 'absolute', bottom: '20px', left: '5%', width: '90%' }} >
                            <Link to='./select' className="w-100" >
                                <Button style={{ color: 'white' }} className="d-flex justify-content-center button w-100">Next</Button>
                            </Link>
                        </Row>

                    </Card>
                </Col>
                <Col md={8} xs={24} >

                </Col>
            </Row>
        </div>
    )
}

export default ProfilePictureView;