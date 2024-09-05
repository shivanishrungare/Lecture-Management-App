import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';

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


function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const ModulePlanForm = ({ onRequestClose }) => {
  const theme = useTheme();
  const [courses, setCourses] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [formData, setFormData] = useState({
    block: '', 
    batch: '', 
    semester: '', 
    studyProgram: '', 
    startDate: '', 
    endDate: '', 
    moduleName: '', 
    professors: [], 
    message: '',
  });


  useEffect(() => {
    const fetchCoursesAndProfessors = async () => {
      try {
        const coursesResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/courses`);
        setCourses(coursesResponse.data);

        const professorsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/professors`); 
        setProfessors(professorsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCoursesAndProfessors();
  }, []);
    

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/plan/modulePlan`,
        {
          ...formData,
          professors: formData.professors.map(prof => ({ id: prof.id, name: prof.name })),
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      console.log('Response:', response.data); 
      setFormData({
        block: '', 
        batch: '', 
        semester: '', 
        studyProgram: '', 
        startDate: '', 
        endDate: '', 
        moduleName: '', 
        professors: [], 
        message: '',
      });
      onRequestClose();
      window.location.reload(); 
    } catch (error) {
      console.error('Error:', error.response.data); 
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'professors') {
      const selectedProfessors = value.map((professorName) => {
        const selectedProfessor = professors.find(
          (professor) => `${professor.firstName} ${professor.lastName}` === professorName
        );
        return selectedProfessor
          ? { id: selectedProfessor._id, name: `${selectedProfessor.firstName} ${selectedProfessor.lastName}` }
          : null;
      }).filter(Boolean);
      setFormData((prevData) => ({
        ...prevData,
        professors: selectedProfessors,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const uniqueStudyPrograms = [...new Set(courses.map(course => course.studyProgram))];

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <div className='form-group'>
            <label className='font-face'>Block</label>
            <select 
            className='fields'  
            name='block'
            value={formData.block}
            onChange={handleChange}
            ><option value="">Select Study Program</option>
              <option value="1">Block 1</option>
              <option value="2">Block 2</option>
              <option value="3">Block 3</option>
              <option value="4">Block 4</option>
              <option value="5">Block 5</option>
              <option value="5a">Block 5a</option>
              <option value="5b">Block 5b</option>
              <option value="6">Block 6</option>
              <option value="7">Block 7</option>
              <option value="8">Block 8</option>
            </select>
          </div>
          <div className='form-group'>
            <label className='font-face'>Batch</label>
            <input  type='text' 
            className='fields'  
            name='batch'
            value={formData.batch}
            onChange={handleChange} />
          </div>
        </div>
        <div className='row'>
          <div className='form-group'>
            <label className='font-face'>Semester</label>
            <select 
            className='fields'
            name='semester'
            value={formData.semester}
            onChange={handleChange}
            ><option value="">Select Semester</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
              <option value="3">Semester 3</option>
              <option value="4">Semester 4</option>
            </select>
          </div>
          <div className='form-group'>
            <label className='font-face'>Study Program</label>
            <select 
            className='fields'
            name='studyProgram'
            value={formData.studyProgram}
            onChange={handleChange}
          >
            <option value="">Select Study Program</option>
            {uniqueStudyPrograms.map((studyProgram, index) => (
              <option key={index} value={studyProgram}>
                {studyProgram}
              </option>
            ))}
          </select>
          </div>
        </div>
        <div className='row'>
          <div className='form-group'>
            <label className='font-face'>Start Date</label>
            <input 
            type='date' 
            className='fields'
            name='startDate'
            value={formData.startDate}
            onChange={handleChange} />
          </div>
          <div className='form-group'>
            <label className='font-face'>End Date</label>
            <input 
            type='date' 
            className='fields'
            name='endDate'
            value={formData.endDate} 
            onChange={handleChange} 
            />
          </div>
        </div>
        <div className='row'>
          <div className='form-group'>
            <label className='font-face'>Module</label>
            <select
            className='fields'
            name='moduleName'
            value={formData.moduleName}
            onChange={handleChange} 
          >
            <option value="">Select Module</option>
            {courses.map(course => (
              <option key={course._id} value={course.moduleName}>
                {course.moduleName}
              </option>
            ))}
          </select>
            </div>
            <div className='form-group'>
            <label className='font-face'>Message</label>
            <input 
            type='text' 
            className='fields' 
            placeholder='Write message here'
            name='message'
            value={formData.message} 
            onChange={handleChange}
             /> 
          </div>
          </div>
        <div className='row'>
        <div className='form-group'>
          <label className='font-face'>Professors</label>
          <FormControl sx={{ m: 0, width: 650 }}>
              <Select
                id="demo-multiple-chip"
                multiple
                name="professors"
                className='demo-multiple-chip'
                value={formData.professors.map((prof) => prof.name)} 
                onChange={handleChange}
                input={
                  <OutlinedInput
                    className="multiple-select"
                    sx={{ display: "flex", flexWrap: "wrap", padding: "0px", height: "50px" }}
                  />
                }
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
              {professors.map((professor) => (
                    (() => {
                      const fullName = `${professor.firstName} ${professor.lastName}`;

                      return (
                        <MenuItem 
                          key={professor._id} 
                          value={fullName} 
                          style={getStyles(fullName, formData.professors, theme)}
                        >
                          {`${fullName}`}
                        </MenuItem>
                      );
                    })()
                  ))}
              </Select>
            </FormControl>
        </div>
         
        </div>
        <div className='row'>
          <div className='form-group-button'>
            <button type='button' onClick={onRequestClose}>Cancel</button>
            <button type='submit'>Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};
