import { signOut } from 'firebase/auth';
import { auth } from '../../functions/firebase';

// const auth = getAuth();
signOut(auth)
  .then(() => {
    console.log('Sign-out successful');
    // Sign-out successful.
  })
  .catch((error) => {
    console.log(error);
    // An error happened.
  });
