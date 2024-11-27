self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    self.clients.claim();
});

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SET_TIMER') {
        const { targetTime, content } = event.data.data
        console.log("targetTime", event.data.data);
        setTimeout(() => {
            self.registration.showNotification('Reminder', {
                body: content,
            });

            self.clients.matchAll().then(clients => {
                console.log({ clients })
                clients.forEach(client => {
                    client.postMessage({ type: 'PLAY_SOUND' });
                });
            });
        }, targetTime - Date.now());
    }
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        self.clients.matchAll().then(clients => {
            if (clients.length > 0) {
                clients[0].focus();
            } else {
                self.clients.openWindow('/');
            }
        })
    );
});

