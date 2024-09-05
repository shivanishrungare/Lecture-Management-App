import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const ITEM_HEIGHT = 45;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, selectedNames, theme) {
  return {
    fontWeight:
      selectedNames.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const LecturePlanForm = ({ onRequestClose }) => {
  const { moduleId } = useParams(); 
  const theme = useTheme();
  const [professors, setProfessors] = useState([]);
  const [moduleStartDate, setModuleStartDate] = useState(null);
  const [moduleEndDate, setModuleEndDate] = useState(null);
  const [existingLectures, setExistingLectures] = useState([]);
  const [eventsAndHolidays, setEventsAndHolidays] = useState([]);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    lectureWeek: '',
    lectureDate: '',
    startTime: '',
    endTime: '',
    professors: [], 
    lectureDetails: '',
    lectureUnits: '',
  });
  const [warningOpen, setWarningOpen] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [allowSubmission, setAllowSubmission] = useState(true); 

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/api/users/professors`);
        setProfessors(response.data);
      } catch (error) {
        console.error('Error fetching professors:', error);
      }
    };

    const fetchModuleData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/api/plan/modulePlan/${moduleId}`);
        setModuleStartDate(new Date(response.data.startDate)); 
        setModuleEndDate(new Date(response.data.endDate));
      } catch (error) {
        console.error('Error fetching module data:', error);
      }
    };

    const fetchExistingLectures = async () => {
      try {
        const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/api/plan/lecturePlans/${moduleId}`);
        setExistingLectures(response.data);
      } catch (error) {
        console.error('Error fetching existing lectures:', error);
      }
    };

    const fetchEventsAndHolidays = async () => {
      try {
        const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/api/admin/events`); 
        setEventsAndHolidays(response.data);
      } catch (error) {
        console.error('Error fetching events/holidays:', error);
      }
    };

    fetchProfessors();
    fetchModuleData();
    fetchExistingLectures();
    fetchEventsAndHolidays();
  }, [moduleId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!allowSubmission) {
      return; // Block form submission if not allowed
    }

    setError('');

    try {
      const response = await axios.post(
        `${import.meta.env.REACT_APP_API_URL}/api/plan/lecturePlan/${moduleId}`,
        {
          lectureWeek: formData.lectureWeek,
          lectureDate: formData.lectureDate,
          startTime: formData.startTime,
          endTime: formData.endTime,
          professors: formData.professors.map(prof => prof.name), 
          lectureDetails: formData.lectureDetails,
          lectureUnits: formData.lectureUnits,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      console.log('Response:', response.data);
      setFormData({
        lectureWeek: '',
        lectureDate: '',
        startTime: '',
        endTime: '',
        professors: [],
        lectureDetails: '',
        lectureUnits: '',
      });
      onRequestClose();
      window.location.reload(); 
    } catch (error) {
      console.error('Error:', error.response?.data);
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prevData) => {
      let newFormData = { ...prevData, [name]: value };
  
      if (name === 'lectureDate' && moduleStartDate && moduleEndDate) {
        const selectedDate = new Date(value);
  
  
        if (selectedDate < moduleStartDate || selectedDate > moduleEndDate) {
          setWarningMessage('The lecture date is outside the module start and end dates.');
          setWarningOpen(true);
  
        }
  
     
        const eventConflict = eventsAndHolidays.some(event => {
          const eventStartDate = new Date(event.startDate);
          const eventEndDate = new Date(event.endDate);
          return selectedDate >= eventStartDate && selectedDate <= eventEndDate; 
        });
  
        if (eventConflict) {
          setWarningMessage('The selected date is blocked for an event or holiday. You can proceed, but be aware of this conflict.');
          setWarningOpen(true);
        }
  
       
        const lectureConflict = existingLectures.some((lecture) => {
          return lecture.lectureDate === value; 
        });
  
        if (lectureConflict) {
          setWarningMessage('A lecture is already scheduled for this date. You can proceed, but be aware of this conflict.');
          setWarningOpen(true);
        }
  
        const daysDifference = Math.floor((selectedDate - moduleStartDate) / (1000 * 60 * 60 * 24));
        const lectureWeek = Math.floor(daysDifference / 7) + 1;
        newFormData = { ...newFormData, lectureWeek };
      }
  
      if (name === 'startTime') {
        const startTimeDate = new Date(`1970-01-01T${value}:00Z`);
        const endTimeDate = new Date(startTimeDate.getTime() + 3 * 60 * 60 * 1000 + 15 * 60 * 1000);
        const endTime = endTimeDate.toISOString().substr(11, 5);
  
        newFormData = { ...newFormData, endTime };
      }
  
      return newFormData;
    });
  };
  
  const handleWarningCancel = () => {
    setWarningOpen(false);
    setAllowSubmission(false); 
    setError('You cannot proceed due to the event conflict.');
  };

  const handleProfessorsChange = (event) => {
    const { value } = event.target;
  
    const selectedProfessors = value.map(selectedName => {
      const professor = professors.find(
        prof => `${prof.firstName} ${prof.lastName}` === selectedName
      );
      return professor ? { id: professor._id, name: selectedName } : null;
    }).filter(Boolean);
  
    setFormData(prevData => ({
      ...prevData,
      professors: selectedProfessors,  
    }));
  };
  
  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <div className='form-group'>
            <label className='font-face'>Lecture Date</label>
            <input
              type='date'
              className='fields'
              name='lectureDate'
              value={formData.lectureDate}
              onChange={handleInputChange}
            />
          </div>
          <div className='form-group'>
            <label className='font-face'>Lecture Week</label>
            <input
              type='number'
              className='fields'
              name='lectureWeek'
              value={formData.lectureWeek}
              onChange={handleInputChange}
              disabled
            />
          </div>
        </div>
        <div className='row'>
          <div className='form-group'>
            <label className='font-face'>Start Time</label>
            <input
              type='time'
              className='fields'
              name='startTime'
              value={formData.startTime}
              onChange={handleInputChange}
            />
          </div>
          <div className='form-group'>
            <label className='font-face'>End Time</label>
            <input
              type='time'
              className='fields'
              name='endTime'
              value={formData.endTime}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className='row'>
          <div className='form-group'>
            <label className='font-face'>Lecture Units</label>
            <input
              type='text'
              className='fields'
              placeholder='Enter lecture units'
              name='lectureUnits'
              value={formData.lectureUnits}
              onChange={handleInputChange}
            />
          </div>
          <div className='form-group'>
            <label className='font-face'>Professor</label>
            <FormControl sx={{ m: 0, width: 320 }}>
            <Select
              id="demo-multiple-chip"
              multiple
              name="professors"
              value={formData.professors.map((prof) => prof.name)} 
              onChange={handleProfessorsChange} 
              input={
                <OutlinedInput
                  className="multiple-select"
                  sx={{ display: 'flex', flexWrap: 'wrap', padding: '0px', height: '50px' }}
                />
              }
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {professors.map((professor) => {
                const fullName = `${professor.firstName} ${professor.lastName}`;
                return (
                  <MenuItem
                    key={professor._id}
                    value={fullName} 
                    style={getStyles(fullName, formData.professors.map((prof) => prof.name), theme)} // Styling based on selection
                  >
                    {fullName} 
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          </div>
        </div>
        <div className='row'>
          <div className='form-group'>
            <label className='font-face'>Lecture Details</label>
            <input
              type='text'
              className='fields'
              placeholder='Enter lecture details'
              name='lectureDetails'
              value={formData.lectureDetails}
              onChange={handleInputChange}
            />
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

      {/* Warning Dialog */}
    <Dialog
      open={warningOpen}
      onClose={handleWarningCancel}  // Close the dialog if user clicks outside
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>Date Conflict</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {warningMessage}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setWarningOpen(false)}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  </div>
  );
};
