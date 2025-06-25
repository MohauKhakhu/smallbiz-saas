import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  Grid,
} from '@mui/material';
import { ArrowBack, Edit } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';

const ClientView = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data fetching - replace with API call
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockClients = [
        {
          id: '1',
          name: 'Acme Corp',
          email: 'contact@acme.com',
          phone: '555-1234',
          address: {
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            zip: '10001',
          },
          notes: 'Important client with monthly orders',
          status: 'Active',
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '987-654-3210',
          address: {
            street: '456 Oak Ave',
            city: 'Los Angeles',
            state: 'CA',
            zip: '90001',
          },
          notes: 'New client, onboarding in progress',
          status: 'Pending',
        },
      ];
      const foundClient = mockClients.find((c) => c.id === id);
      if (foundClient) {
        setClient(foundClient);
        setLoading(false);
      } else {
        setError('Client not found');
        setLoading(false);
      }
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Loading client...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">{error}</Typography>
        <Button component={Link} to="/clients" startIcon={<ArrowBack />} sx={{ mt: 2 }}>
          Back to Clients
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Button component={Link} to="/clients" startIcon={<ArrowBack />} sx={{ mb: 3 }}>
        Back to Clients
      </Button>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Typography variant="h4" sx={{ color: 'primary.main' }}>
            {client.name || 'Unknown Client'}
          </Typography>
          <Chip
            label={client.status || 'Unknown'}
            color={client.status === 'Active' ? 'success' : 'error'}
            sx={{ ml: 2 }}
          />
          <Button
            component={Link}
            to={`/clients/edit/${client.id}`}
            variant="contained"
            startIcon={<Edit />}
          >
            Edit Client
          </Button>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
              Contact Information
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Email" secondary={client.email || 'N/A'} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Phone" secondary={client.phone || 'N/A'} />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
              Address
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Street" secondary={client.address?.street || 'N/A'} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="City/State/ZIP"
                  secondary={
                    client.address
                      ? `${client.address.city || 'N/A'}, ${client.address.state || 'N/A'} ${client.address.zip || 'N/A'}`
                      : 'N/A'
                  }
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
              Notes
            </Typography>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography>{client.notes || 'No notes available'}</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ClientView;