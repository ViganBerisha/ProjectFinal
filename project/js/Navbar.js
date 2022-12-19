import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <header>
        <nav>
            <div>
            <Link to="/"> Watch Movies </Link>
            </div>
            <ul>
                <Link to="/add-movie"> Add Movie </Link>
              
            </ul>
        </nav>
    </header>
  )
}

export default Navbar