import React from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
const Navbar = () => {
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand" >NoteHub</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/Home" className="nav-link " aria-current="page" >Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/About" className="nav-link " aria-current="page" >About</NavLink>
              </li>


            </ul>
            {!localStorage.getItem('token') ?
              <form className="d-flex">
                <Link className="btn btn-primary mx-1" to="/Login" role="button">Login</Link>
                <Link className="btn btn-primary mx-1" to="/Signup" role="button">Signup</Link>
              </form> : <button className="btn btn-primary" onClick={handleLogout}> Logout</button>}

          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
