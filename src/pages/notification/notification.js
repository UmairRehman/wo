import React from 'react'
import NotificationComponent from '../../component/notification/notification'
import Header from '../../component/header/header';


function Notification() {

    const notificationData = {
        image: "image Link",
        notificationMsg : "Congratulations alexander start following you"
    }


    return (
        <div  className="animation2">
            <div >
                <div className="test">
                    <Header />
                </div>

                <div className="content padding-whole-page">
                    <NotificationComponent data={notificationData} className="w-100"/>
                </div>
            
            </div>
        </div>
    )
}

export default Notification
