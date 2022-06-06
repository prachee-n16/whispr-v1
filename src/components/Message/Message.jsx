import React from 'react'
import { formatRelative } from 'date-fns';

import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import './Message.scss'
import { doc, updateDoc, deleteField } from "firebase/firestore";

import axios from 'axios';


var updateMessage = '';

var selectedId = '';
var selectedName = '';
var selectedText = '';

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
        id = '',
        uid = '',
        darkMode = null
    }) => {
        var message_id = id;

        if (!text) return null;

        function handleDelete(e, id) {
            var docRef = firebase.firestore().collection("messages").doc(selectedId.toString());
            docRef.delete();
            selectedId = 0;
        }
        
        function handleUpdate(e, updateMessages, id) {
            var docRef = firebase.firestore().collection("messages").doc(selectedId.toString());
            docRef.update({
                text: updateMessages
            })
            updateMessage = '';
            selectedId = 0;
        }

        function handleUpdateID(e){
            selectedId = e.target.id.toString().slice(0, -3);
            selectedName = document.getElementById(selectedId+"name").innerText
            selectedText = document.getElementById(selectedId+"text").innerText
            
        }

    return (
        <div>
            <div className={darkMode ? 'container' : 'container bg-dark text-light'}>
                <div className={darkMode ? 'row mb-3' : 'row mb-3 bg-dark'}>
                    <div className={darkMode ? 'col-1' : 'col-1 bg-dark'}>
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
                            <p className='mb-0' id={message_id+"name"}>{displayName}</p>
                        ) : null}
                        
                        <div class="position-relative top-0 float-end pb-5 dropdown dropleft">
                            <button className={darkMode ? "btn btn-outline-light text-dark" : "btn btn-outline-dark text-light"} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
                        <p className='align-top mt-2' id={message_id+"text"}>{text}</p>
                    </div>
                </div>
            </div>

            
            <div class="modal fade" id={"deleteModal"} tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div class={darkMode ? "modal-dialog" : "modal-dialog bg-dark text-light"} role="document">
                    <div class={darkMode ? "modal-content" : "modal-content bg-dark text-light"}>
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

            <div className="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="updateModalLabel" aria-hidden="true">
                <div class={darkMode ? "modal-dialog" : "modal-dialog bg-dark text-light"} role="document">
                    <div class={darkMode ? "modal-content" : "modal-content bg-dark text-light"}>
                        <div class="modal-header">
                            <h5 class="modal-title" id="updateModalLabel">Update</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class={darkMode ? "input-group input-group-sm mb-3" : "input-group input-group-sm mb-3 bg-dark text-light"}>
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroup-sizing-sm">@{selectedName}</span>
                            </div>
                            <textarea placeholder="Type your message here..." class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" onChange={(evt) => {updateMessage=evt.target.value;}}/>
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