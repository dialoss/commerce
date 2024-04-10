importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

self.addEventListener("notificationclick", function (e) {
    e.notification.close();
    const url = e.notification.data.url;
    e.waitUntil(
        clients.matchAll({type: 'window'}).then(windowClients => {
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});

self.addEventListener("push", function (e) {
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
