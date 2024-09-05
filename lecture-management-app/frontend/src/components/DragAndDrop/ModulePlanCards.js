import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { usePlanData } from './fetchPlanData';
import { GeneralCard } from './GeneralCard';
import { BoardContent } from './BoardContent';
import { useNavigate } from 'react-router-dom';

export const ModulePlanCards = ({ userId, role }) => {
  const [approvedPlan, setApprovedPlan] = useState([]);
  const [progressPlan, setInProgressPlan] = useState([]);
  const [completedPlan, setCompletedPlan] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [openConfirmation, setOpenConfirmation] = useState(false); 
  const navigate = useNavigate();
  const { fetchApprovedPlan, fetchInProgressPlan, fetchCompletedPlan } = usePlanData();

  const changeModuleStatus = async (moduleId, status) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/plan/modulePlan/${moduleId}/status`, { status });
    } catch (error) {
      console.error('Error updating module plan status:', error);
    }
  };

  const updateColumnState = (newColumns) => {
    setApprovedPlan(newColumns.approved.plans);
    setInProgressPlan(newColumns.progress.plans);
    setCompletedPlan(newColumns.completed.plans);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const approved = await fetchApprovedPlan(userId);
        const progress = await fetchInProgressPlan(userId);
        const completed = await fetchCompletedPlan(userId);
        
        setApprovedPlan(filterByProfessor(approved));
        setInProgressPlan(filterByProfessor(progress));
        setCompletedPlan(filterByProfessor(completed));
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };

    fetchData();
  }, [userId, role]);

  const filterByProfessor = (plans) => {
    if (role === 'Admin') {
      return plans; 
    } else {
      return plans.filter(plan => plan.professors.some(prof => prof.id === userId)); 
    }
  };

  const columns = {
    progress: { title: 'Progress', plans: progressPlan },
    completed: { title: 'Completed', plans: completedPlan },
    approved: { title: 'Approved', plans: approvedPlan },
  };

  const handleCardClick = (moduleId) => {
    navigate(`/lecturePlan/${moduleId}`);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    
    if (!destination) return;

    const sourceColumn = columns[source.droppableId];
    const destinationColumn = columns[destination.droppableId];

    const isAdmin = role === 'Admin';

    // Check if user is not an Admin and is trying to move a card in or out of the "Approved" column
    if (!isAdmin && (source.droppableId === 'approved' || destination.droppableId === 'approved')) {
      // Prevent non-Admin users from moving items in or out of "Approved" column
      console.log('Non-Admin users cannot move items to/from the Approved column');
      return;
    }

    if (source.droppableId === destination.droppableId) {
      // Handle reordering within the same column
      const newPlans = Array.from(sourceColumn.plans);
      const [movedPlan] = newPlans.splice(source.index, 1);
      newPlans.splice(destination.index, 0, movedPlan);

      const newColumns = {
        ...columns,
        [source.droppableId]: { ...sourceColumn, plans: newPlans },
      };

      updateColumnState(newColumns);
    } else {
      const sourcePlans = Array.from(sourceColumn.plans);
      const destinationPlans = Array.from(destinationColumn.plans);
      const [movedPlan] = sourcePlans.splice(source.index, 1);

      // Admins only: Move plans to or from "Approved" column
      if (isAdmin && (destination.droppableId === 'approved' || source.droppableId === 'approved')) {
        setDraggedItem({
          plan: movedPlan,
          sourcePlans,
          destinationPlans,
          sourceDroppableId: source.droppableId,
          destinationDroppableId: destination.droppableId,
          destinationTitle: destinationColumn.title,
        });
        setOpenConfirmation(true);
      } else {
        // Proceed with normal dragging if not involving "Approved"
        destinationPlans.splice(destination.index, 0, movedPlan);
        const newColumns = {
          ...columns,
          [source.droppableId]: { ...sourceColumn, plans: sourcePlans },
          [destination.droppableId]: { ...destinationColumn, plans: destinationPlans },
        };

        updateColumnState(newColumns);
        changeModuleStatus(movedPlan.id, destination.droppableId);
      }
    }
  };

  const handleConfirmMove = () => {
    const { plan, sourcePlans, destinationPlans, destinationDroppableId } = draggedItem;

    destinationPlans.splice(destinationPlans.length, 0, plan);

    const newColumns = {
      ...columns,
      [draggedItem.sourceDroppableId]: { ...columns[draggedItem.sourceDroppableId], plans: sourcePlans },
      [draggedItem.destinationDroppableId]: { ...columns[draggedItem.destinationDroppableId], plans: destinationPlans },
    };

    updateColumnState(newColumns);
    changeModuleStatus(plan.id, destinationDroppableId);

    setOpenConfirmation(false);
  };

  const handleCancelMove = () => {
    setOpenConfirmation(false);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <BoardContent />
      <div style={{ flex: 1, overflow: 'auto' }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Container
            sx={{
              display: 'flex',
              flexDirection: 'row',
              marginLeft: '360px',
              width: '75%',
              padding: '0px',
              justifyContent: 'space-between',
            }}
          >
            {Object.keys(columns).map((columnId) => {
              const column = columns[columnId];
              return (
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{
                        flexGrow: 1,
                        minWidth: '300px',
                        maxWidth: '350px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        padding: 1,
                        marginBottom: '16px',
                      }}
                    >
                      <GeneralCard title={column.title} plans={column.plans} onClick={handleCardClick} />
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              );
            })}
          </Container>
        </DragDropContext>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={openConfirmation} onClose={handleCancelMove}>
        <DialogTitle>Confirm Move</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to move this plan to {draggedItem?.destinationTitle}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelMove} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmMove} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
