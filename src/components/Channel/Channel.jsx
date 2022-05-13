import { useState, useEffect, useRef } from "react";
import firebase from "firebase/compat/app";
import Message from "../Message/Message";
import { useFirestoreQuery } from '../../hooks';

const Channel = ({user = null}) => {
    const db = firebase.firestore();
    const query = db.collection('messages').orderBy('createdAt').limit(100);
    const [docs, setDocs] = useState([]);

    const messagesRef = db.collection('messages');
    const messages = useFirestoreQuery(
        messagesRef.orderBy('createdAt', 'desc').limit(100)
      );

    const [newMessage, setNewMessage] = useState('');
    const { uid, displayName, photoURL } = user;

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
                photoURL,
            });

            setNewMessage('');
            bottomListRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }

    useEffect(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, [inputRef]);
    
    return (
        <>
            <ul>
            {messages
              ?.sort((first, second) =>
                first?.createdAt?.seconds <= second?.createdAt?.seconds ? -1 : 1
              )
              ?.map(message => (
                <li key={message.id}>
                  <Message {...message} />
                </li>
              ))}
            </ul>
            <form onSubmit={handleOnSubmit}>
                <input
                    ref={inputRef}
                    type="text"
                    value={newMessage}
                    onChange={handleOnChange}
                    placeholder = "Type your message here..."
                />
                <button 
                    type="submit"
                    disabled={!newMessage}>
                        Send
                </button>
            </form>
        </>
    );
}

export default Channel;
