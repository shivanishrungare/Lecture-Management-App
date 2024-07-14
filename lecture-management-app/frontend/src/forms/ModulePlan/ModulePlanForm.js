import React from 'react';
import '../Form.css';

export const ModulePlanForm = ({ onRequestClose }) => {
  return (
    <div className='form-container'>
      <form>
        <div className='row'>
          <div className='form-group'>
            <label className='font-face'>Block</label>
            <select className='fields'>
              <option value="block1">Block 1</option>
              <option value="block2">Block 2</option>
              <option value="block3">Block 3</option>
            </select>
          </div>
          <div className='form-group'>
            <label className='font-face'>Batch</label>
            <select className='fields'>
              <option value="batch1">Batch 1</option>
              <option value="batch2">Batch 2</option>
              <option value="batch3">Batch 3</option>
            </select>
          </div>
        </div>
        <div className='row'>
          <div className='form-group'>
            <label className='font-face'>Semester</label>
            <select className='fields'>
              <option value="sem1">Semester 1</option>
              <option value="sem2">Semester 2</option>
              <option value="sem3">Semester 3</option>
            </select>
          </div>
          <div className='form-group'>
            <label className='font-face'>Study Program</label>
            <select className='fields'>
              <option value="program1">Program 1</option>
              <option value="program2">Program 2</option>
              <option value="program3">Program 3</option>
            </select>
          </div>
        </div>
        <div className='row'>
          <div className='form-group'>
            <label className='font-face'>Start Date</label>
            <input type='date' className='fields' />
          </div>
          <div className='form-group'>
            <label className='font-face'>End Date</label>
            <input type='date' className='fields' />
          </div>
        </div>
        <div className='row'>
          <div className='form-group'>
            <label className='font-face'>Module</label>
            <select className='fields'>
              <option value="module1">Module 1</option>
              <option value="module2">Module 2</option>
              <option value="module3">Module 3</option>
            </select>
          </div>
          <div className='form-group'>
            <label className='font-face'>Professors</label>
            <select className='fields'>
              <option value="prof1">Professor 1</option>
              <option value="prof2">Professor 2</option>
              <option value="prof3">Professor 3</option>
            </select>
          </div>
        </div>
        <div className='row'>
          <div className='form-group'>
            <label className='font-face'>Message for Professors</label>
            <input type='text' className='fields' defaultValue='Write message here' />
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
