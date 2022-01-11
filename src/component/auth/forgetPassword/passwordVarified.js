import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Form, Input, Button, Checkbox, Image } from 'antd';
import { FacebookOutlined } from '@ant-design/icons';
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import {
    Link
} from "react-router-dom";
import Varified from '../../../assets/images/varified.png'
import { useHistory } from "react-router-dom";

// import CSS 
import '../auth.css'

const { Title, Paragraph } = Typography;

function PasswordVarified() {

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    return (
        <div className='gray-background' style={{ height: '100vh', position: 'relative' }}>
            <Row style={{ height: '100vh' }}>
                <Col md={8} xs={24} >

                </Col>
                <Col style={{ alignSelf: 'center', justifyContent: 'center', display: 'flex' }} className="position-relative" md={8} xs={24} >
                    <Card style={{ height: '70vh' }} bordered={false} className="custom-card position-relative responsive-card">
                        <Row className="d-flex justify-content-center">
                            <Image src={Varified} preview={false} />
                        </Row>

                        <Title className="d-flex justify-content-center" level={5}>Password verified</Title>
                        <Paragraph style={{ textAlign: 'center' }}>Congratulations, your new password has been verified. You can now start using the app.</Paragraph>


                        <Row style={{position:'absolute', bottom:20, width:'90%' ,display:'flex', justifyContent:'center'}}>
                            <Link className="mt-5" to="/login">
                                <Button type="primary" htmlType="submit" className="button mt-5" >
                                    Sign in
                                </Button>
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

export default PasswordVarified;