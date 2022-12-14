import React, { useState, useEffect } from 'react'
import { Card, notification, Typography, Row } from 'antd';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Stories from '../../assets/images/stories.png'
import Online from '../../assets/images/online.png'
import Offline from '../../assets/images/orange.png'
import './followingCard.css'
import { GetFollowing } from '../../services/apiInteraction';
import DefaultImage from '../../assets/images/default.png'


const { Title, Text, Paragraph } = Typography;

const validateMessages = (data) => {
    const args = {
        message: 'Error',
        description:
            `${data?.message}`,
        duration: 5,
    };
    notification.error(args);
};

function FollowingCard() {

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 7
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 7
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 4
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const [following, setFollowing] = useState([])

    useEffect(async () => {

        try {

            let resultHandle = await GetFollowing();


            if (resultHandle?.success == true) {

                setFollowing(resultHandle?.message?.followUser)
            }

            else {
                validateMessages(resultHandle);
            }

        }
        catch (err) {
            console.log(err)
        }

    }, [])


    return (
        <div style={{zIndex: "2"}}>
            {following.length > 0 ?
                <div>
                    {following &&
                        <Title level={3}>Following</Title>
                    }
                    <Carousel style={{zIndex: "2"}} responsive={responsive}>
                        {following.map((data) =>

                            <Card className='following-card gray-background'>
                                <div className='position-relative'>
                                    <img className="d-flex justify-content-center m-auto" style={{ borderRadius: '50%', height: '60px', width: '60px' }} src={data.followeeDetail[0]?.profilePicUrl || DefaultImage} />
                                    <img style={{ position: 'absolute', bottom: '1%', left: '60%' }} className="d-flex justify-content-center m-auto" src={  data.followeeDetail[0]?.imOnProfile?.On ==true ? Online : Offline } />
                                </div>
                                <Paragraph style={{ textTransform: 'capitalize' }} strong={true} className="font-16 d-flex justify-content-center m-auto mt-3">{data.followeeDetail[0]?.firstName}</Paragraph>
                                <Paragraph style={{ textTransform: 'capitalize' }} className="font-14 d-flex justify-content-center m-auto">{data?.professionData[0]?.name}</Paragraph>

                            </Card>

                        )}

                    </Carousel>
                </div>

                :

                <Carousel style={{zIndex: "2"}} responsive={responsive}>

                    <div>
                        <Title level={3}>Following</Title>

                        <Card className='following-card gray-background'>
                            <Row style={{ justifyContent: 'center', display: 'flex' }} >
                                <Paragraph >No followers</Paragraph>
                            </Row>
                            {/* <div className='position-relative'>
                            <img className="d-flex justify-content-center m-auto" style={{ borderRadius: '50%', height: '60px', width: '60px' }} src={DefaultImage} />
                            <img style={{ position: 'absolute', bottom: '1%', left: '60%' }} className="d-flex justify-content-center m-auto" src={Online} />
                        </div>
                        <Paragraph style={{ textTransform: 'capitalize' }} strong={true} className="font-16 d-flex justify-content-center m-auto mt-3">{data.followeeDetail[0]?.firstName}</Paragraph>
                        <Paragraph style={{ textTransform: 'capitalize' }} className="font-14 d-flex justify-content-center m-auto">{data?.professionData[0]?.name}</Paragraph> */}

                        </Card>
                    </div>


                </Carousel>
            }
        </div>
    )
}

export default FollowingCard
