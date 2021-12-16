import React, { useEffect, useState } from 'react'
import { Layout, Dropdown, Image, Row, Col, Typography, Card, Button, Menu, message, Form, Input } from 'antd';
import Line from '../../assets/images/line.png'


function Services(props) {

    const { Content } = Layout;
    const { Title, Text, Paragraph } = Typography;

    const [services, setServices] = useState([])
    useEffect(() => {
        console.log(props.services)
        setServices(props.services)

    }, [])


    return (
        <div>
            <Row style={{ paddingLeft: '5%', paddingRight: '5%' }} className="mt-5">
                <Title level={4}>Services</Title>
            </Row>

            <Row style={{ paddingLeft: '5%', paddingRight: '5%' }} className="mt-3">
                {services.map((s) =>
                    <Col key={s} md={12} xs={24} >

                        <Row>
                            <Col span={6}>
                                <Paragraph className="font-18">{s.name}</Paragraph>
                            </Col>
                            <Col span={6}>
                                <Image src={Line} preview={false} />
                            </Col>
                            <Col span={6} className="justify-content-end">
                                <Paragraph className="font-18" strong={true}>{s.price}</Paragraph>
                            </Col>
                        </Row>

                    </Col>
                )}
            </Row>
        </div>
    )
}

export default Services
