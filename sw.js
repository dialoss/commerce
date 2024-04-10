self.addEventListener("push", e => {
    const notif = e.data.json().notification;
    console.log(e.data.json())
    e.waitUntil(self.registration.showNotification(notif.title, {
        body: notif.body,
        icon: notif.image,
        data: {
            url: notif.click_action
        }
    }));
});

self.addEventListener("notificationClick", e => {
    e.notification.close();
    e.waitUntil(
        clients.matchAll({ type: "window" }).then((clientsArr) => {
            const hadWindowToFocus = clientsArr.some((windowClient) =>
                windowClient.url === e.notification.data.url
                    ? (windowClient.focus(), true)
                    : false,
            );
            if (!hadWindowToFocus)
                clients
                    .openWindow(e.notification.data.url)
                    .then((windowClient) => (windowClient ? windowClient.focus() : null));
        }),
    );
});


importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyBIRILz5CGXc_VnbnTXsS1ctwGAUQISN9k",
    authDomain: "mymount-d1cad.firebaseapp.com",
    databaseURL: "https://mymount-d1cad-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "mymount-d1cad",
    storageBucket: "mymount-d1cad.appspot.com",
    messagingSenderId: "552748272683",
    appId: "1:552748272683:web:00316f5db5feb7a29e6e6e"
});

// const messaging = firebase.messaging();
//
// messaging.onBackgroundMessage((payload) => {
//     console.log(
//         '[firebase-messaging-sw.js] Received background message ',
//         payload
//     );
//     //
//     // const notificationTitle = 'Background Message Title';
//     // const notificationOptions = {
//     //     body: 'Background Message body.',
//     //     icon: '/firebase-logo.png'
//     // };
//     //
//     // self.registration.showNotification(notificationTitle, notificationOptions);
// });