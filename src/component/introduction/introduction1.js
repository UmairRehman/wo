import React, { useEffect } from 'react'
import { Row, Col, Image, Typography, Button } from 'antd';
import introductionImage from '../../assets/images/introduction1.png'
import {
    Link
} from "react-router-dom";

import './introduction.css'

const { Text, Title } = Typography;


function Introduction1() {

    const test = () => {
        if (
            navigator.userAgent.match(/Android/i) ||
            navigator.userAgent.match(/iPhone/i)
        ) {
            alert("mobile")
        }
        else{
            alert("web")

        }
    }


    useEffect(() => {
        test()

    }, [])





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
                    <Title className="intro-heading" >Welcome <br />to Who's On!</Title>
                </Row>

                <Row>
                    <Title className="intro-para">The easiest way to connect service providers with their favorite customers.</Title>
                </Row>

                <Row className="d-flex fixed-button ">
                    <Link to="/instruction-2">
                        <Button className="button mt-5" type="primary">Next</Button>
                    </Link>
                </Row>

            </Col>
        </Row>
    )
}

export default Introduction1
