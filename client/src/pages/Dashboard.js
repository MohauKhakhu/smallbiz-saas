import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Avatar,
  LinearProgress
} from '@mui/material';
import { 
  People as PeopleIcon,
  CalendarToday as CalendarIcon,
  Inventory as InventoryIcon,
  Receipt as InvoiceIcon,
  Receipt
} from '@mui/icons-material';

const Dashboard = () => {
  // Sample data - replace with real data from your API
  const stats = {
    clients: 42,
    appointments: 15,
    inventoryItems: 127,
    invoices: 28
  };

  const recentActivity = [
    { id: 1, type: 'Invoice', action: 'Created', name: 'INV-0042', date: '2023-06-15' },
    { id: 2, type: 'Client', action: 'Updated', name: 'Acme Corp', date: '2023-06-14' },
    { id: 3, type: 'Appointment', action: 'Scheduled', name: 'Consultation', date: '2023-06-12' }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'primary.main' }}>
        Dashboard Overview
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Avatar sx={{ 
              bgcolor: 'primary.light', 
              color: 'white',
              width: 56,
              height: 56,
              mx: 'auto',
              mb: 2
            }}>
              <PeopleIcon fontSize="large" />
            </Avatar>
            <Typography variant="h5">{stats.clients}</Typography>
            <Typography variant="body2">Clients</Typography>
            <LinearProgress 
              variant="determinate" 
              value={75} 
              sx={{ mt: 2, height: 8, borderRadius: 4 }} 
            />
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Avatar sx={{ 
              bgcolor: 'secondary.light', 
              color: 'white',
              width: 56,
              height: 56,
              mx: 'auto',
              mb: 2
            }}>
              <CalendarIcon fontSize="large" />
            </Avatar>
            <Typography variant="h5">{stats.appointments}</Typography>
            <Typography variant="body2">Appointments</Typography>
            <LinearProgress 
              variant="determinate" 
              value={35} 
              sx={{ mt: 2, height: 8, borderRadius: 4 }} 
              color="secondary"
            />
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Avatar sx={{ 
              bgcolor: 'success.light', 
              color: 'white',
              width: 56,
              height: 56,
              mx: 'auto',
              mb: 2
            }}>
              <InventoryIcon fontSize="large" />
            </Avatar>
            <Typography variant="h5">{stats.inventoryItems}</Typography>
            <Typography variant="body2">Inventory Items</Typography>
            <LinearProgress 
              variant="determinate" 
              value={60} 
              sx={{ mt: 2, height: 8, borderRadius: 4 }} 
              color="success"
            />
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Avatar sx={{ 
              bgcolor: 'warning.light', 
              color: 'white',
              width: 56,
              height: 56,
              mx: 'auto',
              mb: 2
            }}>
              <InvoiceIcon fontSize="large" />
            </Avatar>
            <Typography variant="h5">{stats.invoices}</Typography>
            <Typography variant="body2">Invoices</Typography>
            <LinearProgress 
              variant="determinate" 
              value={85} 
              sx={{ mt: 2, height: 8, borderRadius: 4 }} 
              color="warning"
            />
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Activity */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
              Recent Activity
            </Typography>
            <Box>
              {recentActivity.map((activity) => (
                <Box key={activity.id} sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 2,
                  p: 2,
                  borderRadius: 1,
                  bgcolor: 'background.paper'
                }}>
                  <Avatar sx={{ 
                    bgcolor: 'primary.light', 
                    color: 'white',
                    mr: 2,
                    width: 40,
                    height: 40
                  }}>
                    {activity.type.charAt(0)}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body1">
                      <strong>{activity.action}</strong> {activity.type}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {activity.name}
                    </Typography>
                  </Box>
                  <Typography variant="caption">
                    {activity.date}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Paper sx={{ 
                  p: 3, 
                  textAlign: 'center',
                  bgcolor: 'primary.light',
                  color: 'white',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'primary.dark'
                  }
                }}>
                  <PeopleIcon fontSize="large" />
                  <Typography>Add Client</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper sx={{ 
                  p: 3, 
                  textAlign: 'center',
                  bgcolor: 'secondary.light',
                  color: 'white',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'secondary.dark'
                  }
                }}>
                  <CalendarIcon fontSize="large" />
                  <Typography>Schedule</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper sx={{ 
                  p: 3, 
                  textAlign: 'center',
                  bgcolor: 'success.light',
                  color: 'white',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'success.dark'
                  }
                }}>
                  <InventoryIcon fontSize="large" />
                  <Typography>Add Product</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper sx={{ 
                  p: 3, 
                  textAlign: 'center',
                  bgcolor: 'warning.light',
                  color: 'white',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'warning.dark'
                  }
                }}>
                  <Receipt fontSize="large" />
                  <Typography>Create Invoice</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;