import React, { useContext, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import AlertContext from "../context/smallnotes/AlertContext";
const Navbar = () => {
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
    <div className="Header">
      <div className="Header-first">
        <NavLink to="/" className={`Header-first-link ${location.pathname === "/" ? 'active' : " "}`}>iNotebook</NavLink>
        {!localStorage.getItem("token") ? (<div className="login-signup">
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
      <div className="Header-second side-bar">
        <button class="closebtn" >&times;</button>

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className={`nav-link ${location.pathname === "/" ? 'active-menu' : " "}`} aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={`nav-link ${location.pathname === "/About" ? 'active-menu' : " "}`} to="/About">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={`nav-link ${location.pathname === "/Contact" ? 'active-menu' : " "}`} to="/Contact">
                  Contact
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={`nav-link ${location.pathname === "/Posts" ? 'active-menu' : " "}`} to="/Posts">
                  Posts
                </NavLink>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>

          </div>
        </nav>

        

            <div className="collapsed-side-bar"></div>
        </div>
      </div>
      );
};

      export default Navbar;
