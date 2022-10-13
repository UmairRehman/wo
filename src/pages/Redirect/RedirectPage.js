import { Button, Col, Row } from 'antd'
import React from 'react'
import redirect from "../../assets/images/phones.png"
import appStore from "../../assets/images/appstore.png"
import playStore from "../../assets/images/playstore.svg"
export const RedirectPage = () => {

  return (
    <div className='w-100 redirect_bg'>
      <Row style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
        <Col className='redirect_container mt-4' sm={24} md={12}>
          <Row>
            <h2 className='text-white mt-2'>Download this App</h2>
          </Row>
          <Row>
            <a href='https://apps.apple.com/pk/app/whos-on/id1599268330' target='_blank' className='redirect_button'>Get the App at <img className='redirect_button_image' src={appStore} /></a>
          </Row>
          <Row>
            <a href='https://play.google.com/store/apps/details?id=com.whosonapp' target='_blank' className='redirect_button'>Get the App at <img className='redirect_button_image' src={playStore} /></a>
          </Row>
          <Row>
            <img className='phone_res' style={{ width: "280px" }} src={redirect} />
          </Row>
        </Col>
        {/* Image Col */}
        <Col className='redirect_right' sm={24} md={12}>
          <img className='phone_img' style={{ width: "90%" }} src={redirect} />
        </Col>
      </Row>
    </div>

  )
}
