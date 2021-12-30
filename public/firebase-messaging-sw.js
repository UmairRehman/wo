

importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

firebase.initializeApp({
    apiKey: "AIzaSyA49mVYSNLXZQqWfq-sJi-MRofZI06u8U8",
    authDomain: "who-s-on.firebaseapp.com",
    projectId: "who-s-on",
    storageBucket: "who-s-on.appspot.com",
    messagingSenderId: "1062275279679",
    appId: "1:1062275279679:web:d3402b9b1c819df656c18a",
    measurementId: "G-F5JXL2F3VC"
});



// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message ', payload);

    // const notificationTitle = payload.notification.title;
    const notificationOptions = {
        // body: payload.notification.body,
        body: payload.data
    };

    // self.registration.showNotification(payload.data.firstName,
    //     notificationOptions);
});





