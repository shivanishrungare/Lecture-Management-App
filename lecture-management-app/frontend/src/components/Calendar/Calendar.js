import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import './Calendar.css';

export const Calendar = ({ userId, role }) => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [roomNumber, setRoomNumber] = useState('');
  const [eventColors, setEventColors] = useState({}); 
  const [lectureColors, setLectureColors] = useState({}); 


  useEffect(() => {
    fetchEvents();
  }, [userId, role]);

  const fetchEvents = async () => {
    try {
      let fetchedEvents = [];
    

      // Fetch admin events (both Admin and Professor see admin events)
      const adminEventsResponse = await axios.get('http://localhost:5000/api/admin/events');
      const adminEvents = adminEventsResponse.data.map(event => ({
        title: event.eventDetails,
        start: `${event.startDate}T${event.startTime}`,
        end: `${event.endDate}T${event.endTime}`,
        backgroundColor: getEventColor(event._id), // Assign a random color
        borderColor: getEventColor(event._id),     // Use the same color for border
        textColor: '#ffffff',
        id: event._id,
        roomNumber: event.room || '',
      }));
      fetchedEvents = [...fetchedEvents, ...adminEvents];

      // Fetch approved lecture plans (Admin sees all, Professor sees only their own)
      const lecturePlansResponse = await axios.get(`http://localhost:5000/api/plan/approvedLecturePlans/${userId}`);
      const lecturePlans = lecturePlansResponse.data.map(plan => ({
        title: plan.moduleName || plan.lectureDetails,
        start: `${plan.lectureDate}T${plan.startTime}`,
        end: `${plan.lectureDate}T${plan.endTime}`,
        backgroundColor: getLectureColor(plan._id), // Assign a random color
        borderColor: getLectureColor(plan._id),     // Use the same color for border
        roomNumber: plan.room || '',
        professors: plan.professors || [],
        id: plan._id,
      }));

      fetchedEvents = [...fetchedEvents, ...lecturePlans];

      // Set the events state with the combined events
      setEvents(fetchedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
    setRoomNumber(clickInfo.event.extendedProps.roomNumber || '');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
    setRoomNumber('');
  };

  const handleSaveRoomNumber = async () => {
    if (selectedEvent) {
      const updatedEvent = {
        room: roomNumber,
      };
  
      try {
        if (selectedEvent.extendedProps.professors) {
          // It's a lecture, update the lecture plan room
          const response = await axios.put(`http://localhost:5000/api/plan/lecturePlan/${selectedEvent.id}`, updatedEvent);
  
          if (response.status === 200) {
            console.log('Lecture room number updated successfully');
            selectedEvent.setExtendedProp('roomNumber', roomNumber);
            handleClose();
          }
        } else {
          // It's an admin event, update the event room
          const response = await axios.put(`http://localhost:5000/api/admin/event/${selectedEvent.id}`, updatedEvent);
  
          if (response.status === 200) {
            console.log('Admin event room number updated successfully');
            selectedEvent.setExtendedProp('roomNumber', roomNumber);
            handleClose();
          }
        }
      } catch (error) {
        console.error('Error updating room number:', error);
      }
    }
  };
  

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const getLectureColor = (lectureId) => {
    if (!lectureColors[lectureId]) {
      // Assign a random color if the lecture doesn't already have one
      const color = getRandomColor();
      setLectureColors((prevColors) => ({ ...prevColors, [lectureId]: color }));
      return color;
    }
    return lectureColors[lectureId]; // Return the stored color if already assigned
  };
  

  const getEventColor = (eventId) => {
    if (!eventColors[eventId]) {
      // Assign a random color if the event doesn't already have one
      const color = getRandomColor();
      setEventColors((prevColors) => ({ ...prevColors, [eventId]: color }));
      return color;
    }
    return eventColors[eventId]; // Return the stored color if already assigned
  };

  const formatDateTime = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleString(undefined, options);
  };

  return (
    <div className='calendar-main'>
      <div className='calendar-container'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          height={700}
          contentHeight={600}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          events={events}
          eventClick={handleEventClick}
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            meridiem: 'short',
          }}
        />
      </div>

      <Dialog open={open} onClose={handleClose} sx={{ padding: '10px', alignSelf: 'center', justifySelf: 'center' }}>
        <DialogTitle sx={{ color: '#DF4807', fontSize: '20px' }}>Event Details</DialogTitle>
        <DialogContent>
          {selectedEvent && (
            <>
              <Typography sx={{ color: '#424242', fontSize: '16px' }}>Event name: {selectedEvent.title}</Typography>
              <Typography sx={{ color: '#424242', fontSize: '14px' }}>
                <strong>Start:</strong> {formatDateTime(selectedEvent.start)}
              </Typography>
              <Typography sx={{ color: '#424242', fontSize: '14px', marginBottom: '10px' }}>
                <strong>End:</strong> {formatDateTime(selectedEvent.end)}
              </Typography>
              <TextField
                margin="dense"
                id="roomNumber"
                label="Room Number"
                type="text"
                fullWidth
                variant="outlined"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Close
          </Button>
          <Button onClick={handleSaveRoomNumber} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
