import React from 'react'
import { formatRelative } from 'date-fns';
import PropTypes from 'prop-types';


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
    photoURL = '',}
    ) => {
        if (!text) return null;

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

                    <div className='col-11'>
                        {displayName ? (
                            <p className='mb-0'>{displayName}</p>
                        ) : null}
                        {createdAt?.seconds ? (
                            <span className='text-muted align-text-top'>
                            {formatDate(new Date(createdAt.seconds * 1000))}
                            </span>
                        ) : null}
                        <p className='align-top mt-2'>{text}</p>
                        
                    </div>
                </div>
            </div>
        </div>
  );
};

export default Message