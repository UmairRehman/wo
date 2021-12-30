import React from 'react'
import { Row, Col, Image, Typography, Button } from 'antd';
import introductionImage from '../../assets/images/introduction1.png'
import {
    Link
} from "react-router-dom";

import './introduction.css'

const { Text, Title  } = Typography;


function Introduction1() {
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
            <Col md={12} xs={24} className="padding-auto" style={{height:'100vh'}} span={12}>
                <Row>
                    <Link to='/login'>
                        <p className="justify-content-right d-flex w-100 g-color">Sign In</p>
                    </Link>
                </Row>
                
                <Row className="mt-5">
                    <Title className="intro-heading" >Welcome <br/>to Who's On!</Title>
                </Row>

                <Row>
                    <Title className="intro-para">A social platform to connect with your favorite service providers or your favorite customers.</Title>
                </Row>

                <Row className="d-flex fixed-button ">
                    <Link to="/instruction-2">
                        <Button className="button mt-5"  type="primary">Next</Button>
                    </Link>
                </Row>

            </Col>
        </Row>
    )
}

export default Introduction1
