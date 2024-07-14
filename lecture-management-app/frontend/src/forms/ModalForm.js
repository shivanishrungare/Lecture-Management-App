import React from 'react';
import Modal from 'react-modal';
import './Form.css';

Modal.setAppElement('#root');

export const ModalForm = ({ isOpen, onRequestClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      {children}
    </Modal>
  );
};