import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button,
  Tabs,
  Tab
} from '@mui/material';
import { Add } from '@mui/icons-material';
import ClientList from '../components/clients/ClientList';
import ClientForm from '../Components/clients/ClientForm';

import { Routes, Route } from 'react-router-dom';
import ClientView from '../Components/clients/ClientView';

const Clients = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 3 }}>
      <Routes>
        <Route path="/" element={
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h4" sx={{ color: 'primary.main' }}>Client Management</Typography>
              <Button 
                variant="contained" 
                color="secondary" 
                startIcon={<Add />}
                onClick={() => navigate('/clients/new')}
              >
                Add Client
              </Button>
            </Box>
            <ClientList />
          </>
        } />
        <Route path="/new" element={<ClientForm onCancel={() => navigate('/clients')} />} />
        <Route path="/:id" element={<ClientView />} />
        <Route path="/edit/:id" element={<ClientForm />} />
      </Routes>
    </Box>
  );
};
export default Clients;