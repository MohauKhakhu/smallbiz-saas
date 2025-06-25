import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { Save, Cancel, ArrowBack } from '@mui/icons-material';
import { Link, useParams, useNavigate } from 'react-router-dom';

const ClientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: { street: '', city: '', state: '', zip: '' },
    notes: '',
    status: 'active', // Default status
  });
  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState(null);

  // Mock data fetching for edit mode
  useEffect(() => {
    if (isEditMode) {
      setTimeout(() => {
        const mockClients = [
          {
            id: '1',
            name: 'Client A',
            email: 'clienta@example.com',
            phone: '123-456-7890',
            address: {
              street: '123 Main St',
              city: 'New York',
              state: 'NY',
              zip: '10001',
            },
            notes: 'Important client with monthly orders',
            status: 'active',
          },
          {
            id: '2',
            name: 'Client B',
            email: 'clientb@example.com',
            phone: '987-654-3210',
            address: {
              street: '456 Oak Ave',
              city: 'Los Angeles',
              state: 'CA',
              zip: '90001',
            },
            notes: 'New client, onboarding in progress',
            status: 'inactive',
          },
        ];
        const foundClient = mockClients.find((c) => c.id === id);
        if (foundClient) {
          setFormData(foundClient);
          setLoading(false);
        } else {
          setError('Client not found');
          setLoading(false);
        }
      }, 1000);
    } else {
      setLoading(false);
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('address.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [field]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isEditMode ? 'Updating client:' : 'Creating client:', formData);
    // TODO: Add API call to save client data
    navigate('/clients');
  };

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Loading...</Typography>
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
        <Typography variant="h5" gutterBottom sx={{ color: 'primary.main' }}>
          {isEditMode ? 'Edit Client' : 'Add New Client'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  label="Status"
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mt: 2, color: 'primary.main' }}>
                Address
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Street"
                name="address.street"
                value={formData.address.street}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="City"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="State"
                name="address.state"
                value={formData.address.state}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="ZIP Code"
                name="address.zip"
                value={formData.address.zip}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<Cancel />}
                component={Link}
                to="/clients"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                startIcon={<Save />}
              >
                {isEditMode ? 'Update Client' : 'Save Client'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default ClientForm;