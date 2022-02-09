import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const config = {
    apiKey: "AIzaSyAcf7vs5Bqg4AMo43lOQji4fGKP_QPYPfQ",
    authDomain: "commercial-aqc.firebaseapp.com",
    databaseURL: "https://commercial-aqc-default-rtdb.firebaseio.com",
    projectId: "commercial-aqc",
    storageBucket: "commercial-aqc.appspot.com",
    messagingSenderId: "898669997713",
    appId: "1:898669997713:web:62a85b93574a57d4561930",
    measurementId: "G-VCG0T7QEYL"
}

firebase.initializeApp(config);
export default firebase;