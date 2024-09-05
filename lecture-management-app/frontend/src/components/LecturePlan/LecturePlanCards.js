import React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';

export const LecturePlanCards = ({ lecture, week, onDelete }) => {

  const getColorByWeeks = (week) => {
    switch (week) {
      case 'Week 1':
        return '#00BCD4'; 
      case 'Week 2':
        return '#21C15A'; 
      case 'Week 3':
        return '#E91E63'; 
      case 'Week 4':
        return '#1E90FF';
      case 'Week 5':
        return '#FF69B4';
      case 'Week 6':
        return '#FFC107';
      case 'Week 7':
        return '#9C27B0';
      case 'Week 8':
        return '#2007FF';
      default:
        return '#DF4807'; // Default color
    }
  };

  // Format the lecture date
  const formattedDate = format(new Date(lecture.lectureDate), 'MMMM do, yyyy');

  // Extract professor names
  const professorNames = lecture.professors.map(professor => professor.name).join(', ');

  const handleDelete = () => {
    // Trigger the delete action passed down by the parent component
    onDelete(lecture.id);
  };

  return (
    <Card sx={{ width: '250px', height: '150px', padding: '2px', margin: '10px', borderLeft: `5px solid ${getColorByWeeks(week)}`, position: 'relative' }}>
      <IconButton 
        aria-label="delete" 
        onClick={handleDelete} 
        sx={{ position: 'absolute', top: '4px', right: '5px' }}
      >
        <DeleteIcon sx={{ fontSize: 20, color: '#DF4807' }} />
      </IconButton>
      <CardContent sx={{margin: '12px'}}>
        <Typography color="text.secondary" sx={{ fontSize: '14px', fontWeight: '700', marginBottom: '10px', color: `${getColorByWeeks(week)}`, fontFamily: 'Inter' }}>
          {`Date: ${formattedDate}`}
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: '12px', fontFamily: 'Inter' }}>
          {`Time: ${lecture.startTime} - ${lecture.endTime}`}
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: '12px', fontFamily: 'Inter' }}>
          {`Professors: ${professorNames}`}
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: '12px', fontFamily: 'Inter' }}>
          {`Details: ${lecture.lectureDetails}`}
        </Typography>
      </CardContent>
    </Card>
  );
};
