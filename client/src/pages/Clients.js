import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import ClientList from '../Components/clients/ClientList';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Mock data fetching
  useEffect(() => {
    setTimeout(() => {
      setClients([
        {
          id: '1',
          name: 'Client A',
          email: 'clienta@example.com',
          phone: '123-456-7890',
          status: 'active',
        },
        {
          id: '2',
          name: 'Client B',
          email: 'clientb@example.com',
          phone: '987-654-3210',
          status: 'inactive',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleEdit = (client) => {
    navigate(`/clients/edit/${client.id}`);
  };

  const handleDelete = (id) => {
    setClients(clients.filter((client) => client.id !== id));
    console.log(`Deleted client with id: ${id}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h4" sx={{ color: 'primary.main' }}>
          Clients
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<Add />}
          component={Link}
          to="/clients/new"
        >
          Add Client
        </Button>
      </Box>
      {loading ? (
        <Typography>Loading clients...</Typography>
      ) : (
        <ClientList clients={clients} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </Box>
  );
};

export default Clients;