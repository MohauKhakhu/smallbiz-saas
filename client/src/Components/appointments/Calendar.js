// C:\Users\Forge L07.STUDENT07\smallbiz-saas\client\src\Components\appointments\Calendar.js
import React, { useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const Calendar = ({ view, onViewChange }) => {
  useEffect(() => {
    console.log(`Calendar view changed to: ${view}`);
  }, [view]);

  const handleEventClick = (info) => {
    console.log('Event clicked:', info.event);
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView={view}
      headerToolbar={false} // Controlled by parent component
      events={[
        { title: 'Meeting', start: new Date() },
        { title: 'Conference', start: '2023-11-15', end: '2023-11-17' }
      ]}
      eventClick={handleEventClick}
      height="auto"
      aspectRatio={1.8}
    />
  );
};

export default Calendar;