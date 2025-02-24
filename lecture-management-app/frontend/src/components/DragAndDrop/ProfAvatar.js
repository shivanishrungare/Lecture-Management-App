import { AvatarGroup, Avatar } from '@mui/material';
import React from 'react';

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

function getInitials(professor) {
  if (!professor || !professor.name) {
    return '?'; 
  }

  const nameParts = professor.name.trim().split(' ');
  if (nameParts.length === 1) {
    return nameParts[0].charAt(0).toUpperCase();
  }
  const initials = nameParts[0].charAt(0).toUpperCase() + nameParts[nameParts.length - 1].charAt(0).toUpperCase();
  return initials;
}

export const ProfAvatar = ({ professors }) => {
  if (!professors || !Array.isArray(professors)) {
    return null; 
  }

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
  );
}
