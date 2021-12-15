import React, { useState, useEffect } from 'react'
import {
    DownOutlined
} from '@ant-design/icons';

import { Layout, Dropdown, Image, Row, Col, Typography, notification, Button, Menu, message, Form, Input, Select } from 'antd';
import Sidebar from '../../../component/sidebar/sidebar';
import Header from '../../../component/header/header';
import { Link } from 'react-router-dom';
import Option from '../../../assets/images/option.png'
import Bell from '../../../assets/images/bell.jpg'
import Line from '../../../assets/images/line.png'
import SuggestIcon from '../../../assets/images/suggest.png'

import { CreateProfile } from '../../../services/apiInteraction';

import * as AuthActions from "../../../actions/authActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { GetProfession } from '../../../services/apiInteraction';

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
function SignupForm(user) {

    const { Content } = Layout;
    const { Title, Text, Paragraph } = Typography;
    const { Option } = Select;
    let history = useHistory();
    const [userHistory, setUserHistory] = useState({})
    // const [email, setEmail] = useState('')
    // const [phone, setPhone] = useState('')
    const [accountType, setAccountType] = useState('')
    const [profession, setProfession] = useState('')
    const [services, setServices] = useState([{ name: "", price: "" }]);
    const [loader, setLoader] = useState(false)

    const [getProfession, setGetProfession] = useState([])


    useEffect(async () => {

        // console.log(user);
        // console.log(userHistory?.user?.user[0]?.emailAddress)
        setUserHistory(user)


        try {

            setLoader(true)
            let resultHandle = await GetProfession();

            if (resultHandle?.success == true) {

                console.log(resultHandle?.message?.Profession)
                setGetProfession(resultHandle?.message?.Profession)

            }

            else {
                validateMessages(resultHandle);
            }

        }
        catch (err) {
            console.log(err)
        }

    }, [user])



    const onFinish = async (values: any) => {

        let data = {
            private: accountType,
            firstName: userHistory?.user?.user[0]?.firstName,
            lastName: userHistory?.user?.user[0]?.lastName,
            address: userHistory?.user?.user[0]?.emailAddress,
            phoneNumber: userHistory?.user?.user[0]?.phoneNumber,
            emailAddress: userHistory?.user?.user[0]?.emailAddress,
            professionId: profession,
            about: values.about,
            services: [
                {
                    name: values.service,
                    price: values.price
                }
            ]
        }
        console.log(data)

        try {
            let resultHandle = await CreateProfile(data)

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
        }

        console.log(data)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    function handleChange(value) {
        setProfession(value)

    }


    function handleChangeAccountType(value){
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
    const handleRemoveClick = index => {
        const list = [...services];
        list.splice(index, 1);
        setServices(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setServices([...services, { name: "", price: "" }]);
    };


    return (
        <div className="animation2 " >

            <div style={{ paddingLeft: '5%', paddingRight: '5%', paddingTop: '5%' }} className="" >

                <Row className="mobile-center-align" >
                    <Col className='' md={2} xs={12} >
                        <Image preview={false} className="border-50 " src={userHistory?.user?.user[0]?.profilePicUrl} />
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
                                    rules={[{ required: true }]}
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
                                    <Input placeholder={userHistory?.user?.user[0]?.emailAddress} disabled className="fancy-border" />
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
                                    <Input placeholder={userHistory?.user?.user[0]?.firstName} disabled className="fancy-border" />
                                </Form.Item>
                            </Col>

                            <Col className="padding-20" md={12} xs={24} >
                                <Paragraph className="font-18">Add location address</Paragraph>
                                <Form.Item
                                    name={['address']}
                                    rules={[{ required: true }]}
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

                                    <Input placeholder={userHistory?.user?.user[0]?.lastName} disabled className="fancy-border" />

                                </Form.Item>
                            </Col>

                            <Col className="padding-20" md={12} xs={24} >
                                <Paragraph className="font-18">About</Paragraph>

                                <Form.Item
                                    name={['about']}
                                    rules={[{ required: true }]}
                                >
                                    <Input className="fancy-border" />

                                </Form.Item>
                            </Col>

                        </Row>

                        <Row>
                            <Col className="padding-20" md={12} xs={24} >
                                <Paragraph className="font-18">Profession</Paragraph>
                                <Form.Item
                                    name={['profession']} rules={[{ required: true }]}
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
                                {services.map((x, i) => {
                                    return (
                                        <Row>
                                            <Col className="padding-20" span={12}>
                                                <Paragraph className="font-18">Services</Paragraph>
                                                <Form.Item
                                                    name={['service']} rules={[{ required: true }]}
                                                >

                                                    <Input className="fancy-border" />

                                                </Form.Item>
                                            </Col>
                                            <Col className="padding-20" span={12}>
                                                <Paragraph className="font-18">Price</Paragraph>
                                                <Form.Item
                                                    name={['price']} rules={[{ required: true }]}
                                                >

                                                    <Input className="fancy-border" />

                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    )
                                })}





                                <Row>
                                    <Button onClick={handleAddClick}>Add more</Button>
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


const mapStateToProps = (state) => {
    return {
        user: state.authReducer.payload
    };
};

const mapDispatchToProps = (dispatch) => ({
    authActions: bindActionCreators(AuthActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
