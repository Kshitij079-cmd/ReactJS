import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

export default function Navbar(props) {
  const { defaultTheme, about, toggleTheme } = props;

  return (
    <nav className={`navbar navbar-expand-lg bg-${defaultTheme}`} data-bs-theme={defaultTheme}>
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink  to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/About">
                {about}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/Contact">
                Contact
              </NavLink>
            </li>
          </ul>
         
          <div className={`form-check form-switch text-${defaultTheme === 'light' ? 'dark' : 'light'}`}>
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              onChange={toggleTheme}
            />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
              {defaultTheme === 'light' ? 'Enable Dark mode' : 'Enable Light mode'}
            </label>
          </div>
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  defaultTheme: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};
