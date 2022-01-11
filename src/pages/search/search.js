import React, { useEffect, useState, useRef } from 'react'

import {
    UserOutlined
} from '@ant-design/icons';

import { Layout, Image, Row, Col, Typography, Card, Button, notification, Spin } from 'antd';
import SuggestIcon from '../../assets/images/suggest.png'
import Oups from '../../assets/images/oups.png'
import Sidebar from '../../component/sidebar/sidebar';
import Header from '../../component/header/header';
import FollowingCard from '../../component/following/followingCard';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import { SearchApi } from '../../services/apiInteraction';
import { useHistory } from "react-router-dom";
import DefaultImage from '../../assets/images/default.png'
import './search.css'



const validateMessages = (data) => {
    const args = {
        message: 'Error',
        description:
            `${data?.message}`,
        duration: 5,
    };
    notification.error(args);
};


function Search() {

    const { Content } = Layout;
    const { Title, Text, Paragraph } = Typography;
    let history = useHistory();
    const location = useLocation();
    let search = location?.state


    function myScript() {
        // var scrollX = window.pageXOffset || document.documentElement.scrollLeft;
        var scrollY = window.pageYOffset || document.documentElement.scrollTop;

        console.log(scrollY)
    }

    window.addEventListener("scroll", myScript);
    console.log(search)

    const [searchUser, setSearchUser] = useState([])
    const [loader, setLoader] = useState(false)

    useEffect(async () => {


        let data = {
            search: search
        }

        try {

            setLoader(true)
            let resultHandle = await SearchApi(data);

            console.log(resultHandle)

            if (resultHandle?.success == true) {

                setLoader(false)
                setSearchUser(resultHandle.message.result)
                console.log(resultHandle.message.result)

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

    }, [search])


    function onClickView(data) {

        history.push({
            // pathname: "/profile",
            pathname: `/profile/${data._id}`,
            state:data._id
        });

    }


    return (
        <div className="animation2">
            <Spin className="loader" spinning={loader} size="large" />

            <div className="test">
                <Header page='search' />
            </div>

            <div  className="content ant-page- padding-whole-page">
                {searchUser.length == 0 ?
                    <div>
                        <Row className="mt-5 d-flex" >
                            <Title level={3}>Profile</Title>
                        </Row>

                        <Row className='d-flex justify-content-center no-user-found'>

                            <Image src={Oups} preview={false} />

                        </Row>

                        <Row className='d-flex justify-content-center no-user-found mt-5'>

                            <Title style={{ color: '#d9d9d9' }} className='p-0 m-0' level={3}>No user Found</Title>

                        </Row>
                    </div>
                    : null}

                <div>
                    <Row>
                        {searchUser.map((data) =>
                            <Col md={12}>
                                <Card style={{ borderRadius: '30px', margin: '20px' }} className="gray-background ">
                                    <Row>
                                        <Col className="mobile-center" md={4} xs={24} >
                                            <Image style={{ maxWidth: '120px', maxHeight: '120px' }} preview={false} className="border-50 d-flex justify-content-center" src={data?.profilePicUrl || DefaultImage} />
                                        </Col>
                                        <Col style={{ alignSelf: 'center' }} md={15} xs={24}>
                                            <Row className="mobile-center" style={{ paddingLeft: '20px' }}>
                                                <Title level={4} className="m-0">
                                                    {data?.firstName + " " + data?.lastName}
                                                </Title>
                                            </Row>
                                            {/* <Row className="mobile-center" style={{ paddingLeft: '20px' }}>
                                                {a.imOnProfile &&
                                                    <Paragraph level={5}>
                                                        {a.imOnProfile.}
                                                    </Paragraph>
                                                }
                                            </Row> */}
                                        </Col>
                                        <Col className="mobile-center" style={{ alignSelf: 'center' }} md={5} xs={24}>
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

export default Search
