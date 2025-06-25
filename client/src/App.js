import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Toolbar,
  useMediaQuery,
} from '@mui/material';
import { purple, pink } from '@mui/material/colors';


// Page Components
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';

import Inventory from './pages/Inventory';
import Invoices from './pages/Invoices';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import Navbar from './Components/layout/Navbar';
import Sidebar from './Components/layout/Sidebar';
import ClientView from './Components/clients/ClientView';
import ClientForm from './Components/clients/ClientForm';
import Appointments from './pages/Appointments';

// Floral purple theme
const theme = createTheme({
  palette: {
    primary: {
      main: purple[700],
      light: purple[500],
      dark: purple[900],
    },
    secondary: {
      main: pink['A400'],
    },
    background: {
      default: '#faf5ff',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const App = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isOpen, setIsOpen] = useState(!isMobile); // Sidebar open by default on desktop

  // Sync sidebar state with screen size
  useEffect(() => {
    setIsOpen(!isMobile); // Close sidebar on mobile, open on desktop
  }, [isMobile]);

  const handleSidebarToggle = () => {
    setIsOpen(!isOpen);
    console.log('Sidebar toggled:', !isOpen); // For debugging
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
          {/* Navbar */}
          <Navbar onSidebarToggle={handleSidebarToggle} />

          {/* Sidebar */}
          <Sidebar
            isOpen={isOpen}
            onClose={handleSidebarToggle}
            isMobile={isMobile}
          />

          {/* Main Content Area */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: isMobile ? '100%' : `calc(100% - ${isOpen ? 240 : 0}px)`,
              ml: isMobile ? 0 : isOpen ? '240px' : 0,
              transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.standard,
              }),
            }}
          >
            <Toolbar /> {/* Spacer for AppBar */}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              {/* Clients Routes */}
              <Route path="/Clients" element={<Clients />} />
              <Route path="/Clients/:id" element={<ClientView />} />
              <Route path="/Clients/new" element={<ClientForm />} />
              <Route path="/Clients/edit/:id" element={<ClientForm />} />
              {/* Appointments Route */}
              <Route path="/Appointments" element={<Appointments />} />
              {/* Inventory Route */}
              <Route path="/inventory" element={<Inventory />} />
              {/* Invoices Route */}
              <Route path="/invoices" element={<Invoices />} />
              {/* Settings Route */}
              <Route path="/settings" element={<Settings />} />
              {/* 404 Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Box>
        </Box>
      </ThemeProvider>
    </Router>
  );
};

export default App;