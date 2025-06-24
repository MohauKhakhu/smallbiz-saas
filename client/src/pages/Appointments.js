import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button,
  Tabs,
  Tab,
  Paper
} from '@mui/material';
import { Add, Today, CalendarViewMonth } from '@mui/icons-material';
import Calendar from '../components/appointments/Calendar';

const Appointments = () => {
  const [tabValue, setTabValue] = useState('calendar');
  const [view, setView] = useState('dayGridMonth');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleViewChange = (newView) => {
    setView(newView);
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
          <Calendar view={view} />
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