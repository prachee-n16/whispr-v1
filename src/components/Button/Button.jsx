import React from 'react'

// onClick prop. --> when clicked function needs to be provided
const Button = ({onClick = null, children = null}) => {
  return (
    <button onClick={onClick}>
        {children}
    </button>
  )
}

export default Button