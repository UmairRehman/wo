import React, { useEffect, useState } from 'react'

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';

import { Layout, Image, Row, Col, Typography, Card, Button, notification, Spin } from 'antd';
import Suggest from '../../assets/images/suggest.png'
import Sidebar from '../../component/sidebar/sidebar';
import Header from '../../component/header/header';
import FollowingCard from '../../component/following/followingCard';
import { Link } from 'react-router-dom';
import './following.css'
import { GetSuggestion } from '../../services/apiInteraction';
import { useHistory } from "react-router-dom";
import DefaultImage from '../../assets/images/default.png'

function Following() {

    const { Content } = Layout;
    const { Title, Text, Paragraph } = Typography;
    let history = useHistory();


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

    const [suggest, setSuggest] = useState([])


    function onClickView(data) {

        history.push({
            pathname: `/profile/${data._id}`,
            // state: data._id
        });
        

    }


    useEffect(async () => {

        try {

            setLoader(true)
            let resultHandle = await GetSuggestion();

            if (resultHandle?.success == true) {

                setLoader(false)
                setSuggest(resultHandle?.message?.suggestedUser)
                console.log(resultHandle?.message.suggestedUser)
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
            <Spin className="loader" spinning={loader} size="large" />
            <div className="test">
                <Header />
            </div>

            <div className="content ant-page- padding-whole-page">
        
                <div className='mt-5'>
                    <FollowingCard />
                </div>

                {suggest.length > 0 &&
                    <Row className="mt-5 d-flex" >
                        <Col span={20}>
                            <Title className='m-0' level={4}>Suggested for you</Title>
                        </Col>
                        <Col style={{ justifyContent: 'end', display: 'flex', alignItems:'center' }} span={4}>
                            <Link to='./suggest' >See All</Link>
                        </Col>
                    </Row>
                }

                <div>
                    <Row>
                        {suggest.map((data) =>
                            <Col md={12}>
                                <Card style={{ borderRadius: '30px', margin: '20px' }} className="gray-background">
                                    <Row>
                                        <Col className="mobile-center" md={4} xs={24} >
                                            <Image style={{ maxWidth: '120px', maxHeight: '120px' }} preview={false} className="border-50 d-flex justify-content-center" src={data?.profilePicUrl || DefaultImage} />
                                        </Col>
                                        <Col style={{ alignSelf: 'center' }} md={13} xs={24}>
                                            <Row className="mobile-center" style={{ paddingLeft: '20px' }}>
                                                <Title style={{textTransform:'capitalize'}} level={5} className="m-0">
                                                    {data?.firstName + " " + data?.lastName}
                                                </Title>
                                            </Row>
                                            <Row className="mobile-center" style={{ paddingLeft: '20px' }}>
                                                <Paragraph style={{textTransform:'capitalize'}}  level={5}>
                                                    {data.imOnProfile?.profession_data[0]?.name}
                                                </Paragraph>
                                            </Row>
                                        </Col>
                                        <Col className="mobile-center" style={{ alignSelf: 'center' }} md={7} xs={24}>
                                            <Button onClick={() => onClickView(data)} className="follow-button">
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

        </div>
    )
}

export default Following
