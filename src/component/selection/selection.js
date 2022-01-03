import React, { useState, useEffect } from 'react'
import { Row, Col, Image, Button, Typography, notification, Spin } from 'antd';
import SelectionImage from '../../assets/images/selectionImage.png'
import { Link } from 'react-router-dom';
import { Favourite, GetProfession } from '../../services/apiInteraction';
import DefaultImage from '../../assets/images/default.png'
import './selection.css'
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


const validateMessagesCustom = (data) => {
    const args = {
        message: 'Error',
        description:
            `${data}`,
        duration: 5,
    };
    notification.error(args);
};

function Selection() {

    const { Title, Text, Paragraph } = Typography;

    const [border, setBorder] = useState(false)

    const [loader, setLoader] = useState(false)

    const [intrest, setIntrest] = useState([])

    let history = useHistory();


    useEffect(async () => {

        try {

            setLoader(true)
            let resultHandle = await GetProfession();

            setLoader(true)
            if (resultHandle?.success == true) {
                setLoader(false)
                setIntrest(resultHandle?.message?.Profession)
            }

            else {
                setLoader(false)
                validateMessages(resultHandle);
            }

        }
        catch (err) {
            console.log(err)
            setLoader(false)
        }


    }, [])

    const [selectedIntrest, setSelectedIntrest] = useState([]);

    function onClickIntrest(data) {

        if (selectedIntrest.includes(data?._id)) {
            // console.log("Allready added")
        }
        else {
            selectedIntrest.push(data?._id)
        }

    }

    function onClickColorChange(id) {

        // console.log(id)
        // let a = "1px solid blue"
        // let b = 'none'
        // // document.getElementById(id).style.border = a;

        // if(document.getElementById(id).style.border == a) {
        //     console.log('allready borderd')
        //     document.getElementById(id).style.border = b;
        // }
        // else{
        //     // document.getElementById(id).style.border = a
        //     console.log('created')
        // }
    }


    async function onClickNext() {
        console.log(selectedIntrest)
        if(selectedIntrest.length > 0){
            try {
                setLoader(true)
                let resultHandle = await Favourite({ favorite: selectedIntrest });
    
                if (resultHandle?.success == true) {
    
                    setLoader(false)
                    history.push('./following')
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
        else{
            validateMessagesCustom("Please select atleast one intrest or press skip button");
        }
    }

    return (
        <div style={{ width: '100%', margin: 'auto' }} >
            <Spin className="loader" spinning={loader} size="large" />
            <Row style={{ justifyContent: 'center', marginTop: '10px' }}>
                {intrest.slice(0,5).map((data) =>
                    <Col className="w-100 mt-5 d-flex justify-content-center" md={5} >
                        <Row onClick={() => onClickIntrest(data)} className="w-100">
                            <Row className="w-100 justify-content-center">
                                <Image id={data._id} onClick={() => onClickColorChange(data._id)} className={`d-flex justify-content-center w-100`}
                                    key={1} className="selection-image-round " src={data?.url || DefaultImage} preview={false} />
                            </Row>
                            <Row className="w-100 mt-3">
                                <Title level={5} className="d-flex justify-content-center w-100">{data?.name}</Title>
                            </Row>
                        </Row>
                    </Col>
                )}

            </Row>

            <Row className="selection-image-div">
                <Button onClick={onClickNext} type="primary" htmlType="submit" className="button mt-5" >
                    Next
                </Button>
            </Row>

            <Row style={{ paddingBottom: '50px' }} className="selection-image-div">
                <Link to='./following'>
                    <Button className="skip-button" >
                        Skip
                    </Button>
                </Link>
            </Row>

        </div>
    )
}

export default Selection
