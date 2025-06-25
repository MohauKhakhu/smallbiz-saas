import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton,
  Avatar
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { purple } from '@mui/material/colors';

const Navbar = ({ onSidebarToggle }) => {
  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: purple[700],
        boxShadow: 'none'
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={onSidebarToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          SmallBiz SaaS
        </Typography>
        <Avatar sx={{ bgcolor: purple[500] }}>A</Avatar>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;