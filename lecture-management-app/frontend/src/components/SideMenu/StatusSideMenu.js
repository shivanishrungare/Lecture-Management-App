import React from 'react'
import add from '../../assets/icons/add.svg'
import { useContext } from 'react'
import { ModalForm } from '../../forms/ModalForm'
import { ModulePlanForm } from '../../forms/ModulePlanForm/ModulePlanForm'
import { useState } from 'react';
import { AuthContext } from '../../services/api/auth'
import './SideMenu.css';

export const StatusSideMenu = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formType, setFormType] = useState('');
  const { role } = useContext(AuthContext);

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
      <div className='side-menu-container'>
            <p className='font-face page-title'>Status Board</p>
        <div className='side-menu-content'>
        {role === 'Admin' && (
        <button className='add-button' onClick={() => openModal('modulePlan')}>
            <img src={add} alt='add' width='25px' height='25px'/>
            <span className='font-face'>Create Plan</span>
        </button>
         )}
        </div>
        <ModalForm isOpen={modalIsOpen} onRequestClose={closeModal}>
        {formType === 'modulePlan' && <ModulePlanForm onRequestClose={closeModal} />}
       </ModalForm>
        </div>
    </div>
  )
}

