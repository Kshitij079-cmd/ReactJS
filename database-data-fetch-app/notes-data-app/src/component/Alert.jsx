import React, { useContext } from 'react';
import alertContext from '../context/smallnotes/AlertContext';

const Alert = () => {
  const { alert} = useContext(alertContext);
  const capitalize = (word) => {
    const lower = word.toLowerCase();
    return word.charAt(0).toUpperCase() + lower.slice(1);
  }
  return (
    <div style={{height:"50px", backgroundColor:"#282c34"}}>
      {alert &&
      <div
      className={`alert alert-${alert.type}  fade-show d-flex justify-content-between`}
      role="alert">
        <p>
        <strong>
          {capitalize(alert.type)}!!!</strong> {alert.msg}</p>
        
      </div>}
      </div>
    
  )
}

export default Alert
