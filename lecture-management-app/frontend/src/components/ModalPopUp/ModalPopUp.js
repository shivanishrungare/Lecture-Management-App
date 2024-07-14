import React from 'react';
import Modal from 'react-modal';
import './ModalPopUp.css';

Modal.setAppElement('#root');

export const ModalPopUp = ({ isOpen, onRequestClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal-popup-content"
      overlayClassName="modal-popup-overlay"
    >
      {children}
    </Modal>
  );
};