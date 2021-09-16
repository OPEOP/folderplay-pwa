/* eslint-disable */

self.addEventListener('fetch', e => {
    if (e.request.url.endsWith('.ico')) {
        e.respondWith(fetch('./favicon2.ico'));
    }

    if (e.request.url.endsWith('/greet')) {
        const headers = new Headers({ 'Content-Type': 'text/html' });
        e.respondWith(new Response('<h1>Hello!</h1>', { headers }));
    }
})

self.addEventListener('message', async e => {
    if (e.data === 'UPDATE_APP') {
        await self.skipWaiting();
        console.log('==>SW updated');
    }

    self.clients.matchAll().then(clients => {
        clients.forEach(client => client.postMessage("Hello, this message from SW!!"))
    })
});

self.addEventListener('push', e => {
    console.log('==>Received push event', e);
})
