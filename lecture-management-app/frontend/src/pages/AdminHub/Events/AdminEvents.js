import React, { useState } from "react";
import { EventsTable } from "../../../tables/EventsTable";
import { ModalForm } from "../../../forms/ModalForm";
import { AddEventsForm } from '../../../forms/EventsForm/AddEventsForm';
import add from '../../../assets/icons/add.svg';
import '../AdminHub.css';

export const AdminEvents = () => {
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
                        <h1 className="font-face page-subtitle">Events and Public Holidays</h1>
                        <button className='add-button' onClick={() => openModal('events')}>
                            <img src={add} alt='add' width='30px' height='25px'/>
                            <span className='font-face'>New Event</span>
                        </button>
                    </div>
                    <div className="admin-table">
                        <EventsTable/>
                    </div>
                </div>
                <ModalForm isOpen={modalIsOpen} onRequestClose={closeModal}>
                    {formType === 'events' && <AddEventsForm onRequestClose={closeModal} />}
                </ModalForm>
            </div>
        </div>
    );
};
