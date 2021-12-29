import React, { useEffect, useState } from 'react'
import { Col, Dropdown, Row, Image, Typography, Button, message, Menu, notification, Spin } from 'antd';
import notificationImage from '../../assets/images/notification.png'
import { EllipsisOutlined } from '@ant-design/icons';
import Option from '../../assets/images/option.png'
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import './notification.css'
import { GetNotification, StatusChange } from '../../services/apiInteraction';


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


function Notification(props) {

  const [getNotification, setGetNotification] = useState([])

  const [loader, setLoader] = useState(false)

  const [isReload, setIsReload] = useState(false)

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
        <Paragraph style={{ marginBottom: '0px' }}>Delete</Paragraph>
        <Paragraph className="fade-text">Delete this notification</Paragraph>
      </Menu.Item>
      <Menu.Item key="2">
        <Paragraph style={{ marginBottom: '0px' }}>Stop only this alert</Paragraph>
        <Paragraph className="fade-text">Remove from my alerts</Paragraph>
      </Menu.Item>
      <Menu.Item key="3">
        <Paragraph style={{ marginBottom: '0px' }}>Turn off</Paragraph>
        <Paragraph className="fade-text">Stop receiving notifications like this</Paragraph>
      </Menu.Item>
    </Menu>
  );


  useEffect(async () => {

    try {

      setLoader(true)
      let resultHandle = await GetNotification();

      console.log(resultHandle)

      if (resultHandle?.success == true) {

        setLoader(false)
        setGetNotification(resultHandle?.message.notify)

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

  }, [isReload])


  async function acceptRequest(data) {

    let obj = {
      followee: data.from,
      status: 2
    }
    try {
      setLoader(true)
      let resultHandle = await StatusChange(obj);

      if (resultHandle?.success == true) {

        setLoader(false)
        setIsReload(!isReload)
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

  }

  async function rejectRequest(data) {
    let obj = {
      followee: data.from,
      status: 3
    }
    try {
      setLoader(true)
      let resultHandle = await StatusChange(obj);

      if (resultHandle?.success == true) {

        setLoader(false)
        setIsReload(!isReload)
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
  }

  return (
    <div style={{ width: '90%', margin: 'auto', }} >
      <Spin className="loader" spinning={loader} size="large" />


      <Title level={4}>Notifications </Title>
      
      {getNotification.map((data) =>

        <Row key={data} className="notification-row mt-5">

          <Col className="display-in-mobile" span={2}>
            <Image className='min-max-width' style={{ width: 'inherit' }} preview={false} style={{ borderRadius: '50%', marginTop: '10px' }} src={data?.from_data[0]?.profilePicUrl} />
          </Col>

          <Col className="position-relative self-align-center" span={14}>
            {data.type == 1 ?
              <Text style={{ padding: '20' }} >{`${data.from_data[0]?.firstName} wants to follow you`}</Text>
              : null}
          </Col>



          <Col className="self-align-center" span={6}>
            {data.type == 1 && data.isRead == false ?
              <Row className='responsive-button-notification '>

                <Button onClick={() => acceptRequest(data)} className="small-button">Accept</Button>
                <Button onClick={() => rejectRequest(data)} className="small-button-decline">Declined</Button>

              </Row>
              : null}
          </Col>

          <Col className="self-align-center" span={2}>
            <Row className="position-relative" style={{ display: 'flex', justifyContent: 'end' }}>
              <Dropdown style={{ border: 'none' }} overlay={menu} placement="bottomRight">
                <Button style={{ border: 'none', background: 'none' }} >  <Image style={{ width: 'inherit' }} preview={false} src={Option} /> </Button>
              </Dropdown>
            </Row>
          </Col>
        </Row>


      )}

    </div>
  )
}

export default Notification
