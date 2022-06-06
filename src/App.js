import './App.css';

import React from 'react';
//Import Firebase SDK, dependencies 
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import SignInButton from './components/Button/SignInButton'
import SignOutButton from './components/Button/SignOutButton'

import Channel from './components/Channel/Channel';
import Chat from './container/ChatApp/Chat'
import {useAuthState, useDarkMode} from './hooks';

import Landing from './container/Landing/Landing';

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

  const [darkMode, setDarkMode] = useDarkMode();
  
  //  Deals with user logging in part.
  const { user, initializing } = useAuthState(firebase.auth());

  const SignOutGoogle = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error.message);
    }
  }

  const SunIcon = () => {
    return(
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        fill="currentColor" 
        className="bi bi-sun" 
        viewBox="0 0 16 16">
        <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
      </svg>
    )
  }

  const MoonIcon = () => {
    return(
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        fill="currentColor" 
        className="bi bi-moon" 
        viewBox="0 0 16 16">
        <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z"/>
      </svg>
    )
  }

  var ThemeIcon = darkMode ? SunIcon : MoonIcon;
  
  // if (user) return <Channel user={user} />;

  return (
    <div className="App">
      {/* Log in/Log out component */}
      {
        user ? (
          <div className={darkMode ? "bg-light text-dark" : "bg-dark text-light"}>
            <nav className= {darkMode ? "navbar navbar-light bg-light sticky-top mb-5" : "navbar navbar-dark bg-dark sticky-top mb-5"}>
              <span className="navbar-brand mb-0 h4 fw-bold px-4">whispr.</span>
              <div className='d-flex justify-content-end'>
                {/* <SignOutButton onClick={SignOutGoogle}>Sign Out</SignOutButton> */}
                <button onClick={SignOutGoogle} className={darkMode ? "btn btn-outline-dark mx-3 px-2 pt-1 pb-1 my-sm-0" : "btn btn-outline-light mx-3 px-2 pt-1 pb-1 my-sm-0"} type='submit'>
                    Sign Out
                </button>
                <button onClick={() => setDarkMode(prev => !prev)} className =
                  {darkMode ? 
                  'd-flex justify-content-center align-items-center btn btn-outline-dark py-2 px-2'
                  :
                  'd-flex justify-content-center align-items-center btn btn-outline-light py-2 px-2'}
                  >
                  <ThemeIcon/>
                </button>
              </div>
            </nav>
            <div className= {darkMode ? "bg-light text-dark" : "bg-dark text-light"}>
                <h3 className="display-3 text-center ">Welcome back!</h3>
                <p className="text-muted text-center">This is the beginning of this chat.</p>
                <hr className='text-muted mb-5'></hr>
            </div>
            <Channel user={user} darkMode = {darkMode} />
          </div>
        )
       : <div>
          <Landing/>
         </div>
        
      }


    </div>
  );
}

export default App;
