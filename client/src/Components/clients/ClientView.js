import React from 'react';
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
  Grid
} from '@mui/material';
import { ArrowBack, Edit } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';

const ClientView = () => {
  const { id } = useParams();
  
  // Sample data - replace with API call
  const client = {
    id: id,
    name: 'Acme Corp',
    email: 'contact@acme.com',
    phone: '555-1234',
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001'
    },
    notes: 'Important client with monthly orders',
    status: 'Active'
  };

  return (
    <Box sx={{ p: 3 }}>
      <Button 
        component={Link} 
        to="/clients" 
        startIcon={<ArrowBack />}
        sx={{ mb: 3 }}
      >
        Back to Clients
      </Button>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3
        }}>
          <Typography variant="h4" sx={{ color: 'primary.main' }}>
            {client.name}
          </Typography>
          <Chip 
            label={client.status} 
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
                <ListItemText primary="Email" secondary={client.email} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Phone" secondary={client.phone} />
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
              Address
            </Typography>
            <List>
              <ListItem>
                <ListItemText 
                  primary="Street" 
                  secondary={client.address.street} 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="City/State/ZIP" 
                  secondary={`${client.address.city}, ${client.address.state} ${client.address.zip}`} 
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
              <Typography>
                {client.notes || 'No notes available'}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ClientView;