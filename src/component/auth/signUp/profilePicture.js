import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, notification, Input, Button, message, Upload, Image } from 'antd';
import Avatar from 'react-avatar-edit'
import { PlusOutlined } from '@ant-design/icons';
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import {
    Link
} from "react-router-dom";

import { useHistory } from "react-router-dom";
import UserImage from '../../../assets/images/person.png'



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




function ProfilePicture(props) {

    let history = useHistory();

    const [preview, setPreview] = useState()

    const [profileImage, setProfileImage] = useState('')

    const [src, setSrc] = useState('./example/einshtein.jpg')

    const [buttonDisable, setButtonDisable] = useState(false)

    const [error, setError] = useState('')

    const [loader, setLoader] = useState(false)

    function onBeforeFileLoad(elem) {
        if (elem.target.files[0].size > 7168000000) {
            alert("File is too big!");
            elem.target.value = "";
        }
    }

    function test(file) {
        if (file.type == "image/png") {
            // console.log("works")
        }
        else {
            // console.log("error")
            // alert("File is too big!");
            // setPreview(UserImage)
        }
    }


    function onClose() {
        setPreview(UserImage)
    }

    function onCrop(preview) {
        setProfileImage(preview)
        // console.log(profileImage)
    }

    function onUpload(file) {
    }

    async function submitImage() {

        localStorage.setItem("profileImage", profileImage)

        history.push('/view-profile-picture')

    }

    useEffect(() => {

    }, [])

    return (

        <div style={{ height: '100vh', position: 'relative' }} className="gray-background">
            <Row style={{ height: '100vh', position: 'relative' }}>
                <Col md={8} xs={24} >

                </Col>
                <Col style={{ alignSelf: 'center' }} className="position-relative" md={8} xs={24} >
                    <Card style={{ margin: '20px' }} bordered={false} className="custom-crd responsive-card">
                        <Title className="d-flex justify-content-center" level={5}>Add profile photo</Title>
                        <Paragraph style={{ textAlign: 'center' }}>Add a profile photo so that your friends know it's you</Paragraph>
                        <Row className="justify-content-center manage-Background-color" >

                            <Avatar
                                width={300}
                                height={300}
                                onCrop={onCrop}
                                onClose={onClose}
                                onFileLoad={test}
                                onBeforeFileLoad={onBeforeFileLoad}
                                onFileLoad={onUpload}
                                label={`Choose Image`}
                                imageWidth={300}
                                imageHeight={400}
                                mimeTypes={'image/jpeg,image/png'}
                            />

                        </Row>
                        <Row className="justify-content-center ">
                            <Button
                                disabled={buttonDisable}
                                onClick={submitImage}
                                type="primary" htmlType="submit" className="button mt-5 ">
                                Next / Skip
                            </Button>
                        </Row>
                    </Card>
                </Col>
                <Col md={8} xs={24} >

                </Col>
            </Row>
        </div>

    )
}

export default ProfilePicture;