import firebase from 'firebase';

export const appName = 'green-day-app';
export const firebaseConfig = {
    apiKey: "AIzaSyDktkqjYjjdtOSj_QgWK1psmuCVFPavuq0",
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    storageBucket: `${appName}.appspot.com`,
    messagingSenderId: "41015572323"
};

firebase.initializeApp(firebaseConfig);