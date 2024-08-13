import React, { useState } from "react";
import { CoursesTable } from "../../../tables/CoursesTable";
import { ModalForm } from "../../../forms/ModalForm"; 
import { AddCourseForm } from '../../../forms/CourseForm/AddCourseForm'
import add from '../../../assets/icons/add.svg';
import '../AdminHub.css';

export const AdminCourses = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [formType, setFormType] = useState('');

    const openModal = (type) => {
        setFormType(type);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setFormType('');
    };

    return (
        <div className="admin-page-main">
            <div className="admin-page-container">
                <div className="admin-page-content">
                    <div className="admin-page-actions">
                        <h1 className="font-face page-subtitle">Courses and modules</h1>
                        <button className='add-button' onClick={() => openModal('courses')}>
                            <img src={add} alt='add' width='30px' height='25px'/>
                            <span className='font-face'>New Course</span>
                        </button>
                    </div>
                    <div className="admin-table">
                        <CoursesTable/>
                    </div>
                </div>
                <ModalForm isOpen={modalIsOpen} onRequestClose={closeModal}>
                    {formType === 'courses' && <AddCourseForm onRequestClose={closeModal} />}
                </ModalForm>
            </div>
        </div>
    );
};
