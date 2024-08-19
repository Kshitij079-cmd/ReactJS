import React, { useEffect } from 'react'
import { useContext } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import AlertContext from '../context/smallnotes/AlertContext';


const NavBar2 = () => {
    const alertMsg = useContext(AlertContext)
    const { showAlert } = alertMsg;
    let location = useLocation();
    let navigate = useNavigate();
    const handleLogOut = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        alert("logging out")
        navigate('/login')
    }
    useEffect(() => {
        console.log(location.pathname);
    }, [location]);
    return (
    <div className='Header'>
{/**-> */} <div className="Header-first">
                <NavLink to="/" className={`Header-first-link ${location.pathname === "/" ? 'active' : " "}`}>iNotebook</NavLink>
                {!localStorage.getItem("token") ? (
                    <div className="login-signup">
                    <NavLink className="btn btn-primary " role="button" to="/login" type="submit">
                        Login
                    </NavLink>
                    <NavLink className="btn btn-primary " role="button" to="/signup" type="submit">
                        Sign up
                    </NavLink>
                </div>) : (
                    <div className="login-signup">
                        <NavLink className="btn btn-primary " onClick={handleLogOut} role="button" to="/login" type="submit"
                            style={{ marginRight: "10px" }}>LogOut
                        </NavLink>
                    </div>
                )}
            </div>
            <div className='side-menu'>
            <div class="d-flex flex-column flex-shrink-0 p-3 bg-light" style="width: 280px;">
    <NavLink href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
      <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
      <span class="fs-4">Sidebar</span>
    </NavLink>
    <hr/>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <NavLink href="#" class="nav-link active" aria-current="page">
          <svg class="bi me-2" width="16" height="16"><use xlink:href="#home"></use></svg>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink href="#" class="nav-link link-dark">
          <svg class="bi me-2" width="16" height="16"><use xlink:href="#speedometer2"></use></svg>
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink href="#" class="nav-link link-dark">
          <svg class="bi me-2" width="16" height="16"><use xlink:href="#table"></use></svg>
          About
        </NavLink>
      </li>
      <li>
        <NavLink href="#" class="nav-link link-dark">
          <svg class="bi me-2" width="16" height="16"><use xlink:href="#grid"></use></svg>
          Products
        </NavLink>
      </li>
      <li>
        <NavLink href="#" class="nav-link link-dark">
          <svg class="bi me-2" width="16" height="16"><use xlink:href="#people-circle"></use></svg>
          Customers
        </NavLink>
      </li>
    </ul>
    <hr/>
   
  </div>
            </div>

      </div>
    )
}

export default NavBar2
