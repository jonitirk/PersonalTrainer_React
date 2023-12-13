

import React, { useState } from 'react';
import { AppBar, Typography, Drawer, List, ListItem, ListItemText, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, Outlet } from 'react-router-dom';
import { ListItemButton } from '@mui/material';

function App() {

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (


    <>
      <AppBar position="static">
        <Toolbar>
          {/* Hamburger menu button */}
          <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>

          {/* PersonalTrainer text */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            PersonalTrainer
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer for hamburger menu */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          <ListItemButton component={Link} to="/">
            <ListItemText primary="Customers" />
          </ListItemButton>
          <ListItemButton component={Link} to="/traininglist">
            <ListItemText primary="Trainings" />
          </ListItemButton>
        </List>
      </Drawer>

      <div className="App">
        <Outlet />
      </div>
    </>
  )
}

export default App
