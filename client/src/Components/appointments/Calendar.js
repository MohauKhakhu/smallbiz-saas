import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Setup the localizer by providing moment (or globalize, Luxon)
const localizer = momentLocalizer(moment);

const Calendar = () => {
  // Sample events data
  const events = [
    {
      title: 'Client Meeting',
      start: new Date(2023, 10, 15, 10, 0),
      end: new Date(2023, 10, 15, 11, 0),
    },
    {
      title: 'Follow-up Call',
      start: new Date(2023, 10, 16, 14, 0),
      end: new Date(2023, 10, 16, 14, 30),
    },
  ];

  return (
    <Box sx={{ p: 3, height: '80vh' }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
        Appointment Calendar
      </Typography>
      <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          defaultView="month"
          views={['month', 'week', 'day', 'agenda']}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: '#6a0dad',
              borderRadius: '4px',
              opacity: 0.8,
              color: 'white',
              border: '0px',
            },
          })}
        />
      </Paper>
    </Box>
  );
};

export default Calendar;