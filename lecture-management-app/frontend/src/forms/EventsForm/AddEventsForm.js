import axios from 'axios'
import React, { useState } from 'react'

export const AddEventsForm = ({ onRequestClose }) => {
  const [error, setError] = useState('');
  const [eventData, setEventData] = useState({
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    eventDetails: '',
    eventType: '',
    status: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(
        'http://localhost:5000/api/admin/event',
        {
          startDate: eventData.startDate,
          endDate: eventData.endDate,
          startTime: eventData.startTime,
          endTime: eventData.endTime,
          eventDetails: eventData.eventDetails,
          eventType: eventData.eventType,
          status: eventData.status,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      console.log('Response:', response.data); 
      setEventData({
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        eventDetails: '',
        eventType: '',
        status: '',
      });
    } catch (error) {
      console.error('Error:', error.response.data); 
      setError(error.response?.data?.error || 'An error occurred');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <div className='form-group'>
            <label className='font-face'>Start date</label>
            <input
              type='date'
              className='fields'
              name='startDate'
              value={eventData.startDate}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label className='font-face'>End date</label>
            <input
              type='date'
              className='fields'
              name='endDate'
              value={eventData.endDate}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='row'>
          <div className='form-group'>
            <label className='font-face'>Start time</label>
            <input
              type='time'
              className='fields'
              name='startTime'
              value={eventData.startTime}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label className='font-face'>End time</label>
            <input
              type='time'
              className='fields'
              name='endTime'
              value={eventData.endTime}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='row'>
          <div className='form-group'>
            <label className='font-face'>Event details</label>
            <input
              type='text'
              className='fields'
              placeholder='Enter event details'
              name='eventDetails'
              value={eventData.eventDetails}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='row'>
          <div className='form-group'>
            <label className='font-face'>Event type</label>
            <select
              className='fields'
              placeholder='Select event type'
              name='eventType'
              value={eventData.eventType}
              onChange={handleChange}
            >
              <option value='Public holiday'>Public holiday</option>
              <option value='Campus Event'>Campus Event</option>
              <option value='Summer Break'>Summer Break</option>
              <option value='Convocation'>Convocation</option>
              <option value='Christmas Break'>Christmas Break</option>
              <option value='Other'>Other</option>
            </select>
          </div>
          <div className='form-group'>
            <label className='font-face'>Status</label>
            <select
              className='fields'
              placeholder='Select status'
              name='status'
              value={eventData.status}
              onChange={handleChange}
            >
              <option value='Block'>Block</option>
              <option value='Open'>Open</option>
            </select>
          </div>
        </div>
        <div className='row'>
          <div className='form-group-button'>
            <button type='button' onClick={onRequestClose}>
              Cancel
            </button>
            <button type='submit'>Submit</button>
          </div>
        </div>
      </form>
      {error && <p className='error'>{error}</p>}
    </div>
  );
};
