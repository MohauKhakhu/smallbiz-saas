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
import { Edit, ArrowBack } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const ClientView = ({ client }) => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Button 
          component={Link} 
          to="/clients" 
          startIcon={<ArrowBack />}
        >
          Back to Clients
        </Button>
        <Button 
          component={Link} 
          to={`/clients/edit/${client.id}`}
          variant="contained"
          color="secondary"
          startIcon={<Edit />}
        >
          Edit Client
        </Button>
      </Box>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ color: 'primary.main' }}>
          {client.name}
        </Typography>
        
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

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
              Recent Activity
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip label="Last invoice: 2 days ago" />
              <Chip label="Appointments: 3 this month" />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ClientView;