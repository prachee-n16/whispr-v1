import React from 'react'

// onClick prop. --> when clicked function needs to be provided
const Button = ({onClick = null, children = null}) => {
  return (
    <button  className="btn btn-outline-dark mx-3 px-2 pt-1 pb-1 my-sm-0" type='submit' onClick={onClick}>
        {children}
    </button>
  )
}

export default Button