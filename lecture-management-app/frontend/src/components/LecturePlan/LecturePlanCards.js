import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { format } from 'date-fns';

export const LecturePlanCards = ({ lecture, week }) => {

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

  return (
    <Card sx={{ width: '220px', height: '120px', padding: '2px', margin: '10px', borderLeft: `5px solid ${getColorByWeeks(week)}` }}>
      <CardContent>
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
