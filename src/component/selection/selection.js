import React, { useState } from 'react'
import { Row, Col, Image, Button, Typography } from 'antd';
import SelectionImage from '../../assets/images/selectionImage.png'
import { Link } from 'react-router-dom';

import './selection.css'
function Selection() {
    const { Title, Text, Paragraph } = Typography;




    const [border, setBorder] = useState(false)

    return (
        <div style={{ width: '100%', margin: 'auto' }} >
            <Row style={{ justifyContent: 'center', marginTop:'10px' }}>

                <Col className="w-100 mt-5 d-flex justify-content-center" md={5} >
                    <Row className="w-100">
                        <Row className="w-100 justify-content-center">
                            <Image className="d-flex justify-content-center w-100" onClick={(e) => console.log(e.target.name)} key={1} className="selection-image-round " src={SelectionImage} preview={false} />
                        </Row>
                        <Row className="w-100 mt-3">
                            <Title level={5} className="d-flex justify-content-center w-100">Barber</Title>
                        </Row>
                    </Row>
                </Col>

                <Col className="w-100 mt-5 d-flex justify-content-center" md={5} >
                    <Row className="w-100">
                        <Row className="w-100 justify-content-center">
                            <Image className="d-flex justify-content-center w-100" onClick={(e) => console.log(e.target.name)} key={1} className="selection-image-round " src={SelectionImage} preview={false} />
                        </Row>
                        <Row className="w-100 mt-3">
                            <Title level={5} className="d-flex justify-content-center w-100">Barber</Title>
                        </Row>
                    </Row>
                </Col>
                <Col className="w-100 mt-5 d-flex justify-content-center" md={5} >
                    <Row className="w-100">
                        <Row className="w-100 justify-content-center">
                            <Image className="d-flex justify-content-center w-100" onClick={(e) => console.log(e.target.name)} key={1} className="selection-image-round " src={SelectionImage} preview={false} />
                        </Row>
                        <Row className="w-100 mt-3">
                            <Title level={5} className="d-flex justify-content-center w-100">Barber</Title>
                        </Row>
                    </Row>
                </Col>
                <Col className="w-100 mt-5 d-flex justify-content-center" md={5} >
                    <Row className="w-100">
                        <Row className="w-100 justify-content-center">
                            <Image className="d-flex justify-content-center w-100" onClick={(e) => console.log(e.target.name)} key={1} className="selection-image-round " src={SelectionImage} preview={false} />
                        </Row>
                        <Row className="w-100 mt-3">
                            <Title level={5} className="d-flex justify-content-center w-100">Barber</Title>
                        </Row>
                    </Row>
                </Col>

                <Col className="w-100 mt-5 d-flex justify-content-center" md={5} >
                    <Row className="w-100">
                        <Row className="w-100 justify-content-center">
                            <Image className="d-flex justify-content-center w-100" onClick={(e) => console.log(e.target.name)} key={1} className="selection-image-round " src={SelectionImage} preview={false} />
                        </Row>
                        <Row className="w-100 mt-3">
                            <Title level={5} className="d-flex justify-content-center w-100">Barber</Title>
                        </Row>
                    </Row>
                </Col>

                <Col className="w-100 mt-5 d-flex justify-content-center" md={5} >
                    <Row className="w-100">
                        <Row className="w-100 justify-content-center">
                            <Image className="d-flex justify-content-center w-100" onClick={(e) => console.log(e.target.name)} key={1} className="selection-image-round " src={SelectionImage} preview={false} />
                        </Row>
                        <Row className="w-100 mt-3">
                            <Title level={5} className="d-flex justify-content-center w-100">Barber</Title>
                        </Row>
                    </Row>
                </Col>

            </Row>

            <Row className="selection-image-div">
                <Link to='./following'>
                    <Button type="primary" htmlType="submit" className="button mt-5" >
                        Next
                    </Button>
                </Link>
            </Row>

            <Row style={{ paddingBottom: '50px' }} className="selection-image-div">
                <Button className="skip-button" >
                    Skip
                </Button>
            </Row>

        </div>
    )
}

export default Selection
