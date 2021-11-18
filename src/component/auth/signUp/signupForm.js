import React from 'react'
import {
    DownOutlined
} from '@ant-design/icons';

import { Layout, Dropdown, Image, Row, Col, Typography, Card, Button, Menu, message, Form, Input, Select } from 'antd';
import Sidebar from '../../../component/sidebar/sidebar';
import Header from '../../../component/header/header';
import { Link } from 'react-router-dom';
import Option from '../../../assets/images/option.png'
import Bell from '../../../assets/images/bell.jpg'
import Line from '../../../assets/images/line.png'
import SuggestIcon from '../../../assets/images/suggest.png'


function SignupForm() {

    const { Content } = Layout;
    const { Title, Text, Paragraph } = Typography;
    const { Option } = Select;

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    function handleChange(value) {
        console.log(`selected ${value}`);
    }



    return (
        <div className="animation2 " >

            <div style={{ paddingLeft: '5%', paddingRight: '5%', paddingTop: '5%' }} className="" >
                <Row className="mobile-center-align" >
                    <Col className='' md={3} xs={12} >
                        <Image preview={false} className="border-50 " src={SuggestIcon} />
                    </Col>

                    <Col style={{ alignSelf: 'center' }} md={18} xs={24} >

                        <Row className="mobile-center-align">
                            <Title level={5}  >Create user profile </Title>
                        </Row >

                        <Row className="mobile-center-align">
                            <Paragraph style={{ color: '#FD6700' }} className="font-16" >Change Photo </Paragraph>
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

                                <Select className="form-dropdown" defaultValue="lucy" style={{ width: '100%' }} onChange={handleChange}>
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                    <Option value="Yiminghe">yiminghe</Option>
                                </Select>

                            </Col>

                            <Col className="padding-20" md={12} xs={24} >
                                <Paragraph className="font-18">Email Address</Paragraph>
                                <Form.Item
                                    name={['user', 'email']}
                                    rules={[{ type: 'email', required: true }]}
                                >
                                    <Input className="fancy-border" />
                                </Form.Item>

                            </Col>
                        </Row>

                        <Row>
                            <Col className="padding-20" md={12} xs={24} >
                                <Paragraph className="font-18">First name</Paragraph>
                                <Form.Item
                                    name={['user', 'name']} rules={[{ required: true }]}
                                >

                                    <Input className="fancy-border" />

                                </Form.Item>
                            </Col>

                            <Col className="padding-20" md={12} xs={24} >
                                <Paragraph className="font-18">Add location address</Paragraph>
                                <Form.Item
                                    name={['user', 'address']} rules={[{ required: true }]}
                                >

                                    <Input className="fancy-border" />

                                </Form.Item>
                            </Col>

                        </Row>

                        <Row>
                            <Col className="padding-20" md={12} xs={24} >
                                <Paragraph className="font-18">Last name</Paragraph>
                                <Form.Item
                                    name={['user', 'lastName']} rules={[{ required: true }]}
                                >

                                    <Input className="fancy-border" />

                                </Form.Item>
                            </Col>

                            <Col className="padding-20" md={12} xs={24} >
                                <Paragraph className="font-18">About</Paragraph>

                                <Form.Item
                                    name={['user', 'about']}
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
                                    name={['user', 'profession']} rules={[{ required: true }]}
                                >
                                    <Select className="form-dropdown" defaultValue="lucy" style={{ width: '100%' }} onChange={handleChange}>
                                        <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                        <Option value="Yiminghe">yiminghe</Option>
                                    </Select>

                                </Form.Item>
                            </Col>

                            <Col className="padding-20" md={12} xs={24} >
                                <Row>
                                    <Col className="padding-20" span={12}>
                                        <Paragraph className="font-18">Services</Paragraph>
                                        <Form.Item
                                            name={['user', 'services']} rules={[{ required: true }]}
                                        >

                                            <Input className="fancy-border" />

                                        </Form.Item>
                                    </Col>
                                    <Col className="padding-20" span={12}>
                                        <Paragraph className="font-18">Price</Paragraph>
                                        <Form.Item
                                            name={['user', 'price']} rules={[{ required: true }]}
                                        >

                                            <Input className="fancy-border" />

                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Col>

                        </Row>

                        <Row className="mt-3">
                            <Col md={12} xs={24} >
                                <Form.Item>
                                    <Link to="/varified">
                                        <Button className="button" type="primary" htmlType="submit">
                                            Next
                                        </Button>
                                    </Link>
                                </Form.Item>
                            </Col>
                        </Row>




                    </Form>

                </Row >

            </div>
        </div>
    )
}

export default SignupForm
