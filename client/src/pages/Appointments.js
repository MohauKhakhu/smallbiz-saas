import React, { useState } from 'react';

import {Add,Today,CalendarViewMonth } from '@mui/icons-material';
// Update the import path and filename as needed; for example, if the correct file is 'Calendar.js':

import { Box, Button, Paper, Tab, Tabs, Typography } from '@mui/material';
import Calendar from '../components/appointments/Calendar';
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <Typography color="error">Error loading calendar</Typography>;
    }
    return this.props.children;
  }
}

const Appointments = () => {
  const [tabValue, setTabValue] = useState('calendar');
  const [view, setView] = useState('dayGridMonth');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  // Placeholder for creating a new appointment
  const handleNewAppointment = () => {
    console.log('New appointment clicked');
    // Add logic here (e.g., open a modal or navigate to a form)
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
          Appointment Scheduling
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="outlined"
            startIcon={<Today />}
            onClick={() => handleViewChange('timeGridDay')}
            color={view === 'timeGridDay' ? 'secondary' : 'primary'}
          >
            Day
          </Button>
          <Button 
            variant="outlined"
            startIcon={<CalendarViewMonth />}
            onClick={() => handleViewChange('dayGridMonth')}
            color={view === 'dayGridMonth' ? 'secondary' : 'primary'}
          >
            Month
          </Button>
          <Button 
            variant="contained" 
            color="secondary" 
            startIcon={<Add />}
            onClick={handleNewAppointment}
          >
            New Appointment
          </Button>
        </Box>
      </Box>

      <Tabs 
        value={tabValue} 
        onChange={handleTabChange}
        sx={{ mb: 3 }}
      >
        <Tab value="calendar" label="Calendar View" />
        <Tab value="list" label="Appointment List" />
      </Tabs>

      <Paper elevation={3} sx={{ p: 2 }}>
        {tabValue === 'calendar' ? (
          <ErrorBoundary>
            <Calendar view={view} />
          </ErrorBoundary>
        ) : (
          <Box sx={{ p: 2 }}>
            <Typography>Appointment list view coming soon</Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Appointments;