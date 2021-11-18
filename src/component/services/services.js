import React from 'react'
import { Layout, Dropdown, Image, Row, Col, Typography, Card, Button, Menu, message, Form, Input } from 'antd';
import Line from '../../assets/images/line.png'


function Services() {

    const { Content } = Layout;
    const { Title, Text, Paragraph } = Typography;


    return (
        <div>
              <Row style={{ paddingLeft: '5%', paddingRight: '5%' }} className="mt-5">
                    <Title level={4}>Services</Title>
                </Row>

                <Row style={{ paddingLeft: '5%', paddingRight: '5%' }} className="mt-3">
                    <Col md={12} xs={24} >

                        <Row>
                            <Col span={6}>
                                <Paragraph className="font-18">Shave</Paragraph>
                            </Col>
                            <Col span={6}>
                                <Image src={Line} preview={false} />
                            </Col>
                            <Col span={6} className="justify-content-end">
                                <Paragraph className="font-18" strong={true}>100$</Paragraph>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={6}>
                                <Paragraph className="font-18">Hair Cut</Paragraph>
                            </Col>
                            <Col span={6}>
                                <Image src={Line} preview={false} />
                            </Col>
                            <Col span={6} className="justify-content-end">
                                <Paragraph className="font-18" strong={true}>50$</Paragraph>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={6}>
                                <Paragraph className="font-18">Facial</Paragraph>
                            </Col>
                            <Col span={6}>
                                <Image src={Line} preview={false} />
                            </Col>
                            <Col span={6} className="justify-content-end">
                                <Paragraph className="font-18" strong={true}>22$</Paragraph>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={6}>
                                <Paragraph className="font-18">Hair Color</Paragraph>
                            </Col>
                            <Col span={6}>
                                <Image src={Line} preview={false} />
                            </Col>
                            <Col span={6} className="justify-content-end">
                                <Paragraph className="font-18" strong={true}>25$</Paragraph>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={6}>
                                <Paragraph className="font-18">Hair styling</Paragraph>
                            </Col>
                            <Col span={6}>
                                <Image src={Line} preview={false} />
                            </Col>
                            <Col span={6} className="justify-content-end">
                                <Paragraph className="font-18" strong={true}>10$</Paragraph>
                            </Col>
                        </Row>
                    </Col>
                </Row>
        </div>
    )
}

export default Services
