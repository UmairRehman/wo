

importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

firebase.initializeApp({
    apiKey: "AIzaSyA22v2LQyu8UcUln8-7TcLvPYhLnel_Gcg",
    authDomain: "whos-on-340806.firebaseapp.com",
    projectId: "whos-on-340806",
    storageBucket: "whos-on-340806.appspot.com",
    messagingSenderId: "679274960122",
    appId: "1:679274960122:web:5301af8c8aae596ede6543",
    measurementId: "G-K3QPSGNBDT"
  });



// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {

    // const notificationTitle = payload.notification.title;
    const notificationOptions = {
        // body: payload.notification.body,
        body: payload.data
    };

    // self.registration.showNotification(payload.data.firstName,
    //     notificationOptions);
});





