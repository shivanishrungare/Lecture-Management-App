import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const AddCourseForm = ({ onRequestClose, initialData, onSubmit }) => {
    const [courseData, setCourseData] = useState({
        studyProgram: '',
        moduleName: '',
        creditPoints: '',
        language: '',
        moduleDetails: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (initialData) {
            setCourseData(initialData);
        }
    }, [initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
    
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/admin/course`,
                {
                    studyProgram: courseData.studyProgram,
                    moduleName: courseData.moduleName,
                    creditPoints: courseData.creditPoints,
                    language: courseData.language,
                    moduleDetails: courseData.moduleDetails,
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            console.log('Response:', response.data);
            onSubmit(courseData); 
            setCourseData({
                studyProgram: '',
                moduleName: '',
                creditPoints: '',
                language: '',
                moduleDetails: '',
            });
            onRequestClose();
        } catch (error) {
            console.error('Error:', error); 
            setError(
                error.response?.data?.error || 
                error.message || 
                'An unexpected error occurred'
            );
        }
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className='form-container'>
            <h2 className='font-face form-title'>Course Form</h2> 
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='form-group'>
                        <label className='font-face'>Study program</label>
                        <input 
                            type='text' 
                            className='fields' 
                            placeholder='Enter study program'
                            name='studyProgram'
                            value={courseData.studyProgram}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label className='font-face'>Module name</label>
                        <input 
                            type='text' 
                            className='fields' 
                            placeholder='Enter module name'
                            name='moduleName'
                            value={courseData.moduleName}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='form-group'>
                        <label className='font-face'>Credit points</label>
                        <select 
                            className='fields' 
                            placeholder='Select credit points'
                            name='creditPoints'
                            value={courseData.creditPoints}
                            onChange={handleChange}
                        >
                            <option value="">Select credit points</option>
                            <option value="8">8</option>
                            <option value="4">4</option>
                        </select>
                    </div>
                    <div className='form-group'>
                        <label className='font-face'>Language</label>
                        <select 
                            className='fields' 
                            placeholder='Select language'
                            name='language'
                            value={courseData.language}
                            onChange={handleChange}
                        > 
                            <option value="">Select language</option>
                            <option value="German">German</option>
                            <option value="English">English</option>
                        </select>
                    </div>
                </div>
                <div className='row'>
                    <div className='form-group'>
                        <label className='font-face'>Module details</label>
                        <input 
                            type='text' 
                            className='fields' 
                            placeholder='Enter module details'
                            name='moduleDetails'
                            value={courseData.moduleDetails}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='form-group-button'>
                        <button className='cancel-button' type='button' onClick={onRequestClose}>Cancel</button>
                        <button type='submit'>Submit</button>
                    </div>
                </div>
            </form> 
            {error && <p className='error'>{error}</p>}   
        </div>
    );
};
