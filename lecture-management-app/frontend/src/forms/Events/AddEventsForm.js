import React from 'react'

export const AddEventsForm = ({onRequestClose}) => {
  return (
    <div className='form-container'>
        <form>
            <div className='row'>
                <div className='form-group'>
                    <label className='font-face'>Start date</label>
                    <input type='date' className='fields'/>
                </div>
                <div className='form-group'>
                    <label className='font-face'>End date</label>
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
                    <label className='font-face'>Event details</label>
                    <input  type='text' className='fields' placeholder='Enter event details'/>
                </div>
            </div>
            <div className='row'>
                <div className='form-group'>
                    <label className='font-face'>Event type</label>
                    <select className='fields' placeholder='Select event type'>
                    <option value="Public holiday">Public holiday</option>
                    <option value="Campus Event">Campus Event</option>
                    <option value="Semester break">Semester break</option>
                    <option value="Convocation">Convocation</option>
                    <option value="Other">Other</option>
                    </select>
                </div>
                <div className='form-group'>
                    <label className='font-face'>Status</label>
                    <select className='fields' placeholder='Select status'>
                    <option value="Block">Block</option>
                    <option value="Open">Open</option>
                    </select>    
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

