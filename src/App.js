import './App.css';

//Import Firebase SDK, dependencies 
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import Button from './components/Button/Button'

import {useAuthState} from './hooks';

function App() {
  // Configuration of firebase project
  firebase.initializeApp({ 
    apiKey: "AIzaSyCgV5za2DUXnQt8xjMFfoXF879OPvsBYek",
    authDomain: "whispr-chatapp.firebaseapp.com",
    projectId: "whispr-chatapp",
    storageBucket: "whispr-chatapp.appspot.com",
    messagingSenderId: "792564345996",
    appId: "1:792564345996:web:03e9ecdb7990dc38735fa9",
    measurementId: "G-H7KJPWZ859"
   });

  //  Logs in user using google account
  const SignInGoogle = async () => {
    //  get google provider object
    const provider = new firebase.auth.GoogleAuthProvider();
    // language needs to be set to what they preference
    firebase.auth().useDeviceLanguage();
    // Start logging in user
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch(error) {
      console.log(error.message);
    }
  }

  //  Deals with user logging in part.
  const { user, initializing } = useAuthState(firebase.auth());

  const SignOutGoogle = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error.message);
    }
  }
  
  return (
    <div className="App">
      {/* Button to sign in with google */}
      <Button onClick = {SignInGoogle}>
        Sign in with Google
      </Button>
    </div>
  );
}

export default App;
