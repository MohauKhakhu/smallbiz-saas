// client/src/components/appointments/Calendar.js
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Box, useTheme } from '@mui/material';

const Calendar = ({ appointments, onSelectSlot, onSelectEvent }) => {
  const theme = useTheme();
  
  return (
    <Box sx={{ p: 2 }}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        height="70vh"
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        nowIndicator={true}
        editable={true}
        select={onSelectSlot}
        eventClick={onSelectEvent}
        events={appointments}
        eventColor={theme.palette.primary.main}
        eventTextColor="#ffffff"
      />
    </Box>
  );
};

export default Calendar;