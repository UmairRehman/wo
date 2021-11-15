import React from 'react'
import { Col, Dropdown, Row, Image, Typography, Button, message, Menu } from 'antd';
import notificationImage from '../../assets/images/notification.png'
import { EllipsisOutlined } from '@ant-design/icons';
import Option from '../../assets/images/option.png'
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import './notification.css'


const { Title, Text, Paragraph } = Typography;

function Notification(props) {

  function handleButtonClick(e) {
    message.info('Click on left button.');
    console.log('click left button', e);
  }
  
  function handleMenuClick(e) {
    message.info('Click on menu item.');
    console.log('click', e);
  }


  const menu = (
    <Menu className="notification-dropdown" onClick={handleMenuClick}>
      <Menu.Item key="1">
        <Paragraph style={{marginBottom:'0px'}}>Delete</Paragraph> 
        <Paragraph className="fade-text">Delete this notification</Paragraph>
      </Menu.Item>
      <Menu.Item key="2">
        <Paragraph style={{marginBottom:'0px'}}>Stop only this alert</Paragraph> 
        <Paragraph className="fade-text">Remove from my alerts</Paragraph>
      </Menu.Item>
      <Menu.Item key="3">
        <Paragraph style={{marginBottom:'0px'}}>Turn off</Paragraph> 
        <Paragraph className="fade-text">Stop receiving notifications like this</Paragraph>
      </Menu.Item>
    </Menu>
  );

  return (
    <div style={{ width: '90%', margin: 'auto', }} >

      <Title level={4}>Notifications </Title>


      <Row className="notification-row mt-5">

        <Col className="display-in-mobile" span={2}>
          <Image style={{ width: 'inherit' }} preview={false} style={{ borderRadius: '50%', marginTop:'10px' }} src={notificationImage} />
        </Col>

        <Col className="position-relative self-align-center" span={14}>
          <Text style={{ padding: '20' }} >{props.data.notificationMsg}</Text>
        </Col>


        <Col className="self-align-center" span={6}>
          <Row className='responsive-button-notification '>
            <Button className="small-button">Accept</Button>
            <Button className="small-button-decline">Declined</Button>
          </Row>
        </Col>

        <Col className="self-align-center" span={2}>
          <Row className="position-relative" style={{ display: 'flex', justifyContent: 'end' }}>
            {/* <Image style={{ width: 'inherit' }} preview={false} style={{ paddingTop: '5px' }} src={Option}/> */}
            <Dropdown style={{border:'none'}} overlay={menu} placement="bottomRight">
              <Button style={{border:'none'}} >  <Image style={{ width: 'inherit' }} preview={false} src={Option}/> </Button>
            </Dropdown>
          </Row>
        </Col>

      </Row>



      <Row className="notification-row mt-5">

        <Col className="display-in-mobile" span={2}>
          <Image style={{ width: 'inherit' }} preview={false} style={{ borderRadius: '50%', marginTop:'10px' }} src={notificationImage} />
        </Col>

        <Col className="position-relative self-align-center" span={14}>
          <Text style={{ padding: '20' }} >{props.data.notificationMsg}</Text>
        </Col>


        <Col className="self-align-center" span={6}>
          <Row className='responsive-button-notification '>
            <Button className="small-button">Accept</Button>
            <Button className="small-button-decline">Declined</Button>
          </Row>
        </Col>

        <Col className="self-align-center" span={2}>
          <Row className="position-relative" style={{ display: 'flex', justifyContent: 'end' }}>
            {/* <Image style={{ width: 'inherit' }} preview={false} style={{ paddingTop: '5px' }} src={Option}/> */}
            <Dropdown style={{border:'none'}} overlay={menu} placement="bottomRight">
              <Button style={{border:'none'}} >  <Image style={{ width: 'inherit' }} preview={false} src={Option}/> </Button>
            </Dropdown>
          </Row>
        </Col>

      </Row>



      <Row className="notification-row mt-5">

        <Col className="display-in-mobile" span={2}>
          <Image style={{ width: 'inherit' }} preview={false} style={{ borderRadius: '50%', marginTop:'10px' }} src={notificationImage} />
        </Col>

        <Col className="position-relative self-align-center" span={14}>
          <Text style={{ padding: '20' }} >{props.data.notificationMsg}</Text>
        </Col>


        <Col className="self-align-center" span={6}>
          <Row className='responsive-button-notification '>
            <Button className="small-button">Accept</Button>
            <Button className="small-button-decline">Declined</Button>
          </Row>
        </Col>

        <Col className="self-align-center" span={2}>
          <Row className="position-relative" style={{ display: 'flex', justifyContent: 'end' }}>
            {/* <Image style={{ width: 'inherit' }} preview={false} style={{ paddingTop: '5px' }} src={Option}/> */}
            <Dropdown style={{border:'none'}} overlay={menu} placement="bottomRight">
              <Button style={{border:'none'}} >  <Image style={{ width: 'inherit' }} preview={false} src={Option}/> </Button>
            </Dropdown>
          </Row>
        </Col>

      </Row>



      <Row className="notification-row mt-5">

        <Col className="display-in-mobile" span={2}>
          <Image style={{ width: 'inherit' }} preview={false} style={{ borderRadius: '50%', marginTop:'10px' }} src={notificationImage} />
        </Col>

        <Col className="position-relative self-align-center" span={14}>
          <Text style={{ padding: '20' }} >{props.data.notificationMsg}</Text>
        </Col>


        <Col className="self-align-center" span={6}>
          <Row className='responsive-button-notification '>
            <Button className="small-button">Accept</Button>
            <Button className="small-button-decline">Declined</Button>
          </Row>
        </Col>

        <Col className="self-align-center" span={2}>
          <Row className="position-relative" style={{ display: 'flex', justifyContent: 'end' }}>
            {/* <Image style={{ width: 'inherit' }} preview={false} style={{ paddingTop: '5px' }} src={Option}/> */}
            <Dropdown style={{border:'none'}} overlay={menu} placement="bottomRight">
              <Button style={{border:'none'}} >  <Image style={{ width: 'inherit' }} preview={false} src={Option}/> </Button>
            </Dropdown>
          </Row>
        </Col>

      </Row>
    </div>
  )
}

export default Notification
