import React, { useEffect, useState } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { LecturePlanCards } from './LecturePlanCards';
import { fetchLecturePlansByModuleId } from './fetchLecPlanData';
import { LecturePlanContent } from './LecturePlanContent';

export const LectureGrid = ({ moduleId }) => {
  const [lecturePlans, setLecturePlans] = useState([]);
  const [weeks, setWeeks] = useState(['Week 1', 'Week 2', 'Week 3', 'Week 4']); 

  useEffect(() => {
    const fetchLecturePlans = async () => {
      try {
        const data = await fetchLecturePlansByModuleId(moduleId);
        setLecturePlans(data);


        const fetchedWeeks = Array.from(new Set(data.map(lp => `Week ${lp.lectureWeek}`)));

      
        const maxFetchedWeek = Math.max(
          ...fetchedWeeks.map(week => parseInt(week.replace('Week ', ''))),
          4 
        );


        const additionalWeeks = [];
        for (let i = 5; i <= maxFetchedWeek; i++) {
          additionalWeeks.push(`Week ${i}`);
        }

        setWeeks(prevWeeks => [...prevWeeks, ...additionalWeeks]);
      } catch (error) {
        console.error('Error fetching lecture plans:', error);
      }
    };

    if (moduleId) {
      fetchLecturePlans();
    }
  }, [moduleId]);

  const groupedLectures = lecturePlans.reduce((acc, lecture) => {
    const week = `Week ${lecture.lectureWeek}`;
    if (!acc[week]) acc[week] = [];
    acc[week].push(lecture);
    return acc;
  }, {});

  const addWeek = () => {
    const newWeekNumber = weeks.length + 1;
    const newWeek = `Week ${newWeekNumber}`;
    setWeeks([...weeks, newWeek]);
  };

  return (
    <div>
      <LecturePlanContent onAddWeek={addWeek} lecturePlans={lecturePlans} />
      <Box
        sx={{
          width: '90%',
          height: '540px',
          overflow: 'auto',
          whiteSpace: 'nowrap',
          marginTop: '20px',
          marginLeft: '100px',
        }}
      >
        <Grid
          container
          spacing={0}
          sx={{
            width: '100%',
            display: 'inline-flex',
          }}
        >
          {weeks.map((week) => (
            <Grid
              item
              key={week}
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
                margin: '5px',
                width: '280px',
                height: '680px',
                backgroundColor: '#ececec',
                display: 'inline-block',
                borderRadius: '5px',
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#DF4807',
                  color: '#FFFFFF',
                  padding: 1,
                  fontSize: '16px',
                  borderRadius: '5px',
                }}
              >
                {week.charAt(0).toUpperCase() + week.slice(1)}
              </Typography>
              {groupedLectures[week]?.map((lecture) => (
                <LecturePlanCards key={lecture.id} lecture={lecture} week={week} />
              ))}
              {groupedLectures[week]?.length === 0 && (
                <Typography sx={{ padding: 2, textAlign: 'center' }}>
                  No lectures added to this week yet.
                </Typography>
              )}
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};
