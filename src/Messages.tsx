// @ts-nocheck

import NotificationAPI from 'notificationapi-js-client-sdk';

const notificationapi = new NotificationAPI({
    clientId: '6tr2qqm45lvfe35o3dsijfsg9d',
    userId: 'dialoss',
    customServiceWorkerPath:
        '/notificationapi-service-worker.js'
});
notificationapi.identify({
    id: 'dialoss',
    email: 'redshock75@gmail.com'
});