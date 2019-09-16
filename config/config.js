import firebase from 'firebase';
//Api details
const config = {
    apiKey: "AIzaSyCdzOavQGwSsSmQ-wdtPDutpZ4ZWvPBDJA",
    authDomain: "myfirstproject-3cbe1.firebaseapp.com",
    databaseURL: "https://myfirstproject-3cbe1.firebaseio.com",
    projectId: "myfirstproject-3cbe1",
    storageBucket: "myfirstproject-3cbe1.appspot.com",
    messagingSenderId: "647733184975"
  };


firebase.initializeApp(config);

export default firebase;
// export const f = firebase;
// export const databse = firebase.database();
// export const auth = firebase.auth();
// export const storage = firebase.storage();