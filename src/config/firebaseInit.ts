import firebase from 'firebase';
//Don't forget to add this config file
import config from './firebaseConfig';

const firebaseInit = firebase.initializeApp(config);
export const firebaseAnalytics = firebase.analytics();
export default firebaseInit.firestore();
