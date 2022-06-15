import React, { useState, useEffect } from 'react'
import {
    DeleteOutlined
} from '@ant-design/icons';

import { Layout, Dropdown, Image, Row, Col, Typography, notification, Button, Spin, message, Form, Input, Select, InputNumber } from 'antd';
import { editProfile } from '../../../services/apiInteraction';

import { GetProfession } from '../../../services/apiInteraction';
import { useLocation } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import Header from '../../header/header';

// import { editProfile } from './../../services/apiInteraction';

const validateMessages = (data) => {
    const args = {
        message: 'Error',
        description:
            `${data?.message}`,
        duration: 5,
    };
    notification.error(args);
};

const errorNotification = (data) => {
    const args = {
        message: 'Error',
        description: data,
        duration: 5,
    };
    notification.error(args);
}

const successNotification = (data) => {
    const args = {
        message: 'Success',
        description: data,
        duration: 5,
    };
    notification.success(args);
};
const EditProfile = (user) => {

    const { Content } = Layout;
    const { Title, Text, Paragraph } = Typography;
    const { Option } = Select;
    let history = useHistory();
    const [userHistory, setUserHistory] = useState({})
    const [accountTypeCustom, setAccountTypeCustom] = useState('')
    const [profession, setProfession] = useState('')
    const [services, setServices] = useState([]);
    const [loader, setLoader] = useState(false)
    const [getProfession, setGetProfession] = useState([])
    const [form] = Form.useForm();
    const location = useLocation();

    let id = location?.state

    const [service, setService] = useState([...id?.imOnProfile.services.map(data => data.name)]);
    const [price, setPrice] = useState([...id?.imOnProfile.services.map(data => data.price)]);
    form.setFieldsValue({
        service: service,
        price: price,
    });

    useEffect(async () => {

        let user = id
        setUserHistory(user)
        // setServices(user?.imOnProfile?.services)

        let tempArray = []
        user?.imOnProfile?.services.forEach(service => {
            tempArray.push({ name: service.name, price: service.price })
        })

        form.setFieldsValue({
            website: user?.imOnProfile?.website
        });

        setServices(tempArray)

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



    const onFinish = async (values: any) => {
        // setLoader(true)

        let services = [];

        values.service.forEach((key, i) => services[i] = {
            name: values.service[i],
            price: String(values.price[i])
        });



        let data = {
            // private: accountTypeCustom == '' ? userHistory.private : accountTypeCustom,
            private: accountTypeCustom == true ? true : accountTypeCustom == false ? false : userHistory.private,
            firstName: userHistory?.firstName,
            lastName: userHistory?.lastName,
            address: values?.address == undefined ? userHistory?.imOnProfile?.address : values?.address,
            phoneNumber: userHistory?.phoneNumber,
            emailAddress: userHistory?.emailAddress,
            professionId: profession == "" ? userHistory?.imOnProfile?.profession_data[0]?._id : profession,
            about: values.about == undefined ? userHistory?.imOnProfile?.about : values.about,
            services: services,
            website: values?.website
        }


        let validationFlag = true

        let index = 0;
        data?.services?.forEach(service => {

            index = index + 1

            if (service.name === undefined || service.price === undefined || service.name === null || service.price === null || service.name === '' || service.price === '' || service.name === 'undefined' || service.price === 'undefined') {
                errorNotification("Can not have empty fields!")
                validationFlag = false
            }
            if ( parseInt(service.price) > 999999 ) {
                errorNotification(`Price field no. ${index} too large!`)
                validationFlag = false
            }
            if ( parseInt(service.price) <= 0  ) {
                errorNotification("Price fields can not be 0 or negative!")
                validationFlag = false
            }
            if ( isNaN(service.price)  ) {
                errorNotification(`Price field no. ${index} needs to be a number!`)
                validationFlag = false
            }
        });


        if (!validationFlag) {
            return
        }



        setLoader(true)

        try {
            let resultHandle = await editProfile(data)

            if (resultHandle?.success == true) {

                setLoader(false)
                successNotification("Profile updated!")
                history.push("/profile-1");
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
        // console.log('Failed:', errorInfo);
    };

    function handleChange(value) {
        setProfession(value)
        setService(services.map(data => data.name))
        setPrice(services.map(data => data.price))
    }


    function handleChangeAccountType(value) {
        setAccountTypeCustom(value)
        setService(services.map(data => data.name))
        setPrice(services.map(data => data.price))
    }

    const handleService = (key, index, value) => {

        services[index][key] = value
        setServices(() => services)

    };


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
        let service = form.getFieldValue("service");
        service.splice(index, 1);

        let price = form.getFieldValue("price");
        price.splice(index, 1);
        setService(service);
        setPrice(price)
        form.setFieldsValue({
            service,
            price
        });
    };


    // handle click event of the Add button
    const handleAddClick = () => {
        let temp = [...services]
        temp.push({ name: "", price: "" })
        setServices(temp)
        setService(services.map(data => data.name))
        setPrice(services.map(data => data.price))
    };


    return (
        <div className="animation2 " >
            <Spin className="loader" spinning={loader} size="large" />

            <div style={{ paddingLeft: '5%', paddingRight: '5%', paddingTop: '5%' }} className="" >

                <Row className="mobile-center-align" >

                    <Col className='' md={2} xs={12} >
                        <Image preview={false} className="border-50 " src={userHistory?.profilePicUrl} />
                    </Col>

                    <Col style={{ alignSelf: 'center' }} md={18} xs={24} >

                        <Row style={{ marginLeft: '10px' }} className="mobile-center-align">
                            <Title level={5}  >Edit profile </Title>
                        </Row >

                        <Row className="mobile-center-align">
                        </Row>

                    </Col>
                </Row>
                <Row className="w-100 mt-5" >

                    <Form
                        name="basic"
                        // initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        className="w-100"
                        form={form}

                    >

                        <Row>
                            <Col className="padding-20" md={12} xs={24} >
                                <Paragraph className="font-18">Account Type</Paragraph>
                                <Form.Item
                                    name={['user', 'acountType']}
                                >
                                    <Select className="form-dropdown"
                                        placeholder={userHistory.private == true ? "Private Account" : "Public Account"}
                                        style={{ width: '100%' }}
                                        onChange={handleChangeAccountType}>
                                        <Option value={true}>Private</Option>
                                        <Option value={false}>Public</Option>
                                    </Select>
                                </Form.Item>

                            </Col>
                            {userHistory &&

                                <Col className="padding-20" md={12} xs={24} >
                                    <Paragraph className="font-18">Email Address</Paragraph>
                                    <Form.Item
                                        name={['user', 'email']}
                                        rules={[{ type: 'email' }]}
                                    >
                                        <Input placeholder={userHistory?.emailAddress} disabled className="fancy-border" />
                                    </Form.Item>

                                </Col>
                            }
                        </Row>

                        <Row>
                            <Col className="padding-20" md={12} xs={24} >
                                <Paragraph className="font-18">First name</Paragraph>
                                <Form.Item
                                    name={['firstName']}
                                >
                                    <Input placeholder={userHistory?.firstName} disabled className="fancy-border" />
                                </Form.Item>
                            </Col>
                            {userHistory?.imOnProfile &&
                                <Col className="padding-20" md={12} xs={24} >
                                    <Paragraph className="font-18">Add location address</Paragraph>
                                    <Form.Item
                                        name={['address']}
                                    >
                                        <Input className="fancy-border" defaultValue={userHistory?.imOnProfile?.address} />
                                    </Form.Item>
                                </Col>
                            }
                        </Row>



                        <Row>
                            <Col className="padding-20" md={12} xs={24} >
                                <Paragraph className="font-18">Last name</Paragraph>
                                <Form.Item
                                    name={['lastName']}
                                >

                                    <Input placeholder={userHistory?.lastName} disabled className="fancy-border" />

                                </Form.Item>
                            </Col>
                            {userHistory?.imOnProfile?.about &&
                                <Col className="padding-20" md={12} xs={24} >
                                    <Paragraph className="font-18">About</Paragraph>

                                    <Form.Item
                                        name={['about']}
                                    >
                                        <Input className="fancy-border" defaultValue={userHistory?.imOnProfile?.about} />

                                    </Form.Item>
                                </Col>
                            }
                        </Row>

                        <Row>
                            <Col className="padding-20" md={12} xs={24} >
                                <Paragraph className="font-18">Profession</Paragraph>
                                <Form.Item
                                    name={['profession']}
                                >
                                    <Select placeholder={userHistory?.imOnProfile?.profession_data[0]?.name} className="form-dropdown" style={{ width: '100%' }} onChange={handleChange}>

                                        {
                                            getProfession.map((profession) =>
                                                <Option value={profession._id}>{profession.name}</Option>
                                            )
                                        }
                                    </Select>

                                </Form.Item>
                            </Col>

                            <Col className="padding-20" md={12} xs={24} >
                                <Col className="padding-20" md={24} xs={24} >
                                    <Paragraph className="font-18">Website URL</Paragraph>
                                    <Form.Item
                                        name={['website']}
                                    >

                                        <Input placeholder={userHistory?.imOnProfile?.website} defaultValue={userHistory?.imOnProfile?.website} className="fancy-border" />

                                    </Form.Item>
                                </Col>

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
                                                <Form.Item
                                                    name={['service', i]}
                                                    value={x.name}
                                                    initialValue={x?.name}
                                                    onChange={(event) => handleService('name', i, event.target.value)}
                                                >
                                                    <Input
                                                        initialValue={x?.name}
                                                        defaultValue={x?.name}
                                                        className="fancy-border"
                                                        placeholder={x?.name}
                                                    />

                                                </Form.Item>
                                            </Col>
                                            <Col className="padding-20" span={10}>
                                                <Form.Item
                                                    name={['price', i]}
                                                    value={x.price}
                                                    onChange={(event) => handleService('price', i, event.target.value)}
                                                    initialValue={x?.price}
                                                    rules={[
                                                        ({ getFieldValue }) => ({
                                                            validator(_, value) {
                                                              if ( value < 99999 ) {
                                                                return Promise.resolve();
                                                              }
                                                              return Promise.reject(new Error('Price too large!'));
                                                            },
                                                          }),
                                                    ]}
                                                >
                                                    <Input placeholder={x?.price} defaultValue={x?.price} min={1} max={99999} className="fancy-border" />

                                                </Form.Item>
                                            </Col>

                                            {/* {i == services.length - 1 ? */}

                                            <Col className="padding-20" span={2}>
                                                {/* {i == 0 ? '' : */}
                                                <Button className='delete-button' onClick={() => handleRemoveClick(i)}><DeleteOutlined /></Button>
                                                {/* } */}
                                            </Col>
                                            {/* 
                                                : ''
                                            } */}

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
                                        Save
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

export default EditProfile;
