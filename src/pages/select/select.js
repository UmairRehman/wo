import React, { useState, useEffect } from 'react'
import { Row, Col, Typography, Image, notification, Spin } from 'antd';
import Boy from '../../assets/images/boy.png'
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import LogoGreen from '../../assets/images/logo-green.png'
import LogoOrange from '../../assets/images/logo-orange.png'
import { IMON } from "../../services/apiInteraction"
import './select.css'


const { Title, Text } = Typography;



function Select() {

    let history = useHistory();

    const [userHistory, setuserHistory] = useState({})

    useEffect(() => {
        let user = localStorage.getItem("user")

        let userObject = JSON.parse(user)

        setuserHistory(userObject)

    }, [])

    const [loader, setLoader] = useState(false)

    const validateMessages = (data) => {
        const args = {
            message: 'Error',
            description:
                `${data?.message}`,
            duration: 5,
        };
        notification.error(args);
    };


    async function handleStatus() {

        try {

            setLoader(true)
            let resultHandle = await IMON();

            if (resultHandle?.success == true) {

                setLoader(false)

                return true

                // validateMessages(resultHandle);

                // setProfile(resultHandle?.message.foundUser[0])
            }

            else {
                validateMessages(resultHandle);
                setLoader(false)
            }

        }
        catch (err) {
            console.log(err)
        }
    }


    function onClickAction() {


        if (userHistory?.imOnProfile) {
            // console.log(userHistory?.imOnProfile)
            if ( !userHistory?.imOnProfile?.On) handleStatus().then(() => { history.push("/profile-1") })
            if (userHistory?.imOnProfile?.On) history.push("/profile-1")
        }
        else {
            history.push("/signup-form");
        }

    }

    return (
        <div className="animation2" style={{ padding: '10%' }}>
            <Spin mclassName="loader" spinning={loader} size="large" >
                <Row>
                    <Col md={12} xs={24}>
                        <Row>
                            <Col md={12} xs={24}>
                                <Link to='./intrest'>
                                    <Row className="orange position-relative cursor-pointer"  >
                                        <div className="w-100">
                                            <Title className="title-center mt-5 text-white" level={2}>Who's On</Title>
                                            <Row>
                                                <Text className="title-center text-white" type="secondary">Searching for<br /> your favourite service provider?</Text>
                                            </Row>
                                            <Row className='d-flex justify-content-center position-relative'>
                                                <Image className='logo-center' preview={false} src={LogoGreen} />
                                            </Row>
                                        </div>
                                    </Row>
                                </Link>
                            </Col>
                            <Col md={12} xs={24}>
                                <Row onClick={onClickAction} className="green cursor-pointer position-relative">
                                    <div className="w-100">
                                        <Title className="title-center mt-5 text-white" level={2}>I'm On</Title>
                                        <Row>
                                            <Text className="title-center text-white" type="secondary">I’M ON! Let your customers<br /> know you’re on the clock</Text>
                                        </Row>
                                        <Row className='d-flex justify-content-center position-relative'>
                                            <Image className='logo-center' preview={false} src={LogoOrange} />
                                        </Row>
                                    </div>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col className='display-none' md={12}>
                        <Row style={{ height: "450px" }} className="position-relative"  >
                            <div className="m-auto">
                                <Title className="w-75 b-color" level={1}>Select your preferred mode</Title>
                                <Text className="title-center b-color" type="secondary">Let your clients know you're available</Text>
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Spin>
        </div>
    )
}

export default Select
