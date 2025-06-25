import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button,
  Tabs,
  Tab,
  useTheme
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import ClientList from '../Components/clients/ClientList'; // Fixed import path

const Clients = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [tabValue, setTabValue] = useState('list');

  const [clients, setClients] = useState([
    { id: 1, name: 'Acme Corp', email: 'contact@acme.com', phone: '555-1234', status: 'active' },
    { id: 2, name: 'Globex Inc', email: 'info@globex.com', phone: '555-5678', status: 'active' }
  ]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleEditClient = (client) => {
    navigate(`/clients/edit/${client.id}`);
  };

  const handleDeleteClient = (clientId) => {
    setClients(clients.filter(client => client.id !== clientId));
  };

  const handleAddClient = (newClient) => {
    setClients([...clients, { ...newClient, id: Math.max(...clients.map(c => c.id)) + 1 }]);
    navigate('/clients');
  };

  const handleUpdateClient = (updatedClient) => {
    setClients(clients.map(client => 
      client.id === updatedClient.id ? updatedClient : client
    ));
    navigate('/clients');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3
      }}>
        <Typography variant="h4" sx={{ color: 'primary.main' }}>
          Client Management
        </Typography>
        <Button 
          variant="contained" 
          color="secondary" 
          startIcon={<Add />}
          component={Link}
          to="/clients/new"
          sx={{ textTransform: 'none' }}
        >
          Add Client
        </Button>
      </Box>

      <Tabs 
        value={location.pathname.includes('edit') || location.pathname.includes('new') ? 'form' : 'list'}
        onChange={handleTabChange}
        sx={{ mb: 3 }}
        aria-label="client tabs"
      >
        <Tab value="list" label="Client List" />
        <Tab 
          value="form" 
          label={
            location.pathname.includes('edit') ? 'Edit Client' : 
            location.pathname.includes('new') ? 'Add Client' : 'Form'
          } 
        />
      </Tabs>

      <Outlet context={{ 
        clients, 
        onAddClient: handleAddClient, 
        onUpdateClient: handleUpdateClient 
      }} />
      
      {location.pathname === '/clients' && (
        <ClientList 
          clients={clients} 
          onEdit={handleEditClient} 
          onDelete={handleDeleteClient} 
        />
      )}
    </Box>
  );
};

export default Clients;