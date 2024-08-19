// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";
const Navbar = ()=>{
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      this.props.onSearch(e.target.value);
    }
  }
  // const [scroll, setScroll] = useState(false);


    return (
      <header className="header">
        <nav className="container">
          <ul className="d-flex nav">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/entertainment">Entertainment</Link>
            </li>
            <li>
              <Link to="/business">Business</Link>
            </li>
            <li>
              <Link to="/sports">Sports</Link>
            </li>
            <li>
              <Link to="/general">General</Link>
            </li>
            <li>
              <Link to="/technology">Tech</Link>
            </li>
            <li>
              <Link to="/">Contact</Link>
            </li>
          </ul>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search news..."
              onKeyDown={handleSearch}
              className="search-bar"
            />
          </div>
        </nav>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            Enable Dark Mode
          </label>
        </div>
      </header>
    );

}
export default  Navbar;