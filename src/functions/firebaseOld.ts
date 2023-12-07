// // Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// // import { getAnalytics } from 'firebase/analytics';

// import {
//   GoogleAuthProvider,
//   getAuth,
//   signInWithPopup,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   sendPasswordResetEmail,
//   signOut,
// } from 'firebase/auth';

// import {
//   getFirestore,
//   query,
//   getDocs,
//   collection,
//   where,
//   addDoc,
// } from 'firebase/firestore';
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: 'AIzaSyAU_zcxzBSoX_TMthtVtRJ6RF6ozWrn-Wo',
//   authDomain: 'graphiql-app-24102.firebaseapp.com',
//   projectId: 'graphiql-app-24102',
//   storageBucket: 'graphiql-app-24102.appspot.com',
//   messagingSenderId: '907793083036',
//   appId: '1:907793083036:web:16705fbdbf9b52ad789b59',
//   measurementId: 'G-KJQS4PQ683',
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);
// const auth = getAuth(app);
// const db = getFirestore(app);

// //Google Authentication function

// const googleProvider = new GoogleAuthProvider();
// const signInWithGoogle = async () => {
//   try {
//     const res = await signInWithPopup(auth, googleProvider);
//     const user = res.user;
//     const q = query(collection(db, 'users'), where('uid', '==', user.uid));
//     const docs = await getDocs(q);
//     if (docs.docs.length === 0) {
//       await addDoc(collection(db, 'users'), {
//         uid: user.uid,
//         name: user.displayName,
//         authProvider: 'google',
//         email: user.email,
//       });
//     }
//   } catch (err: Error) {
//     console.error(err);
//     alert(err.message);
//   }
// };

// //Signing in using an email and password:
// const logInWithEmailAndPassword = async (email, password) => {
//   try {
//     await signInWithEmailAndPassword(auth, email, password);
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };

// //Registering a user with an email and password
// const registerWithEmailAndPassword = async (name, email, password) => {
//   try {
//     const res = await createUserWithEmailAndPassword(auth, email, password);
//     const user = res.user;
//     await addDoc(collection(db, 'users'), {
//       uid: user.uid,
//       name,
//       authProvider: 'local',
//       email,
//     });
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };

// //send a password reset link to an email address
// const sendPasswordReset = async (email) => {
//   try {
//     await sendPasswordResetEmail(auth, email);
//     alert('Password reset link sent!');
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };

// //logout function
// const logout = () => {
//   signOut(auth);
// };

// export {
//   auth,
//   db,
//   signInWithGoogle,
//   logInWithEmailAndPassword,
//   registerWithEmailAndPassword,
//   sendPasswordReset,
//   logout,
// };
