import React from 'react'

export const AddCourseForm = ({ onRequestClose }) =>{
    return (
        <div className='form-container'>
            <form>
                <div className='row'>
                    <div className='form-group'>
                        <label className='font-face'>Study program</label>
                        <input type='text' className='fields' placeholder='Enter study program'/>
                    </div>
                    <div className='form-group'>
                        <label className='font-face'>Module name</label>
                        <input type='text' className='fields' placeholder='Enter module name'/>
                    </div>
                    </div>
                    <div className='row'>
                    <div className='form-group'>
                        <label className='font-face'>Credit points</label>
                        <select className='fields' placeholder='Select credit points'>
                        <option value="8">8</option>
                        <option value="4">4</option>
                        </select>
                    </div>
                    <div className='form-group'>
                        <label className='font-face'>Language</label>
                        <select className='fields' placeholder='Select language'>
                        <option value="German">German</option>
                        <option value="English">English</option>
                        </select>
                    </div>
                    </div>
                    <div className='row'>
                        <div className='form-group'>
                        <label className='font-face'>Module details</label>
                        <input type='text' className='fields' placeholder='Enter module details'></input>
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