import React from 'react'
import './StatusSideMenu.css'
import add from '../../assets/icons/add.svg'
import { ModalForm } from '../../forms/ModalForm'
import { ModulePlanForm } from '../../forms';
import { useState } from 'react';

export const StatusSideMenu = () => {
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
    <div>
      <div className='status-side-menu'>
            <p className='font-face status-title'>Status Board</p>
        <div className='side-menu-content'>
        <button className='add-button' onClick={() => openModal('modulePlan')}>
            <img src={add} alt='add' width='25px' height='25px'/>
            <span className='font-face'>Create Plan</span>
        </button>
        </div>
        <ModalForm isOpen={modalIsOpen} onRequestClose={closeModal}>
        {formType === 'modulePlan' && <ModulePlanForm onRequestClose={closeModal} />}
       </ModalForm>
        </div>
    </div>
  )
}

