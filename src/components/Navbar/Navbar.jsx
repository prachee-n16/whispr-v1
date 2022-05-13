import React from 'react'

import Button from '../Button/SignOutButton'

const Navbar = () => {
  return (
    <nav class="navbar navbar-light bg-light">
        <span class="navbar-brand mb-0 h4 fw-bold px-4">whispr.</span>
        <Button>Sign Out</Button>
    </nav>
  )
}

export default Navbar