import { AvatarGroup, Avatar } from '@mui/material';
import React from 'react';


function getInitials(name) {
  if (!name) return ''; 

  const nameParts = name.split(' '); 
  const initials = nameParts.map(part => part[0]).join('');

  return initials.toUpperCase();
}

function getColorByIndex(index) {
  const colors = [
    '#E91E63', // Pink
    '#9C27B0', // Purple
    '#3F51B5', // Indigo
    '#009688', // Teal
    '#00BCD4', // Cyan
    '#4CAF50', // Green
    '#FFC107', // Amber
    '#FF9800', // Orange
  ];

  return colors[index % colors.length];
}

export const ProfAvatar = ({ professors }) => {
  return (
    <AvatarGroup>
      {professors.map((professor, idx) => {
        const initials = getInitials(professor);

        return (
          <Avatar 
          key={idx} 
            sx={{ 
              width: '32px', 
              height: '32px', 
              fontSize: '12px', 
              margin: '2px',
              bgcolor: getColorByIndex(idx),
              color: '#fff',
            }}
          >
            {initials}
          </Avatar>
        );
      })}
    </AvatarGroup>
  )
}


