import React, { useEffect, useState } from 'react'
import { Col, Dropdown, Row, Image, Typography, Button, message, Menu, notification, Spin } from 'antd';
import notificationImage from '../../assets/images/notification.png'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import Option from '../../assets/images/option.png'
import './notification.css'
import { useHistory } from "react-router-dom";
import { DeleteNotificationApi, GetNotification, MuteNOtification, StatusChange } from '../../services/apiInteraction';
import DefaultImage from '../../assets/images/default.png'
import moment from 'moment';

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

  const [countFlag, setCountFlag] = useState(0);


  let history = useHistory();

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
        setIsReload(() => !isReload)
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
      {/* <Menu.Item key="2">
        <Paragraph style={{ marginBottom: '0px' }}>Stop only this alert</Paragraph>
        <jjjjjjjjjjjjj className="fade-text">Remove from my alerts</Paragraph>
      </Menu.Item> */}

      {/* <Menu.Item key="3">
        <Paragraph onClick={() => offNotification(id)} style={{ marginBottom: '0px' }}>Turn off</Paragraph>
        <Paragraph className="fade-text">Stop receiving notifications like this</Paragraph>
      </Menu.Item> */}

    </Menu>
  );


  useEffect(async () => {

    try {

      setComponentLoader(true)

      let data = {

        offset: page

      }

      let resultHandle = await GetNotification(data);

      if (resultHandle?.success == true) {

        if (countFlag === 0) {
          setGetNotification([...resultHandle?.message.notify])
          setComponentLoader(false)
        }
        if (countFlag === 1) {
          setGetNotification([...getNotification, ...resultHandle?.message.notify])
          setComponentLoader(false)
        }
      }

      else {
        validateMessages(resultHandle);
        setComponentLoader(false)
      }

    }
    catch (err) {
      console.log(err)
      setComponentLoader(false)
    }

  }, [isReload, page, loader, getNotification])


  function loadMore() {
    setPage(page + 1)
    setCountFlag(1);
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

        setIsReload(() => !isReload)
        setLoader(false)
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

        setIsReload(() => !isReload)
        setLoader(false)

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

  function onClickNotification(data) {

    console.log(data.from_data[0]?.username)

    history.push({
      pathname: `/profile/${data.from_data[0].username}`,
    });


  }


  return (
    <div >
      <Spin className="loader" spinning={loader} size="large" />


      <Title className='mt-5' level={4}>Notifications </Title>

      {getNotification?.map((data) =>
        <div>

          <Row key={data} className="notification-row mt-5">

            <Col onClick={() => onClickNotification(data)} className="display-in-mobile" span={3}>
              {data?.from_data[0]?.profilePicUrl ?
                <Image className='min-max-width' style={{ width: 'inherit', borderRadius: '50%', marginTop: '10px', maxWidth: "115px", maxHeight: "100px" }} preview={false} src={data?.from_data[0]?.profilePicUrl} />
                :
                <Image className='min-max-width' style={{ width: 'inherit', borderRadius: '50%', marginTop: '10px', maxWidth: "115px", maxHeight: "100px" }} preview={false} src={DefaultImage} />
              }
            </Col>

            <Col onClick={() => onClickNotification(data)} className="position-relative self-align-center" span={11}>
              {data.type == 1 ?
                <Text style={{ padding: '20' }} >{`${data.from_data[0]?.firstName} wants to follow you`}</Text>

                : data.type == 2 ?
                  <Text style={{ padding: '20' }} >{`${data.onOff == true ? `${data.from_data[0]?.firstName + " " + data.from_data[0]?.lastName} is now on` : `${data.from_data[0]?.firstName + " " + data.from_data[0]?.lastName} is now off`}`}</Text>

                  : data.type == 3 ?
                    <Text style={{ padding: '20' }} >{`${data.from_data[0]?.firstName} accepted you follow request`}</Text>
                    : null}
            </Col>



            <Col className="self-align-center" span={6}>
              {data.type == 1 ?
                <Row className='responsive-button-notification '>

                  <Button onClick={() => acceptRequest(data)} className="small-button">Accept</Button>

                  <Button onClick={() => rejectRequest(data)} className="small-button-decline">Decline </Button>

                  {/* <Button onClick={() => acceptRequest(data)} className="small-button"><CheckOutlined style={{fontWeight:'900', fontSize:'22px'}} /></Button>
                <Button onClick={() => rejectRequest(data)} className="small-button-decline"><CloseOutlined style={{fontWeight:'900', fontSize:'22px'}} /></Button> */}


                </Row>
                : null}
            </Col>


            <Col className="self-align-center" span={2}>
              <Row className="position-relative" style={{ display: 'flex', justifyContent: 'end' }}>
                <Text style={{ marginTop: '5px' }}>{moment(data.updatedAt).format('ll')}</Text>
              </Row>
            </Col>

            <Col className="self-align-center" span={2} >
              <Row className="position-relative" style={{ display: 'flex', justifyContent: 'end' }}>
                {/* <Text style={{ marginTop: '5px' }}>{moment(data.updatedAt).format('ll')}</Text> */}
                <Dropdown trigger={['click']} className='dropdown-button' style={{ border: 'none' }} overlay={menu} placement="bottomRight">
                  <Button onClick={() => setID(data)} style={{ border: 'none', background: 'none' }} >  <Image style={{ width: 'inherit' }} preview={false} src={Option} /> </Button>
                </Dropdown>
              </Row>
            </Col>
          </Row>
        </div>


      )}

      {componentLoader &&
        <Row
          style={{
            justifyContent: 'center', alignItems: 'center',

          }}
          className='component-loader j-c-c' >

          <Spin className='j-c-c' spinning={true} size="large" />

        </Row>
      }


      <Row style={{ justifyContent: 'center', marginTop: '30px', marginBottom: '50px' }}>
        <Button className='load-more-button' onClick={loadMore}>Load More</Button>
      </Row>
    </div>
  )
}

export default Notification
