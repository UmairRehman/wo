import React from 'react'
import { Image } from 'antd';
import SplashImage from '../../assets/images/splash.png'


// import CSS 
import './splash.css'

function Splash() {
    return (
        <div className="splashScreen" >
            <p className="text-center w-100">
                <Image
                    width={200}
                    className="splashImage"
                    src={SplashImage}
                />
            </p>
        </div>
    )
}

export default Splash
