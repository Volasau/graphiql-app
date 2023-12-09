//Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: 'AIzaSyAU_zcxzBSoX_TMthtVtRJ6RF6ozWrn-Wo',
  authDomain: 'graphiql-app-24102.firebaseapp.com',
  projectId: 'graphiql-app-24102',
  storageBucket: 'graphiql-app-24102.appspot.com',
  messagingSenderId: '907793083036',
  appId: '1:907793083036:web:16705fbdbf9b52ad789b59',
  measurementId: 'G-KJQS4PQ683',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
