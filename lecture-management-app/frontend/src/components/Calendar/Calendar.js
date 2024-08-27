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

export const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [roomNumber, setRoomNumber] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/events');
      console.log(response.data);

      const data = response.data;

      const coloredEvents = data.map(event => {
        return {
          title: event.eventDetails,
          start: `${event.startDate}T${event.startTime}`,
          end: `${event.endDate}T${event.endTime}`,
          backgroundColor: getRandomColor(),
          borderColor: getRandomColor(),
          textColor: '#ffffff',
          id: event._id,
          roomNumber: event.room || '', 
        };
      });

      setEvents(coloredEvents);
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
            const response = await axios.put(`http://localhost:5000/api/admin/event/${selectedEvent.id}`, updatedEvent);

            if (response.status === 200) {
                console.log('Room number updated successfully');
                selectedEvent.setExtendedProp('roomNumber', roomNumber);

                handleClose();
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
            meridiem: 'short'
          }}
        />
      </div>

      <Dialog open={open} onClose={handleClose} sx={{width:'500px', height:'750px', alignSelf:'center', justifySelf:'center'}}>
        <DialogTitle>Event Details</DialogTitle>
        <DialogContent>
          {selectedEvent && (
            <>
              <Typography variant="h6">Title: {selectedEvent.title}</Typography>
              <Typography variant="body1">
                <strong>Start:</strong> {formatDateTime(selectedEvent.start)}
              </Typography>
              <Typography variant="body1">
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
          <Button 
          onClick={handleSaveRoomNumber} 
          color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
