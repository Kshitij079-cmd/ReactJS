import React, { useContext, useState } from 'react'
import reactRouterDom from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import navContext from '../context/navContext';
import NavState from '../context/NavState';
import { ListItemIcon } from '@mui/material';



const TopNav = () => {
  const drawerWidth = 240;
    const context = useContext(NavState)
    const { mobileOpen, handleDrawerClose, handleDrawerToggle,handleDrawerTransitionEnd} = context;
    // const [state, setState] = useState({
    //   left: false,
    // });
    // const toggleDrawer = (anchor, open) => (event) => {
    //   if (
    //     event &&
    //     event.type === 'keydown' &&
    //     (event.key === 'Tab' || event.key === 'Shift')
    //   ) {
    //     return;
    //   }
  
    //   setState({ ...state, [anchor]: open });
    // };
    const drawer = (
        <div >
          <Toolbar className='Toolbar' />
          <Divider />
          <List>
          {["Home",'About', 'Contact'].map((text) => (
          <ListItem key={text} disablePadding>
             <ListItemButton component={NavLink} to={text==="Home"?"/":`/${text.toLowerCase()}`}>
              {/* <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon> */}
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
        </div>
      );
    
    
  return (
    <Box sx={{ display: 'flex' , }}>
      <CssBaseline />
      <AppBar className='appBar'
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          // ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#282c34",
          flexDirection:"row"
        }}
      >
        <Toolbar >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" >
            Admin Dashboard
          </Typography>
        </Toolbar>
          <button>dark mode</button>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />

      </Box>
    </Box>
  );
  
}

export default TopNav
