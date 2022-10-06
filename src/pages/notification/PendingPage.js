import React, { useState } from 'react'
import NotificationComponent from '../../component/notification/notification'
import Header from '../../component/header/header';
import PendingRequests from '../../component/notification/pendingRequests';


function PendingPage() {

    const notificationData = {
        image: "image Link",
        notificationMsg: "Congratulations alexander start following you"
    }

    const [notificationFlag, setNotificationFlag] = useState(false)




    return (
        <div className="animation2">
            <div >
                <div className="test">
                    <Header notificationFlag={notificationFlag} setNotificationFlag={setNotificationFlag} />
                </div>

                <div className="content padding-whole-page">
                    {/* <NotificationComponent notificationFlag={notificationFlag} setNotificationFlag={setNotificationFlag} data={notificationData} className="w-100"/> */}
                    <PendingRequests />
                </div>

            </div>
        </div>
    )
}

export default PendingPage
