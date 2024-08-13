import React, { useState, useEffect } from 'react';
import './UserReg.css';

export const UserRegButtons = ({ onButtonClick, initialActiveButton }) => {
  const [activeButton, setActiveButton] = useState(initialActiveButton || 'Pending Requests');

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    onButtonClick(buttonName);
  };

  useEffect(() => {
    if (initialActiveButton) {
      setActiveButton(initialActiveButton);
    }
  }, [initialActiveButton]);


  return (
    <div>
      <button
        onClick={() => handleButtonClick('Pending Requests')}
        className={`font-face request-button-pending ${activeButton === 'Pending Requests' ? 'active' : ''}`}
      >
        <span className='font-face'>Pending Requests</span>
      </button>
      <button
        onClick={() => handleButtonClick('Approved Requests')}
        className={`font-face request-button-approved ${activeButton === 'Approved Requests' ? 'active' : ''}`}
      >
        <span className='font-face'>Approved Requests</span>
      </button>
      <button
        onClick={() => handleButtonClick('Rejected Requests')}
        className={`font-face request-button-rejected ${activeButton === 'Rejected Requests' ? 'active' : ''}`}
      >
        <span className='font-face'>Rejected Requests</span>
      </button>
    </div>
  );
};
