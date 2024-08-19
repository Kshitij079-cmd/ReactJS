import React from 'react';
import { NavLink } from "react-router-dom";


const Footer = () => {
    return (
        <div className="Footer">
            <div className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <p className="col-md-4 mb-0 text-muted justify-content-center align-items-center">© 2022 Company, Inc</p>

                <ul className="nav col-md-4 justify-content-center">
                    <li className="nav-item"><NavLink to="/" className="nav-link px-2 text-muted">Home</NavLink></li>
                    <li className="nav-item"><NavLink to="/Contact" className="nav-link px-2 text-muted">Contact</NavLink></li>
                
                    <li className="nav-item"><NavLink to="/About" className="nav-link px-2 text-muted">About</NavLink></li>
                </ul>

                <NavLink to="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                    <img src="/database-data-fetch-app/notes-data-app/public/notebook-1025.png" alt="iNotebook" />
                </NavLink>


            </div>
        </div>
    )
}

export default Footer
