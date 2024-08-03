import React from 'react'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

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

const names = [
  'Kelly Hansen',
  'Bradley Henry',
  'April Tucker',
  'Carlos Hubbard',
  'Ralph Alexander'
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const LecturePlanForm = ({onRequestClose}) => {
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);
  
    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setPersonName(
        typeof value === 'string' ? value.split(',') : value,
      );
    };
  return (
    <div className='form-container'>
        <form>
        <div className='row'>
            <div className='form-group'>
                <label className='font-face'>Lecture week</label>
                <input  type='number' className='fields' placeholder='Enter week'/>
            </div>
            <div className='form-group'>
                    <label className='font-face'>Lecture date</label>
                    <input  type='date' className='fields'/>
            </div>
        </div>
        <div className='row'>
                <div className='form-group'>
                    <label className='font-face'>Start time</label>
                    <input  type='time' className='fields'/>
                </div>
                <div className='form-group'>
                    <label className='font-face'>End time</label>
                    <input  type='time' className='fields'/>
                </div>
        </div>
        <div className='row'>
                <div className='form-group'>
                    <label className='font-face'>Professor</label>
                    <FormControl sx={{ m: 0, width: 600}}>
                    <Select
                    id="demo-multiple-chip"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput className='multiple-select' sx={{ display: 'flex', flexWrap: 'wrap', padding: '0px' }}/>}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} />
                        ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                    >
                    {names.map((name) => (
                        <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, personName, theme)}
                        >
                    {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
                </div>
        </div>
        <div className='row'>
                <div className='form-group'>
                    <label className='font-face'>Lecture details</label>
                    <input  type='text' className='fields' placeholder='Enter lecture details'/>
                </div>
        </div>
        <div className='row'>
                <div className='form-group'>
                    <label className='font-face'>Lecture units</label>
                    <input  type='text' className='fields' placeholder='Enter event details'/>
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
  )
}

