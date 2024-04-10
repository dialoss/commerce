importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

var firebaseConfig = {
    apiKey: "AIzaSyBIRILz5CGXc_VnbnTXsS1ctwGAUQISN9k",
    authDomain: "mymount-d1cad.firebaseapp.com",
    projectId: "mymount-d1cad",
    storageBucket: "mymount-d1cad.appspot.com",
    messagingSenderId: "552748272683",
    appId: "1:552748272683:web:00316f5db5feb7a29e6e6e"
};
try {
    firebase.initializeApp(firebaseConfig);
    const messaging = firebase.messaging();
} catch (e) {}