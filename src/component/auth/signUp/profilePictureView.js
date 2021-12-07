import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, notification, Input, Button, DatePicker, Image } from 'antd';
import moment from 'moment';
import {
    Link
} from "react-router-dom";

import { useHistory } from "react-router-dom";

import { SubmitSignup } from '../../../services/apiInteraction';

// import CSS 
import '../auth.css'

const { Title, Paragraph } = Typography;



const validateMessages = (data) => {
    console.log(data)
    const args = {
        message: 'Error',
        description:
            `${data.message}`,
        duration: 5,
    };
    notification.error(args);
};


function ProfilePictureView() {

    let history = useHistory();

    const ProfileImageFromLocal = localStorage.getItem('profileImage')

    const [person, setPerson] = useState(localStorage.getItem("profileImage"))

    const [loader, setLoader] = useState(false)

    const [error, setError] = useState(false)

    let date = localStorage.getItem('dateofBirth')
    
    async function onFinish() {

        let data = {
            firstName: localStorage.getItem('firstName'),
            lastName: localStorage.getItem('lastName'),
            dob:  date ,
            username: localStorage.getItem('userName'),
        }

        if(localStorage.getItem('profileImage')) {
            data['image'] = localStorage.getItem('profileImage');
        }

        console.log(data)

        try {

            let resultHandle = await SubmitSignup(data)

            if (resultHandle?.success == true) {
                
                if (resultHandle?.success == true) {
                    setLoader(false)
                    history.push('./login')
                }

                else {
                    validateMessages(resultHandle);
                    console.log(resultHandle)
                    setLoader(false)
                }

            }
            else {

                console.log("error")
                validateMessages(resultHandle);
                setLoader(false)
            
            }
        }

        catch (err) {
            console.log(err)
        }




    };

    function onChange(date, dateString) {
        console.log(date, dateString);
    }

    return (
        <div style={{ height: '100vh', position: 'relative' }} className="gray-background">
            <Row style={{ height: '100vh', position: 'relative' }}>
                <Col md={8} xs={24} >

                </Col>
                <Col style={{ alignSelf: 'center' }} className="position-relative" md={8} xs={24} >
                    <Card bordered={false} style={{ height: '80vh' }} className="custom-card responsive-card">

                        <Row className="justify-content-center">
                            <Image style={{ borderRadius: '50%' }} src={person} preview={false} />
                        </Row>
                        {ProfileImageFromLocal == '' ?
                            // <Link to='./profile-picture'>
                            <Paragraph className="font-20" style={{ textAlign: 'center', color: '#27B824' }}>Do you want to create account? </Paragraph>
                            // </Link>
                            :
                            <Link to='./profile-picture'>
                                <Paragraph className="font-20" style={{ textAlign: 'center', color: '#27B824' }}>Change Photo</Paragraph>
                            </Link>
                        }
                        <Row style={{ position: 'absolute', bottom: '20px', left: '5%', width: '90%' }} >
                            <Button onClick={onFinish} style={{ color: 'white' }} className="justify-content-center button w-100">Create Account</Button>
                        </Row>

                    </Card>
                </Col>
                <Col md={8} xs={24} >

                </Col>
            </Row>
        </div>
    )
}

export default ProfilePictureView;