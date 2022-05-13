import React from 'react'

// onClick prop. --> when clicked function needs to be provided
const Button = ({onClick = null, children = null}) => {
  return (
    <button  class="btn btn-lg btn-block btn-primary mb-4" style={{backgroundColor: "#dd4b39"}} type='submit' onClick={onClick}>
        {children}
    </button>
  )
}

export default Button