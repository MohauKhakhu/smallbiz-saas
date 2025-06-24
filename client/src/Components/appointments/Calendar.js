import React from 'react';
import { Box, Typography } from '@mui/material';

const Calendar = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'primary.main' }}>
        Appointment Calendar
      </Typography>
      <Typography paragraph>
        Calendar functionality will go here
      </Typography>
    </Box>
  );
};

export default Calendar;