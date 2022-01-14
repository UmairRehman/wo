import React from 'react'
import { Row, Col, Image, Typography, Button } from 'antd';
import {
    Link
} from "react-router-dom";

import introductionImage from '../../assets/images/introduction3.png'

import './introduction.css'

const { Text, Title } = Typography;


function Introduction3() {
    return (
        <Row >
            <Col className="full-height mobile-responsive" span={12} >
                <Image
                    width={'100%'}
                    height={'100vh'}
                    preview={false}
                    className="splashImage"
                    src={introductionImage}
                />
            </Col>
            <Col md={12} xs={24} className="padding-auto" style={{ height: '100vh' }} span={12}>
                <Row>
                    <Link to='/login'>
                        <p className="justify-content-right d-flex w-100 g-color">Sign In</p>
                    </Link>
                </Row>

                <Row className="mt-5">
                    <Title className="intro-heading" >Tell the <br />World Who’s On? You!</Title>
                </Row>

                <Row>
                    <Title className="intro-para">Let your customers or followers know when you’re on the clock so they can give you business.</Title>
                </Row>

                <Row className="d-flex fixed-button ">
                    <Link to="/instruction-3">
                        <Button className="button mt-5" type="primary">Next</Button>
                    </Link>
                </Row>

            </Col>
        </Row>
    )
}

export default Introduction3
