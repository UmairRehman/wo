import React from 'react'
import { Row, Col, Typography, Image  } from 'antd';
import Boy from '../../assets/images/boy.png'
import { Link } from 'react-router-dom';

import './select.css'


const { Title, Text } = Typography;

function Select() {
    return (
        <div className="animation2" style={{padding:'10%'}}>
            <Row>
                <Col md={12} xs={24}>
                    <Row>
                    <Col md={12} xs={24}>
                        <Link to='./intrest'>
                            <Row className="orange position-relative"  >
                                <div className="w-100">
                                    <Title className="title-center mt-5 text-white" level={2}>Who's On</Title>
                                    <Row>
                                        <Text className="title-center text-white" type="secondary">Are you searching for<br/> a service provider?</Text>
                                    </Row>
                                </div>
                            </Row>
                        </Link>
                    </Col>
                    <Col md={12} xs={24}>
                        <Link to='./intrest'>
                            <Row className="green position-relative">
                                <div className="w-100">
                                    <Title className="title-center mt-5 text-white" level={2}>I'm On</Title>
                                    <Row>
                                        <Text className="title-center text-white" type="secondary">Let your clients know<br/> you're available</Text>
                                    </Row>
                                </div>
                            </Row>
                        </Link>
                    </Col>
                    </Row>
                </Col>
                <Col md={12}>
                    <Row style={{height:"450px"}} className="position-relative"  >
                        <div className="m-auto">
                            <Title className="w-75 b-color" level={1}>Select your preferred mode</Title>
                            <Text className="title-center b-color" type="secondary">Let your clients know you're available</Text>
                        </div>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default Select
