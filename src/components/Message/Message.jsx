import React from 'react'
import { formatRelative } from 'date-fns';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import './Message.scss'
import { doc, updateDoc, deleteField } from "firebase/firestore";

var updateMessage = '';
var selectedId = '';

const formatDate = date => {
    let formattedDate = '';
    if (date) {
      // Convert the date in words relative to the current date
      formattedDate = formatRelative(date, new Date());
      // Uppercase the first letter
      formattedDate =
        formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }
    return formattedDate;
};

const Message = ({
        createdAt = null,
        text = '',
        displayName = '',
        photoURL = '',
        id = ''
    }) => {
        var message_id = id;
        
        if (!text) return null;
        

        function handleDelete(e, id) {
            var docRef = firebase.firestore().collection("messages").doc(selectedId.toString());
            docRef.delete();
        }
        
        function handleUpdate(e, updateMessages, id) {
            var docRef = firebase.firestore().collection("messages").doc(selectedId.toString());
            docRef.update({
                text: updateMessages
            })
            updateMessage = '';
        }

        function handleUpdateID(e){
            selectedId = e.target.id.toString().slice(0, -3);
            console.log(selectedId);
        }

    return (
        <div>
            <div className='container'>
                <div className='row mb-3'>
                    <div className='col-1'>
                        {photoURL ? (
                            <img
                            className="rounded rounded-circle d-block"
                            src={photoURL}
                            alt="Avatar"
                            width={50}
                            height={50}
                            />
                        ) : null}
                        
                    </div>

                    <div className='col-11' id='message'>
                        {displayName ? (
                            <p className='mb-0'>{displayName}</p>
                        ) : null}
                        
                        <div class="position-relative top-0 float-end pb-5 dropdown dropleft">
                            <button class="btn btn-outline-light text-dark" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="bi bi-three-dots-vertical"></i>
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" data-toggle="modal" id={message_id+"del"} data-target="#deleteModal" onClick={e => handleUpdateID(e)}>Delete</a>
                                <a class="dropdown-item" data-toggle="modal" id={message_id+"upd"} data-target="#updateModal" onClick={e => handleUpdateID(e)}>Update</a>
                            </div>
                        </div>
                        {createdAt?.seconds ? (
                            <span className='text-muted align-text-top'>
                            {formatDate(new Date(createdAt.seconds * 1000))}
                            </span>
                        ) : null}
                        <p className='align-top mt-2'>{text}</p>
                    </div>
                </div>
            </div>

            
            <div class="modal fade" id={"deleteModal"} tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="deleteModalLabel">Delete</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            Would you like to delete this message?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={e => handleDelete(e, message_id)}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="updateModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="updateModalLabel">Update</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="input-group input-group-sm mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroup-sizing-sm">@{displayName}</span>
                            </div>
                            <input type="text" placeholder={selectedId.valueOf()} class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" onChange={(evt) => {updateMessage=evt.target.value;}}/>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={e => handleUpdate(e, updateMessage, message_id)}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Message