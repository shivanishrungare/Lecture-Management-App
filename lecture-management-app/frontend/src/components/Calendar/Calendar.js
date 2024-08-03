import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './Calendar.css'
import timeGridPlugin from '@fullcalendar/timegrid';

export const Calendar = () => {

//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const fetchEvents = async () => {
//     // Replace with your actual API endpoint
//     const response = await fetch('/api/events');
//     const data = await response.json();
//     setEvents(data);
//   };

//   const handleEventClick = async (clickInfo) => {
//     const newTitle = prompt('Enter a new title for your event', clickInfo.event.title);

//     if (newTitle) {
//       const updatedEvent = {
//         ...clickInfo.event,
//         title: newTitle
//       };
      
//       const response = await fetch(`/api/events/${clickInfo.event.id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedEvent),
//       });

//       if (response.ok) {
//         clickInfo.event.setProp('title', newTitle);
//       }
//     }
//   };

  return (
    <div className='calendar-main'>
        <div className='calendar-container'>
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            height={700}  // Adjust the height of the calendar
            contentHeight={600}
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
            // events={events}
            // eventClick={handleEventClick}
        />
        </div>
    </div>
  );
};


