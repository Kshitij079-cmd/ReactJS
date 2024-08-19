import React, { useState } from 'react'
import AlertContext from './AlertContext';
import { useEffect } from 'react';

const AlertState = (props) => {
    const [alert, setAlert] = useState(null)
     const showAlert = (msg, type) => {
    setAlert({ 
        msg: msg,
        type: type
    });
    setTimeout(() => setAlert(null), 2000);
  };
  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
    {props.children }
  </AlertContext.Provider>
  )
}

export default AlertState
