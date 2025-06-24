import React from 'react';
import { 
  Box, 
  Typography, 
  Tabs, 
  Tab, 
  Paper,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Avatar,
  Grid
} from '@mui/material';
import { 
  Settings as SettingsIcon,
  AccountCircle,
  Notifications,
  Security,
  Business
} from '@mui/icons-material';
import { useState } from 'react';

const Settings = () => {
  const [tabValue, setTabValue] = useState('profile');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ color: 'primary.main', mb: 3 }}>
        Settings
      </Typography>

      <Tabs 
        value={tabValue} 
        onChange={handleTabChange}
        sx={{ mb: 3 }}
      >
        <Tab value="profile" label="Profile" icon={<AccountCircle />} />
        <Tab value="notifications" label="Notifications" icon={<Notifications />} />
        <Tab value="security" label="Security" icon={<Security />} />
        <Tab value="business" label="Business" icon={<Business />} />
      </Tabs>

      <Paper elevation={3} sx={{ p: 3 }}>
        {tabValue === 'profile' && (
          <Box sx={{ maxWidth: 600 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar sx={{ 
                width: 80, 
                height: 80,
                mr: 3
              }}>
                <SettingsIcon fontSize="large" />
              </Avatar>
              <Button variant="contained" color="secondary">
                Change Avatar
              </Button>
            </Box>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Button variant="contained" color="secondary">
                  Update Profile
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}

        {tabValue === 'notifications' && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
              Notification Preferences
            </Typography>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Email Notifications"
            />
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="SMS Notifications"
            />
            <FormControlLabel
              control={<Switch />}
              label="Push Notifications"
            />
          </Box>
        )}

        {tabValue === 'security' && (
          <Box sx={{ maxWidth: 600 }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
              Change Password
            </Typography>
            <TextField
              fullWidth
              label="Current Password"
              type="password"
              margin="normal"
            />
            <TextField
              fullWidth
              label="New Password"
              type="password"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Confirm New Password"
              type="password"
              margin="normal"
            />
            <Button variant="contained" color="secondary" sx={{ mt: 2 }}>
              Update Password
            </Button>
          </Box>
        )}

        {tabValue === 'business' && (
          <Box sx={{ maxWidth: 600 }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
              Business Information
            </Typography>
            <TextField
              fullWidth
              label="Business Name"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Tax ID"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Business Address"
              margin="normal"
              multiline
              rows={3}
            />
            <Button variant="contained" color="secondary" sx={{ mt: 2 }}>
              Save Business Info
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Settings;