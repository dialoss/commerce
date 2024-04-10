

self.addEventListener('notificationclick', function (e) {
    // console.log('WORKER')
    // console.log(e)
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