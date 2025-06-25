import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Toolbar
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  CalendarToday as CalendarIcon,
  Inventory as InventoryIcon,
  Receipt as InvoiceIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { purple } from '@mui/material/colors';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose, isMobile }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: <DashboardIcon />, text: 'Dashboard' },
    { path: '/clients', icon: <PeopleIcon />, text: 'Clients' },
    { path: '/Appointments', icon: <CalendarIcon />, text: 'Appointments' },
    { path: '/Inventory', icon: <InventoryIcon />, text: 'Inventory' },
    { path: '/invoices', icon: <InvoiceIcon />, text: 'Invoices' },
    { path: '/settings', icon: <SettingsIcon />, text: 'Settings' }
  ];

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'persistent'}
      open={isMobile ? isOpen : true}
      onClose={onClose}
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          bgcolor: '#faf5ff',
          borderRight: `1px solid ${purple[100]}`
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {menuItems.map((item) => (
            <ListItem 
              button 
              key={item.path}
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                '&.Mui-selected': {
                  bgcolor: purple[50],
                  borderLeft: `4px solid ${purple[700]}`,
                  '& .MuiListItemIcon-root': {
                    color: purple[700]
                  }
                }
              }}
            >
              <ListItemIcon sx={{ color: purple[700] }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
};

export default Sidebar;