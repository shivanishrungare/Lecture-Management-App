import React, { useState, useContext } from 'react';
import { Card, CardContent, Typography, Grid, Box, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';
import { format } from 'date-fns';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ProfAvatar } from './ProfAvatar';
import { AuthContext } from '../../services/api/auth';


export const GeneralCard = ({ title, plans, onClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { role } = useContext(AuthContext);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getColorByStatus = (status) => {
    switch (status) {
      case 'Progress':
        return '#FCA95D';
      case 'Completed':
        return '#E5F347';
      case 'Approved':
        return '#21C15A';
      default:
        return '#DF4807';
    }
  };

  return (
    <Card sx={{ margin: 1, width: '100%' }}>
      <CardContent sx={{ padding: '0px', backgroundColor: '#EDEDED', border: '1px solid #D9D9D9', position: 'relative' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
            variant="h5"
            sx={{
              backgroundColor: '#DF4807',
              color: '#FFFFFF',
              padding: 1,
              fontSize: '16px',
              borderRadius: '5px',
              flexGrow: 1,
            }}
          >
            {title}
          </Typography>
        </Box>

        <Grid container sx={{ margin: '5px', flexDirection: 'column' }}>
          {plans.map((plan, index) => (
            <Draggable draggableId={plan.id} index={index} key={plan.id}>
              {(provided) => (
                <Grid
                  item
                  xs={12}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <Card
                    sx={{
                      width: '300px',
                      height: '180px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      margin: '16px',
                      borderLeft: `5px solid ${getColorByStatus(title)}`,
                      position: 'relative',
                    }}
                    key={plan.id}
                  >
                    <CardContent sx={{ padding: 2, flexGrow: 1 }}>
                      <Box sx={{ overflow: 'hidden' }}>
                        <Typography
                          color="text.primary"
                          sx={{ fontSize: '14px', fontFamily: 'Inter', fontWeight: '500', color: '#DF4807', wordWrap: 'break-word' }}
                        >
                          {plan.studyProgram} - {plan.moduleName}
                        </Typography>
                        <Typography color="text.secondary" sx={{ fontSize: '12px', fontFamily: 'Inter', wordWrap: 'break-word' }}>
                          Block.{plan.block} Batch.{plan.batch} Sem.{plan.semester}
                        </Typography>
                        <Typography color="text.secondary" sx={{ fontSize: '12px', fontFamily: 'Inter', wordWrap: 'break-word' }}>
                          {format(new Date(plan.startDate), 'dd/MM/yy')} - {format(new Date(plan.endDate), 'dd/MM/yy')}
                        </Typography>
                        <Typography color="text.secondary" sx={{ fontSize: '12px', fontFamily: 'Inter', wordWrap: 'break-word' }}>
                          Message: {plan.message}
                        </Typography>
                      </Box>

                      <IconButton
                        aria-label="more"
                        aria-controls="menu"
                        aria-haspopup="true"
                        onClick={handleMenuClick}
                        sx={{ color: '#DF4807', position: 'absolute', top: 8, right: 8 }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id="menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        PaperProps={{
                          style: {
                            maxHeight: 48 * 4.5,
                            width: '20ch',
                          },
                        }}
                      >
                        <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
                      </Menu>
                    </CardContent>

                    <Box sx={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Button
                        variant="contained"
                        sx={{
                          fontSize: '12px',
                          fontFamily: 'Inter',
                          padding: '2px',
                          fontWeight: '500',
                          backgroundColor: '#DF4807',
                          marginLeft: '15px',
                        }}
                        onClick={() => onClick(plan.id)}
                      >
                        {role === 'Admin' ? 'View' : 'Plan'}
                      </Button>
                      <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '15px' }}>
                        <ProfAvatar professors={plan.professors} />
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              )}
            </Draggable>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};
