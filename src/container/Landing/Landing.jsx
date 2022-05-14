import React from 'react'

import './Landing.css'

//Import Firebase SDK, dependencies 
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import {useAuthState} from '../../hooks';

import Button from '../../components/Button/SignInButton'

const Landing = () => {
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

    //  Deals with user logging in part.
    const { user, initializing } = useAuthState(firebase.auth());
    

    // Logs in user using google account
    const SignInGoogle = async (event) => {
        event.preventDefault();
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

  return (
    <section class="vh-100">
    <div class="container-fluid">
    
      <div class="row">
        <div class="col-sm-6 text-black">
  
          <div class="px-5 mt-5">
            <span class="h4 fw-bold px-4">whispr.</span>
          </div>
  
          <div class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
  
            <form style={{width: "23rem"}}>
  
              <h3 class="fw-normal mt-1 fw-bold" style={{letterSpacing: "1px"}}>Welcome Back!</h3>
              <p className='fw-normal mb-3 pb-3'>Lorem Ipsum dior sit amet. Tretor fret nit cot deter.</p>
              <div class="form-outline mb-4">
                <label class="form-label" for="form2Example18">Email address</label>
                <input type="email" id="form2Example18" class="form-control form-control-lg" />
              </div>
  
              <div class="form-outline mb-3">
                <label class="form-label" for="form2Example28">Password</label>
                <input type="password" id="form2Example28" class="form-control form-control-lg" />
              </div>
  
              <div class="pt-1 mb-1">
                <button class="btn btn-dark btn-lg btn-block" type="button">Login</button>
              </div>
  
              <p class="small"><a class="text-muted" href="#!">Forgot password?</a></p>

              <div class="divider d-flex align-items-center my-4">
                <p class="text-center fw-bold mx-3 mb-0">OR</p>
              </div>

              <Button onClick = {SignInGoogle}>Sign in with Google</Button>

              <p>Don't have an account? <a href="#!" class="link-info">Register here</a></p>
  
            </form>
  
          </div>
  
        </div>
        <div class="col-sm-6 px-0 d-none d-sm-block">
          <img src="https://www.verywellmind.com/thmb/sUlxMzL2Kb8MjJsiP67s_GgD_CU=/2121x1414/filters:fill(ABEAC3,1)/GettyImages-1057500046-f7e673d3a91546b0bd419c5d8336b2e0.jpg"
            alt="Login" class="w-100 vh-100" style={{objectFit: "cover", objectPosition: "left",}}/>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Landing