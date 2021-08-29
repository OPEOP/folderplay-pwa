export const register = (config) => {
    if ('serviceWorker' in navigator) {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
        navigator.serviceWorker.register('./service-worker.js', { ...config }).then(registration => {

        })

        navigator.serviceWorker.addEventListener("message", e => {
            console.log('==>Client get message: ', e.data);
        })
    }
};

export const unregister = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready
            .then((registration) => {
                registration.unregister();
            })
            .catch((error) => {
                console.error(error.message);
            });
    }
};
