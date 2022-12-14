import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux';
import './App.css';
import firebase from './firebase/firebase';
import { createStore } from 'redux';
import Routers from './router/router'
import rootReducer from './reducer/index'
import { notification } from 'antd';
import { useHistory } from 'react-router-dom';
// import store from './store'


function App() {
  // console.log("project env", process.env.REACT_APP_API_PATH, process.env.REACT_APP_envName)

  let history = useHistory();



  const validateMessages = (data) => {
    const args = {
      message: data.name,
      description:
        `${data?.message}`,
      onClick: () => onNotificationClick(data),
      duration: 5,
    };

    notification.success(args);
  };


  const [notify, setNotify] = useState({})
  const [loader, setLoader] = useState(false)
  const [reloadNotifications, setReloadNotifications] = useState(false)

  useEffect(() => {

    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

    if (isSafari) {
      // alert("Notification disabled in Safari")
    }
    else {

      const messaging = firebase.messaging();

      messaging.requestPermission().then(() => {
        return messaging.getToken()
      }).then(token => {
        localStorage.setItem('firebaseToken', token)
      }).catch((err) => {
        console.log(err)
      })

      messaging.onMessage((payload) => {

        try {
          console.log("Reload")
          setReloadNotifications(!reloadNotifications)
          localStorage.setItem('reload',reloadNotifications)
          setLoader(!loader)
          if (payload?.data?.type == "2" && payload?.data?.On == "1") {
            let notifyMessage = {
              name: payload?.data?.firstName,
              message: " is now off"
            }
            validateMessages(notifyMessage);
          }
          else if (payload?.data?.type == "2" && payload?.data?.On == "0") {

            let notifyMessage = {
              name: payload?.data?.firstName,
              message: " is now on"
            }
            validateMessages(notifyMessage);
          }

          else if (payload?.data?.type == "1") {

            let notifyMessage = {
              name: payload?.data?.firstName,
              message: "wants to follow you"
            }
            validateMessages(notifyMessage);
          }
          else if (payload?.data?.type == "3") {

            let notifyMessage = {
              name: payload?.data?.firstName,
              message: "Accepted your follow request"
            }
            validateMessages(notifyMessage);
          }
        }
        catch (err) {
          console.log(err)
        }

      });

    }

  }, [loader])


  function onNotificationClick(data) {
    window.location.href = `./profile/${'Herry'}`
  }

  return (
    <div className="App">
      <Routers reload={reloadNotifications} loader={loader} />

    </div>
  );
}

export default App;
