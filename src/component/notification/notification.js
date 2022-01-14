import React, { useEffect, useState } from 'react'
import { Col, Dropdown, Row, Image, Typography, Button, message, Menu, notification, Spin } from 'antd';
import notificationImage from '../../assets/images/notification.png'
import { EllipsisOutlined } from '@ant-design/icons';
import Option from '../../assets/images/option.png'
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import './notification.css'
import { DeleteNotificationApi, GetNotification, MuteNOtification, StatusChange } from '../../services/apiInteraction';


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

  const [page, setPage] = useState(0)

  const [id, setID] = useState('')

  const [componentLoader, setComponentLoader] = useState(false)

  let newNotification = []

  function handleButtonClick(e) {
    message.info('Click on left button.');
    console.log('click left button', e);
  }

  function handleMenuClick(e) {
    message.info('Click on menu item.');
    console.log('click', e);
  }

  async function deleteNotification(Id) {

    try {

      setLoader(true)

      let data = {

        id: id._id

      }

      let resultHandle = await DeleteNotificationApi(data);

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



  async function offNotification(Id) {

    try {

      setLoader(true)

      let data = {

        followee: id.from,
        on: false,
        off: false

      }

      let resultHandle = await MuteNOtification(data);

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

  const menu = (
    <Menu className="notification-dropdown"
    // onClick={handleMenuClick}
    >
      <Menu.Item onClick={() => deleteNotification(id)} key="1">
        <Paragraph style={{ marginBottom: '0px' }}>Delete</Paragraph>
        <Paragraph className="fade-text">Delete this notification</Paragraph>
      </Menu.Item>
      <Menu.Item key="2">
        <Paragraph style={{ marginBottom: '0px' }}>Stop only this alert</Paragraph>
        <Paragraph className="fade-text">Remove from my alerts</Paragraph>
      </Menu.Item>

      <Menu.Item key="3">
        <Paragraph onClick={() => offNotification(id)} style={{ marginBottom: '0px' }}>Turn off</Paragraph>
        <Paragraph className="fade-text">Stop receiving notifications like this</Paragraph>
      </Menu.Item>

    </Menu>
  );


  useEffect(async () => {

    try {

      // setLoader(true)
      setComponentLoader(true)

      let data = {

        offset: page

      }

      let resultHandle = await GetNotification(data);

      if (resultHandle?.success == true) {

        setComponentLoader(false)

        setGetNotification([...getNotification, ...resultHandle?.message.notify])
      }

      else {
        validateMessages(resultHandle);
        // setLoader(false)
        setComponentLoader(false)
      }

    }
    catch (err) {
      console.log(err)
      // setLoader(false)
      setComponentLoader(false)
    }

  }, [isReload, page])


  function loadMore() {
    setPage(page + 1)
  }


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
    <div >
      <Spin className="loader" spinning={loader} size="large" />


      <Title className='mt-5' level={4}>Notifications </Title>

      {getNotification.map((data) =>

        <Row key={data} className="notification-row mt-5">

          <Col className="display-in-mobile" span={3}>
            <Image className='min-max-width' style={{ width: 'inherit' }} preview={false} style={{ borderRadius: '50%', marginTop: '10px' }} src={data?.from_data[0]?.profilePicUrl} />
          </Col>

          <Col className="position-relative self-align-center" span={13}>
            {data.type == 1 ?
              <Text style={{ padding: '20' }} >{`${data.from_data[0]?.firstName} wants to follow you`}</Text>

              : data.type == 2 ?
                <Text style={{ padding: '20' }} >{`${data.onOff == true ?  `${data.from_data[0]?.firstName + " " + data.from_data[0]?.lastName} is now on` : `${data.from_data[0]?.firstName + " " + data.from_data[0]?.lastName} is now off`}`}</Text>

                : data.type == 3 ?
                  <Text style={{ padding: '20' }} >{`${data.from_data[0]?.firstName} accepted you follow request`}</Text>
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
              <Dropdown trigger={['click']} className='dropdown-button' style={{ border: 'none' }} overlay={menu} placement="bottomRight">
                <Button onClick={() => setID(data)} style={{ border: 'none', background: 'none' }} >  <Image style={{ width: 'inherit' }} preview={false} src={Option} /> </Button>
              </Dropdown>
            </Row>
          </Col>
        </Row>


      )}

      <Row
        style={{
          justifyContent: 'center', alignItems: 'center',
          display: componentLoader == true ? null : 'none'
        }}
        className='component-loader j-c-c' >

        <Spin className='j-c-c' spinning={true} size="large" />

      </Row>


      <Row style={{ justifyContent: 'center', marginTop: '30px', marginBottom: '50px' }}>
        <Button className='load-more-button' onClick={loadMore}>Load More</Button>
      </Row>
    </div>
  )
}

export default Notification
