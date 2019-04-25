import firebase from 'firebase';

export const initializeFirebase = () => {
    firebase.initializeApp({
        messagingSenderId: "536101346762"
    });
    navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then((registration) => {
            firebase.messaging().useServiceWorker(registration);
        });
};