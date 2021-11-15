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
        <div style={{height:'100vh', position:'relative'}}>
            <Row>
                <Col md={8} xs={24} >
                    
                </Col>
                <Col className="position-relative" md={8} xs={24} >
                    <Card  bordered={false} className="custom-card responsive-card position-relative">
                        <Row className="d-flex justify-content-center">
                            <Image src={Varified} />
                        </Row>
                        
                        <Title className="d-flex justify-content-center" level={5}>Password verified</Title>
                        <Paragraph style={{textAlign:'center'}}>Congratulations, your new password has been verified. You can now start using the app.</Paragraph>
                        
                        <Link className="mt-5" to="/varified">
                            <Button type="primary" htmlType="submit" className="button mt-5 w-100" >
                            Sign in
                            </Button>
                        </Link>
                    </Card>
                </Col>
                <Col md={8} xs={24} >
                
                </Col>
            </Row>
        </div>
    )
}

export default PasswordVarified;