import { useState, useEffect, useRef } from "react";
import firebase from "firebase/compat/app";
import Message from "../Message/Message";
import { useFirestoreQuery } from '../../hooks';

import axios from 'axios';

import './Channel.scss'
const Channel = ({user = null, darkMode = null}) => {
    const db = firebase.firestore();
    const query = db.collection('messages').orderBy('createdAt').limit(100);
    const [docs, setDocs] = useState([]);
    
    const messagesRef = db.collection('messages');
    const messages = useFirestoreQuery(
        messagesRef.orderBy('createdAt', 'desc').limit(100)
      );

      // Input text
    const [newMessage, setNewMessage] = useState('');

    const [detectLanguageKey, setdetectedLanguageKey] = useState('en');
    const [selectedLanguageKey, setLanguageKey] = useState('');
    const [languagesList, setLanguagesList] = useState([])

    const [resultMessage, setResultMessage] = useState('');

    const { uid, displayName, photoURL, message_id } = user;

    const inputRef = useRef();
    const bottomListRef = useRef();

    const getLanguageSource = () => { 
      setdetectedLanguageKey('');

      try
      {axios.post('https://libretranslate.de/detect', {
        q: newMessage
      })
      .then((response) => {
        setdetectedLanguageKey(response.data[0].language)
      })
    } 
      
      catch (err) {
        console.log(err)
      }
    }

    useEffect(() => {
      try
      {axios.get(`https://libretranslate.de/languages`)
      .then((response) => 
        {setLanguagesList(response.data)}
      )}
      catch (err) {
        console.log(err)
      }
    }, [])

    const languageKey = (selectedLanguage) => {
      setLanguageKey(selectedLanguage.target.value)
    }

    const translateText = () => {
      getLanguageSource();
    }

    useEffect(() => {
      let data = {
        q: newMessage,
        source: detectLanguageKey,
        target: selectedLanguageKey
      }
      try
      {axios.post(`https://libretranslate.de/translate`, data)
      .then((response) => {
        setResultMessage(response.data.translatedText)
      })}
      catch(err) {
        console.log(err)
      }
    }, [newMessage])

    useEffect(() => {
        // subscribe to query with onSnapshot
      const unsubscribe = query.onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
        }))
        setDocs(data);
      })
      
      return unsubscribe;
    }, [])

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, [inputRef]);

    const handleOnChange = e => {
      setNewMessage(e.target.value);
    }

    const handleOnSubmit = e => {
        e.preventDefault();

        var num = translateText();

        const trimmedMessage = resultMessage.trim();
        if (trimmedMessage) {
            messagesRef.add({
                text: trimmedMessage,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                displayName,
                photoURL
            });

            setNewMessage('');
            bottomListRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <div className={darkMode ? "bg-light text-dark" : "bg-dark text-light"}>
            <ul className={darkMode ? "" : "bg-dark"}>
            {messages
              ?.sort((first, second) =>
                first?.createdAt?.seconds <= second?.createdAt?.seconds ? -1 : 1
              )
              ?.map(message => (
                <li key={message.id} className="list-inline">
                  <Message {...message} id={message.id} darkMode = {darkMode}/>
                </li>
              ))}
            </ul>
            <div className={darkMode ? "mb-4 text-light" : "pb-4 bg-dark text-dark"}>iiii</div>
            <div className = {darkMode ? "" : "bg-dark"} ref={bottomListRef} />

            <form onSubmit={handleOnSubmit} className={darkMode ? "mx-5 fixed-bottom bg-light pb-3 mt-5" : "mx-5 fixed-bottom bg-dark pb-3 mt-5"}>
              <div className="input-group mb-3">
                  
                <select className={darkMode ? "language-select" : "language-select bg-dark text-light"} onChange={languageKey}>
                  {languagesList.map((language) => {
                    return(
                      <option key = {language.code} className={darkMode ? "dropdown-item" : "bg-dark text-light dropdown-item"} href='#' value={language.code}>{language.name}</option>
                    )
                  })}
                </select>

                <input
                      ref={inputRef}
                      type="text"
                      value={newMessage}
                      onChange={handleOnChange}
                      className= {darkMode ? "form-control ml-1 mr-1 text-dark" : "form-control ml-1 mr-1 text-light bg-dark"}
                      placeholder = "Type your message here..."
                  >
                </input>

                <button 
                    type="submit"
                    disabled={!newMessage}
                    className={darkMode ? "btn btn-dark mr-5" : "btn btn-outline-light mr-5"}
                    >
                      Send
                  </button>
              </div>
                
                
            </form>
        </div>
    );
}

export default Channel;