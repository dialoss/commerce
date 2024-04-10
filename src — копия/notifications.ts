//@ts-nocheck
import {initializeApp} from "firebase/app";
import {getMessaging, getToken, onMessage} from "firebase/messaging";
import Userfront from "@userfront/toolkit/react";

const firebaseConfig = {
    apiKey: "AIzaSyBIRILz5CGXc_VnbnTXsS1ctwGAUQISN9k",
    authDomain: "mymount-d1cad.firebaseapp.com",
    databaseURL: "https://mymount-d1cad-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "mymount-d1cad",
    storageBucket: "mymount-d1cad.appspot.com",
    messagingSenderId: "552748272683",
    appId: "1:552748272683:web:00316f5db5feb7a29e6e6e"
};

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);
navigator.serviceWorker.register("/sw.js").then(reg => {
    getToken(messaging, {
        vapidKey: 'BCW_SE0Ya79VLvyQcUhvaHz3pLqo2JN3f4o6UmaxwT5gTHinwgr3TJwtz6TKRf8aXmrqmA-DfOaiOY_btNVYK6M',
        serviceWorkerRegistration: reg,
    }).then((currentToken) => {
        if (currentToken) {
            Userfront.user.update({data: {token: currentToken}})
            console.log(currentToken)
        } else {
            console.log('No registration token available. Request permission to generate one.');
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });
})
