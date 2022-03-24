import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Form, Input, Button, Checkbox, Image } from 'antd';
import { FacebookOutlined } from '@ant-design/icons';
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import {
    Link,
} from "react-router-dom";
import Varified from '../../assets/images/varified.png'
import { useHistory } from "react-router-dom";

// import CSS 
// import '../auth.css'

const { Title, Paragraph } = Typography;

function Complete() {

    let history = useHistory();

    function onClickComplete() {
        localStorage.clear();
        history.push('./login')
    }

    return (
        <div style={{ height: '100vh', position: 'relative' }}>
            <Row style={{ height: '100vh' }}>
                <Col md={8} xs={24} >

                </Col>
                <Col style={{ alignSelf: 'center' }} className="position-relative" md={8} xs={24} >
                    <Card bordered={false} className="position-relative">
                        <Row className="d-flex justify-content-center">
                            <Image src={Varified} preview={false} />
                        </Row>

                        <Title className="d-flex justify-content-center" level={5}>Account successfully created</Title>
                        <Paragraph style={{ textAlign: 'center' }}>Congratulations, you has been verified. You can now start using the app.</Paragraph>

                        {/* <Link className="mt-5"> */}
                        <Button
                            onClick={(e) => onClickComplete()} 
                            className="button mt-5 w-100" >
                            Profile
                        </Button>
                        {/* </Link> */}
                    </Card>
                </Col>
                <Col md={8} xs={24} >

                </Col>
            </Row>
        </div>
    )
}

export default Complete;