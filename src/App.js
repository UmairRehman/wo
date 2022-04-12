import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux';
import './App.css';
import firebase from './firebase/firebase';
import { createStore } from 'redux';
import Routers from './router/router'
import rootReducer from './reducer/index'
import { notification } from 'antd';
// import store from './store'

const validateMessages = (data) => {
  const args = {
    message: data.name,
    description:
      `${data?.message}`,
    duration: 5,
  };
  notification.success(args);
};

function App() {

  const [notify, setNotify] = useState({})
  const [loader, setLoader] = useState(false)


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
          setLoader(!loader)
          console.log(payload);
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
              message: "Accept your follow request"
            }
            validateMessages(notifyMessage);
          }
          console.log('useEffect')
        }
        catch (err) {
          console.log(err)
        }

      });

    }

  }, [loader])
  return (
    <div className="App">

      <Routers loader={loader} />

    </div>
  );
}

export default App;
