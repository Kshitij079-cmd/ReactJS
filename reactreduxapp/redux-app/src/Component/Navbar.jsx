import React from 'react'

import {useSelector} from "react-redux"
const Navbar = () => {
  const state = useSelector(
    (state) => state.amount
  )

  return (
    <div>
      <div className="scrolling-text-container">
        <div className="scrolling-text">
          <span>This is a scrolling line above navbar</span>
          <span>This is a scrolling line above navbar</span>
          <span>This is a scrolling line above navbar</span>
          <span>This is a scrolling line above navbar</span>
          <span>This is a scrolling line above navbar</span>
          <span>This is a scrolling line above navbar</span>
          <span>This is a scrolling line above navbar</span>
          <span>This is a scrolling line above navbar</span>
          <span>This is a scrolling line above navbar</span>
          <span>This is a scrolling line above navbar</span>
          <span>This is a scrolling line above navbar</span>
          <span>This is a scrolling line above navbar</span>
        </div>
      </div>
      <nav className="py-2 bg-light border-bottom">
    <div className="container d-flex flex-wrap">
      <ul className="nav me-auto">
        <li className="nav-item"><a href="/" className="nav-link link-dark px-2 active" aria-current="page">Home</a></li>
        <li className="nav-item"><a href="/" className="nav-link link-dark px-2">Features</a></li>
        <li className="nav-item"><a href="/" className="nav-link link-dark px-2">Pricing</a></li>
        <li className="nav-item"><a href="/" className="nav-link link-dark px-2">FAQs</a></li>
        <li className="nav-item"><a href="/" className="nav-link link-dark px-2">About</a></li>
      </ul>
      <ul className="nav">
        <li className="nav-item"><a href="/" className="nav-link link-dark px-2">Login</a></li>
        <li className="nav-item"><a href="/" className="nav-link link-dark px-2">Sign up</a></li>
      </ul>
    </div>
  </nav>
  
  <header className="py-3 mb-4 border-bottom">
    <div className="container d-flex flex-wrap justify-content-center">
      <a href="/" className="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none">
      <svg className="bi me-2" width="40" height="32"></svg>
        <span className="fs-4">Bank Simulation</span>
      </a>
     <div className='d-flex justify-content-center align-item-center'>
     Your Balance:
        <button className="btn btn-primary"disabled={true}>{state}</button>
     </div>
    </div>
  </header>
    </div>
  )
}

export default Navbar
