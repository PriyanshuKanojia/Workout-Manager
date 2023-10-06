import {Link} from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

import React from 'react'

export default function Navbar() {

  const {logout} = useLogout();
  const {user} = useAuthContext();

  const handleLogout = () => {
    logout();
  }

  return (
    <nav className="navbar">
            <h1>Workout Manager</h1>
            <div className="links">
                {user && (
                  <div className='child'>
                    <span>{user.email}</span>
                    <Link to='/'>Home</Link>
                    {/* <Link to='/addworkout'>Add Workout</Link> */}
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
                {!user && (
                  <div className='child'>
                    <Link to='/login'>Login</Link>
                    <Link to='/signup'>Signup</Link>
                  </div>
                )}
            </div>
        </nav>
  )
}