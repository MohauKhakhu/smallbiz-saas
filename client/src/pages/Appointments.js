import React, { useState } from 'react';
import { Add, Today, CalendarViewMonth } from '@mui/icons-material';
import { Box, Button, Paper, Tab, Tabs, Typography } from '@mui/material';

// VERIFIED IMPORT PATH (matches your exact file structure)
import Calendar from '../Components/appointments/Calendar';  // Capital 'C' in Components

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  componentDidCatch(error, errorInfo) {
    console.error('Calendar Error:', error, errorInfo);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography color="error" variant="h6">
            Calendar failed to load. Please refresh or try again later.
          </Typography>
        </Box>
      );
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
    // Sync view change with calendar if needed
  };

  const handleNewAppointment = () => {
    console.log('Opening appointment form...');
    // Add your form opening logic here
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3,
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Typography variant="h4" sx={{ color: 'primary.main' }}>
          Appointment Scheduling
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button 
            variant={view === 'timeGridDay' ? 'contained' : 'outlined'}
            startIcon={<Today />}
            onClick={() => handleViewChange('timeGridDay')}
          >
            Day View
          </Button>
          <Button 
            variant={view === 'dayGridMonth' ? 'contained' : 'outlined'}
            startIcon={<CalendarViewMonth />}
            onClick={() => handleViewChange('dayGridMonth')}
          >
            Month View
          </Button>
          <Button 
            variant="contained" 
            color="secondary" 
            startIcon={<Add />}
            onClick={handleNewAppointment}
            sx={{ ml: 1 }}
          >
            New Appointment
          </Button>
        </Box>
      </Box>

      {/* Tab Navigation */}
      <Tabs 
        value={tabValue} 
        onChange={handleTabChange}
        sx={{ 
          mb: 3,
          '& .MuiTabs-indicator': {
            height: 3,
          }
        }}
      >
        <Tab value="calendar" label="Calendar" />
        <Tab value="list" label="Appointment List" />
      </Tabs>

      {/* Main Content Area */}
      <Paper elevation={3} sx={{ p: 2, minHeight: '60vh' }}>
        {tabValue === 'calendar' ? (
          <ErrorBoundary>
            <Calendar 
              view={view} 
              onViewChange={handleViewChange} // Pass callback if needed
            />
          </ErrorBoundary>
        ) : (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              Appointment list view is under development
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Appointments;