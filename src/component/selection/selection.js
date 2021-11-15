import React, { useState } from 'react'
import { Row, Col, Image, Button } from 'antd';
import SelectionImage from '../../assets/images/selectionImage.png'
import { Link } from 'react-router-dom';

import './selection.css'
function Selection() {




    const [border, setBorder] = useState(false)

    return (
        <div style={{ width: '100%', margin: 'auto' }} >
            <Row style={{ justifyContent: 'center' }}>

                <Col className="w-100 mt-5 d-flex justify-content-center" md={5} >
                    <Image onClick={(e) => console.log(e.target.name)} key={1} className="selection-image-round " src={SelectionImage} preview={false} />
                </Col>

                <Col className="w-100 mt-5 d-flex justify-content-center" md={5} >
                    <Image onClick={(e) => console.log(e.target.name)} key={1} className="selection-image-round " src={SelectionImage} preview={false} />
                </Col>

                <Col className="w-100 mt-5 d-flex justify-content-center" md={5} >
                    <Image onClick={(e) => console.log(e.target.name)} key={1} className="selection-image-round " src={SelectionImage} preview={false} />
                </Col>

                <Col className="w-100 d-flex mt-5 justify-content-center" md={5} >
                    <Image onClick={(e) => console.log(e.target.name)} key={1} className="selection-image-round " src={SelectionImage} preview={false} />
                </Col>

                <Col className="w-100 d-flex mt-5 justify-content-center" md={5} >
                    <Image onClick={(e) => console.log(e.target.name)} key={1} className="selection-image-round " src={SelectionImage} preview={false} />
                </Col>

                <Col className="w-100 d-flex mt-5 justify-content-center" md={5} >
                    <Image onClick={(e) => console.log(e.target.name)} key={1} className="selection-image-round " src={SelectionImage} preview={false} />
                </Col>
                <Col className="w-100 mt-5 d-flex justify-content-center" md={5} >
                    <Image onClick={(e) => console.log(e.target.name)} key={1} className="selection-image-round " src={SelectionImage} preview={false} />
                </Col>

                <Col className="w-100 mt-5 d-flex justify-content-center" md={5} >
                    <Image onClick={(e) => console.log(e.target.name)} key={1} className="selection-image-round " src={SelectionImage} preview={false} />
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
