import React, { useState } from 'react';
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline, 
  Box, 
  Toolbar,
  useMediaQuery 
} from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { purple, pink } from '@mui/material/colors';
import Navbar from './Components/layout/Navbar';
import Sidebar from './Components/layout/Sidebar';

// Page Components
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import ClientView from './Components/clients/ClientView';
import ClientForm from './Components/clients/ClientForm';
import Appointments from './pages/Appointments';
import Inventory from './pages/Inventory';
import Invoices from './pages/Invoices';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
          <Navbar 
            onSidebarToggle={isMobile ? handleDrawerToggle : handleSidebarToggle} 
          />
          <Sidebar 
            isOpen={sidebarOpen} 
            onClose={handleDrawerToggle}
            isMobile={isMobile}
          />
          
          {/* Main Content Area */}
          <Box 
            component="main" 
            sx={{ 
              flexGrow: 1, 
              p: 3,
              marginLeft: { 
                xs: 0, 
                md: sidebarOpen ? '240px' : '56px' 
              },
              transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: sidebarOpen 
                  ? theme.transitions.duration.enteringScreen 
                  : theme.transitions.duration.leavingScreen,
              }),
              width: { 
                xs: '100%', 
                md: `calc(100% - ${sidebarOpen ? 240 : 56}px)` 
              },
            }}
          >
            <Toolbar /> {/* Spacer for AppBar */}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              
              {/* Clients Routes */}
              <Route path="/clients" element={<Clients />} />
              <Route path="/clients/:id" element={<ClientView />} />
              <Route path="/clients/new" element={<ClientForm />} />
              <Route path="/clients/edit/:id" element={<ClientForm />} />
              
              {/* Appointments Route */}
              <Route path="/appointments" element={<Appointments />} />
              
              {/* Inventory Routes */}
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