import React, { useState, useEffect } from 'react'
import {
    DeleteOutlined
} from '@ant-design/icons';

import { Layout, Dropdown, Image, Row, Col, Typography, notification, Button, Spin, message, Form, Input, Select } from 'antd';


import { CreateProfile } from '../../../services/apiInteraction';

import * as AuthActions from "../../../actions/authActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { GetProfession } from '../../../services/apiInteraction';

import { useHistory } from "react-router-dom";
import '../auth.css'



const validateMessages = (data) => {
    const args = {
        message: 'Error',
        description:
            `${data?.message}`,
        duration: 5,
    };
    notification.error(args);
};
const SignupForm = (user) => {

    const { Content } = Layout;
    const { Title, Text, Paragraph } = Typography;
    const { Option } = Select;
    let history = useHistory();
    const [userHistory, setUserHistory] = useState({})
    const [accountType, setAccountType] = useState('')
    const [profession, setProfession] = useState('')
    const [website, setWebsite] = useState('')
    const [services, setServices] = useState([{ name: "", price: "" }]);
    const [loader, setLoader] = useState(false)

    const [getProfession, setGetProfession] = useState([])


    useEffect(async () => {

        let user = localStorage.getItem("user")

        let userObject = JSON.parse(user)

        setUserHistory(userObject)

        try {

            setLoader(true)
            let resultHandle = await GetProfession();

            if (resultHandle?.success == true) {

                setGetProfession(resultHandle?.message?.Profession)
                setLoader(false)

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



    const onFinish = async (values) => {

        let services = [];

        values.service.forEach((key, i) => services[i] = {
            name: values.service[i],
            price: values.price[i]
        });

        let data = {
            private: accountType,
            firstName: userHistory?.firstName,
            lastName: userHistory?.lastName,
            address: values?.address,
            phoneNumber: userHistory?.phoneNumber,
            emailAddress: userHistory?.emailAddress,
            professionId: profession,
            about: values?.about,
            services,
            website: values?.website?.length ? values.website : '',
        }


        try {
            let resultHandle = await CreateProfile(data)
            setLoader(true)

            if (resultHandle?.success == true) {

                setLoader(false)
                history.push("/completed");
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

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    function handleChange(value) {
        setProfession(value)

    }


    function handleChangeAccountType(value) {
        setAccountType(value)
    }

    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...services];
        list[index][name] = value;
        setServices(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = i => {
        const list = [...services];

        list.splice(i, 1);
        setServices(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setServices([...services, { name: "", price: "" }]);
    };

    function deleteRow(i) {
    }


    return (
        <div className="animation2 " >

            <div style={{ paddingLeft: '5%', paddingRight: '5%', paddingTop: '5%' }} className="" >
                <Spin className="loader" spinning={loader} size="large" />
                <Row className="mobile-center-align" >
                    <Col className='' md={2} xs={12} >
                        <Image preview={false} className="border-50 " src={userHistory?.profilePicUrl} />
                    </Col>

                    <Col style={{ alignSelf: 'center' }} md={18} xs={24} >

                        <Row style={{ marginLeft: '10px' }} className="mobile-center-align">
                            <Title level={5}  >Create user profile </Title>
                        </Row >

                        <Row className="mobile-center-align">
                            {/* <Paragraph style={{ color: '#FD6700' }} className="font-16" >Change Photo </Paragraph> */}
                        </Row>

                    </Col>
                </Row>
                <Row className="w-100 mt-5" >

                    <Form
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        className="w-100"
                    >

                        <Row>
                            <Col className="padding-20" md={12} xs={24} >
                                <Paragraph className="font-18">Account Type</Paragraph>
                                <Form.Item
                                    name={['user', 'acountType']}
                                    rules={[{ required: true, message: "Required field!" }]}
                                >
                                    <Select className="form-dropdown"
                                        // defaultValue="true" 
                                        style={{ width: '100%' }}
                                        onChange={handleChangeAccountType}>
                                        <Option value="true">Private</Option>
                                        <Option value="false">Public</Option>
                                    </Select>
                                </Form.Item>

                            </Col>

                            <Col className="padding-20" md={12} xs={24} >
                                <Paragraph className="font-18">Email Address</Paragraph>
                                <Form.Item
                                    name={['user', 'email']}
                                    rules={[{ type: 'email' }]}
                                >
                                    <Input placeholder={userHistory?.emailAddress} disabled className="fancy-border" />
                                </Form.Item>

                            </Col>
                        </Row>

                        <Row>
                            <Col className="padding-20" md={12} xs={24} >
                                <Paragraph className="font-18">First name</Paragraph>
                                <Form.Item
                                    name={['firstName']}
                                // rules={[{ required: true }]}
                                >
                                    <Input placeholder={userHistory?.firstName} disabled className="fancy-border" />
                                </Form.Item>
                            </Col>

                            <Col className="padding-20" md={12} xs={24} >
                                <Paragraph className="font-18">Add location address</Paragraph>
                                <Form.Item
                                    name={['address']}
                                    rules={[{ required: true, message: "Required field!" }]}
                                >
                                    <Input className="fancy-border" />
                                </Form.Item>
                            </Col>

                        </Row>

                        <Row>
                            <Col className="padding-20" md={12} xs={24} >
                                <Paragraph className="font-18">Last name</Paragraph>
                                <Form.Item
                                    name={['lastName']}
                                // rules={[{ required: true }]}
                                >

                                    <Input placeholder={userHistory?.lastName} disabled className="fancy-border" />

                                </Form.Item>
                            </Col>

                            <Col className="padding-20" md={12} xs={24} >
                                <Paragraph className="font-18">About</Paragraph>

                                <Form.Item
                                    name={['about']}
                                    rules={[{ required: true, message: "Required field!" }]}
                                >
                                    <Input className="fancy-border" />

                                </Form.Item>
                            </Col>

                        </Row>



                        <Row>
                            <Col className="padding-20" md={12} xs={24} >
                                <Paragraph className="font-18">Profession</Paragraph>
                                <Form.Item
                                    name={['profession']} rules={[{ required: true, message: "Required field!" }]}
                                >
                                    <Select className="form-dropdown" style={{ width: '100%' }} onChange={handleChange}>
                                        {
                                            getProfession.map((profession) =>
                                                <Option value={profession._id}>{profession.name}</Option>
                                            )
                                        }
                                    </Select>

                                </Form.Item>
                            </Col>
                            <Col className="padding-20" md={12} xs={24} >
                                <Paragraph className="font-18">Website URL</Paragraph>
                                <Form.Item
                                    name={['website']}
                               
                                >

                                    <Input placeholder={userHistory?.website} className="fancy-border" />

                                </Form.Item>
                            </Col>
                            <Col md={12} xs={24}>
                            </Col>
                            <Col className="padding-20" md={12} xs={24} >


                                <Row>
                                    <Col className="padding-20" span={12}>
                                        <Paragraph className="font-18">Services</Paragraph>

                                    </Col>
                                    <Col className="padding-20" span={12}>
                                        <Paragraph className="font-18">Price</Paragraph>
                                    </Col>
                                </Row>



                                {services.map((x, i) => {
                                    return (
                                        <Row>

                                            <Col className="padding-20" span={12}>
                                                {/* <Paragraph className="font-18">Services</Paragraph> */}
                                                <Form.Item
                                                    name={['service', i]} rules={[{ required: true, message: "Required field!" }]}
                                                >

                                                    <Input placeholder='Service Name' className="fancy-border" />

                                                </Form.Item>
                                            </Col>

                                            <Col className="padding-20" span={10}>
                                                {/* <Paragraph className="font-18">Price</Paragraph> */}
                                                <Form.Item
                                                    name={['price', i]} rules={[{ required: true, message: "Required field!" }]}
                                                >

                                                    <Input placeholder='Price in $' className="fancy-border" />

                                                </Form.Item>
                                            </Col>
                                            {i == services.length - 1 ?

                                                <Col className="padding-20" span={2}>
                                                    {i == 0 ? '' :
                                                        <Button className='delete-button' onClick={() => handleRemoveClick(i)}><DeleteOutlined /></Button>
                                                    }
                                                </Col>

                                                : ''
                                            }
                                        </Row>
                                    )
                                })}

                                <Row>
                                    <Button className='add-more-button' onClick={handleAddClick}>Add more</Button>
                                </Row>

                            </Col>

                        </Row>

                        <Row className="mt-3">
                            <Col md={12} xs={24} >
                                <Form.Item>
                                    {/* <Link to="/varified"> */}
                                    <Button className="button" type="primary" htmlType="submit">
                                        Next
                                    </Button>
                                    {/* </Link> */}
                                </Form.Item>
                            </Col>
                        </Row>




                    </Form>

                </Row >

            </div>
        </div>
    )
}

export default SignupForm;
