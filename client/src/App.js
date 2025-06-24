import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box, AppBar, Toolbar, Typography } from '@mui/material';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { purple, pink } from '@mui/material/colors';
import ClientList from './components/clients/ClientList';
import InventoryList from './components/inventory/InventoryList';
import InvoiceList from './components/invoices/InvoiceList';
import Calendar from './components/appointments/Calendar';

// ... (keep your existing theme and floralBackground code)

function NavBar() {
  const location = useLocation();
  
  return (
    <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar sx={{ justifyContent: 'space-around' }}>
        <Link to="/clients" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            color: location.pathname === '/clients' ? pink['A400'] : 'inherit'
          }}>
            <People />
            <Typography variant="caption">Clients</Typography>
          </Box>
        </Link>
        
        <Link to="/appointments" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            color: location.pathname === '/appointments' ? pink['A400'] : 'inherit'
          }}>
            <CalendarToday />
            <Typography variant="caption">Calendar</Typography>
          </Box>
        </Link>
        
        <Link to="/inventory" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            color: location.pathname === '/inventory' ? pink['A400'] : 'inherit'
          }}>
            <Inventory />
            <Typography variant="caption">Inventory</Typography>
          </Box>
        </Link>
        
        <Link to="/invoices" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            color: location.pathname === '/invoices' ? pink['A400'] : 'inherit'
          }}>
            <Receipt />
            <Typography variant="caption">Invoices</Typography>
          </Box>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', ...floralBackground }}>
        {/* Main Content */}
        <Box component="main" sx={{ flexGrow: 1, p: 3, pb: 10 }}>
           <Routes location={location} key={location.key}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/clients/:id" element={<ClientView />} />
            <Route path="/clients/edit/:id" element={<ClientForm />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Box>
        <NavBar />
      </Box>
    </ThemeProvider>
  );
}

export default App;