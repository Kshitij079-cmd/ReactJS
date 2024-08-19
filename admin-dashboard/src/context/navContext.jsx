import React, { useContext, useState } from 'react'
import NavState from './NavState'

const navContext = (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [mobileOpen, setMobileOpen] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isClosing, setIsClosing] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    
    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
      };
    
      const handleDrawerToggle = () => {
        if (!isClosing) {
          setMobileOpen(!mobileOpen);
        }
      };
      const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
      };

  return (
    <div>
       <NavState.Provider value={{ mobileOpen,handleDrawerClose, handleDrawerToggle,handleDrawerTransitionEnd}}>
{props.children}
      </NavState.Provider>
    </div>
  )
}

export default navContext
