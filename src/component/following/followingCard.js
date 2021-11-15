import React from 'react'
import { Card, Row, Typography } from 'antd';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Stories from '../../assets/images/stories.png'
import Online from '../../assets/images/online.png'
import './followingCard.css'



const { Title, Text, Paragraph } = Typography;

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


    return (
        <div>
            <div style={{ width: '90%', margin: 'auto', position: 'relative' }}>
                <Carousel responsive={responsive}>
                  
                    <Card className='following-card gray-background'>
                        <div className='position-relative'>
                            <img className="d-flex justify-content-center m-auto" style={{ borderRadius: '50%', height: '70px', width: '70px' }} src={Stories} />
                            <img style={{ position: 'absolute', bottom: '1%', left: '60%' }} className="d-flex justify-content-center m-auto" src={Online} />

                        </div>

                        <Paragraph className="font-18 d-flex justify-content-center m-auto mt-3">John Hales</Paragraph>
                        <Paragraph className="font-16 d-flex justify-content-center m-auto">Barber</Paragraph>

                    </Card>

                    <Card className='following-card gray-background'>
                        <div className='position-relative'>
                            <img className="d-flex justify-content-center m-auto" style={{ borderRadius: '50%', height: '70px', width: '70px' }} src={Stories} />
                            <img style={{ position: 'absolute', bottom: '1%', left: '60%' }} className="d-flex justify-content-center m-auto" src={Online} />

                        </div>

                        <Paragraph className="font-18 d-flex justify-content-center m-auto mt-3">John Hales</Paragraph>
                        <Paragraph className="font-16 d-flex justify-content-center m-auto">Barber</Paragraph>

                    </Card>

                    <Card className='following-card gray-background'>
                        <div className='position-relative'>
                            <img className="d-flex justify-content-center m-auto" style={{ borderRadius: '50%', height: '70px', width: '70px' }} src={Stories} />
                            <img style={{ position: 'absolute', bottom: '1%', left: '60%' }} className="d-flex justify-content-center m-auto" src={Online} />

                        </div>

                        <Paragraph className="font-18 d-flex justify-content-center m-auto mt-3">John Hales</Paragraph>
                        <Paragraph className="font-16 d-flex justify-content-center m-auto">Barber</Paragraph>

                    </Card>

                    <Card className='following-card gray-background'>
                        <div className='position-relative'>
                            <img className="d-flex justify-content-center m-auto" style={{ borderRadius: '50%', height: '70px', width: '70px' }} src={Stories} />
                            <img style={{ position: 'absolute', bottom: '1%', left: '60%' }} className="d-flex justify-content-center m-auto" src={Online} />

                        </div>

                        <Paragraph className="font-18 d-flex justify-content-center m-auto mt-3">John Hales</Paragraph>
                        <Paragraph className="font-16 d-flex justify-content-center m-auto">Barber</Paragraph>

                    </Card>

                    <Card className='following-card gray-background'>
                        <div className='position-relative'>
                            <img className="d-flex justify-content-center m-auto" style={{ borderRadius: '50%', height: '70px', width: '70px' }} src={Stories} />
                            <img style={{ position: 'absolute', bottom: '1%', left: '60%' }} className="d-flex justify-content-center m-auto" src={Online} />

                        </div>

                        <Paragraph className="font-18 d-flex justify-content-center m-auto mt-3">John Hales</Paragraph>
                        <Paragraph className="font-16 d-flex justify-content-center m-auto">Barber</Paragraph>

                    </Card>

                    <Card className='following-card gray-background'>
                        <div className='position-relative'>
                            <img className="d-flex justify-content-center m-auto" style={{ borderRadius: '50%', height: '70px', width: '70px' }} src={Stories} />
                            <img style={{ position: 'absolute', bottom: '1%', left: '60%' }} className="d-flex justify-content-center m-auto" src={Online} />

                        </div>

                        <Paragraph className="font-18 d-flex justify-content-center m-auto mt-3">John Hales</Paragraph>
                        <Paragraph className="font-16 d-flex justify-content-center m-auto">Barber</Paragraph>

                    </Card>

                    <Card className='following-card gray-background'>
                        <div className='position-relative'>
                            <img className="d-flex justify-content-center m-auto" style={{ borderRadius: '50%', height: '70px', width: '70px' }} src={Stories} />
                            <img style={{ position: 'absolute', bottom: '1%', left: '60%' }} className="d-flex justify-content-center m-auto" src={Online} />

                        </div>

                        <Paragraph className="font-18 d-flex justify-content-center m-auto mt-3">John Hales</Paragraph>
                        <Paragraph className="font-16 d-flex justify-content-center m-auto">Barber</Paragraph>

                    </Card>

                    <Card className='following-card gray-background'>
                        <div className='position-relative'>
                            <img className="d-flex justify-content-center m-auto" style={{ borderRadius: '50%', height: '70px', width: '70px' }} src={Stories} />
                            <img style={{ position: 'absolute', bottom: '1%', left: '60%' }} className="d-flex justify-content-center m-auto" src={Online} />

                        </div>

                        <Paragraph className="font-18 d-flex justify-content-center m-auto mt-3">John Hales</Paragraph>
                        <Paragraph className="font-16 d-flex justify-content-center m-auto">Barber</Paragraph>

                    </Card>

                    <Card className='following-card gray-background'>
                        <div className='position-relative'>
                            <img className="d-flex justify-content-center m-auto" style={{ borderRadius: '50%', height: '70px', width: '70px' }} src={Stories} />
                            <img style={{ position: 'absolute', bottom: '1%', left: '60%' }} className="d-flex justify-content-center m-auto" src={Online} />

                        </div>

                        <Paragraph className="font-18 d-flex justify-content-center m-auto mt-3">John Hales</Paragraph>
                        <Paragraph className="font-16 d-flex justify-content-center m-auto">Barber</Paragraph>

                    </Card>
                    
                </Carousel>
            </div>
        </div>
    )
}

export default FollowingCard
