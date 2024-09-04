// import React, { useState } from 'react'
// import add from '../../assets/icons/add.svg'
// import { ModalForm } from '../../forms/ModalForm'
// import { LecturePlanForm } from '../../forms/LecturePlanForm/LecturePlanForm';

// export const PlanningSideMenu = () => {
//     const [modalIsOpen, setModalIsOpen] = useState(false);
//     const [formType, setFormType] = useState('');
  
//     const openModal = (type) => {
//       setFormType(type);
//       setModalIsOpen(true);
//     };
  
//     const closeModal = () => {
//       setModalIsOpen(false);
//       setFormType('');
//     };

//     return (
//       <div>
//         <div className='side-menu-container'>
//             <p className='font-face page-title'>Lecture Planning</p>
//           <div className='side-menu-content'>
//           <button className='add-button' onClick={() => openModal('lecturePlan')}>
//               <img src={add} alt='add' width='25px' height='25px'/>
//               <span className='font-face'>New record</span>
//           </button>
//           </div>
//           <ModalForm isOpen={modalIsOpen} onRequestClose={closeModal}>
//           {formType === 'lecturePlan' && <LecturePlanForm  onRequestClose={closeModal} />}
//          </ModalForm>
//           </div>
//       </div>
//     )
// }
