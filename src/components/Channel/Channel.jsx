import { useState, useEffect, useRef } from "react";
import firebase from "firebase/compat/app";
import Message from "../Message/Message";
import { useFirestoreQuery } from '../../hooks';

import './Channel.scss'
const Channel = ({user = null}) => {
    const db = firebase.firestore();
    const query = db.collection('messages').orderBy('createdAt').limit(100);
    const [docs, setDocs] = useState([]);
    
    const messagesRef = db.collection('messages');
    const messages = useFirestoreQuery(
        messagesRef.orderBy('createdAt', 'desc').limit(100)
      );

    const [newMessage, setNewMessage] = useState('');
    const { uid, displayName, photoURL, message_id } = user;

    const inputRef = useRef();
    const bottomListRef = useRef();

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

        const trimmedMessage = newMessage.trim();
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
        <>
            <ul>
            {messages
              ?.sort((first, second) =>
                first?.createdAt?.seconds <= second?.createdAt?.seconds ? -1 : 1
              )
              ?.map(message => (
                <li key={message.id} className="list-inline">
                  <Message {...message} id={message.id}/>
                  {console.log(message)}
                </li>
              ))}
            </ul>
            <div className="mb-4 text-light">iiii</div>
            <div ref={bottomListRef} />

            <form onSubmit={handleOnSubmit} className="mx-5 fixed-bottom bg-light pb-3 mt-5">
              <div className="input-group mb-3">
                <input
                      ref={inputRef}
                      type="text"
                      value={newMessage}
                      onChange={handleOnChange}
                      className="form-control ml-5 mr-1"
                      placeholder = "Type your message here..."
                  />
                  <button 
                    type="submit"
                    disabled={!newMessage}
                    className="btn btn-dark mr-5"
                    >
                      Send
                  </button>
              </div>
                
                
            </form>
        </>
    );
}

export default Channel;
