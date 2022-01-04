import React, { useState, useEffect } from 'react'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';

import { Layout, Image, Row, Col, Typography, Card, Button, notification } from 'antd';
import SuggestIcon from '../../assets/images/suggest.png'
import Sidebar from '../../component/sidebar/sidebar';
import Header from '../../component/header/header';
import FollowingCard from '../../component/following/followingCard';
import { Link } from 'react-router-dom';
import { GetSuggestion } from '../../services/apiInteraction';
import DefaultImage from '../../assets/images/default.png'
import { useHistory } from "react-router-dom";


const validateMessages = (data) => {
    const args = {
        message: 'Error',
        description:
            `${data?.message}`,
        duration: 5,
    };
    notification.error(args);
};


function Suggest() {

    const { Content } = Layout;
    const { Title, Text, Paragraph } = Typography;
    let history = useHistory();

    const [suggest, setSuggest] = useState([])
    const [loader, setLoader] = useState(false)

    function onClickView(data) {

        history.push({
            pathname: "/profile",
            state: data?._id
        });

    }

    useEffect(async () => {

        try {

            setLoader(true)
            let resultHandle = await GetSuggestion();

            if (resultHandle?.success == true) {

                setLoader(false)
                setSuggest(resultHandle?.message?.suggestedUser)
            }

            else {
                validateMessages(resultHandle);
                setLoader(false)
            }

        }
        catch (err) {
            console.log(err)
            setLoader(false)
        }

    }, [])

    return (
        <div className="animation2 ">
            <div className="test">
                <Header />
            </div>

            <div style={{ paddingLeft: '5%', paddingRight: '5%' }} className="content ant-page- ">
                <Row className="mt-5 d-flex" >
                    <Title level={3}>Suggested for you</Title>
                </Row>

                <div>
                    <Row>
                        {suggest.map((data) =>
                            < Col md={12} >
                                <Card style={{ borderRadius: '30px', margin: '20px' }} className="gray-background ">
                                    <Row>
                                        <Col className="mobile-center" md={4} xs={24} >
                                            <Image style={{ maxWidth: '120px', maxHeight: '120px' }} preview={false} className="border-50 d-flex justify-content-center" src={data?.profilePicUrl || DefaultImage} />
                                        </Col>
                                        <Col style={{ alignSelf: 'center' }} md={16} xs={24}>
                                            <Row className="mobile-center" style={{ paddingLeft: '20px' }}>
                                                <Title level={4} className="m-0">
                                                    {data.firstName + " " + data.lastName}
                                                </Title>
                                            </Row>
                                            <Row className="mobile-center" style={{ paddingLeft: '20px' }}>
                                                <Paragraph level={5}>
                                                    {data?.imOnProfile?.profession_data[0]?.name}
                                                </Paragraph>
                                            </Row>
                                        </Col>
                                        <Col className="mobile-center" style={{ alignSelf: 'center' }} md={4} xs={24}>
                                            <Button onClick={() => onClickView(data)}  className="follow-button">
                                                View Profile
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>

                        )}

                    </Row>

                </div>
            </div>

        </div >
    )
}

export default Suggest
