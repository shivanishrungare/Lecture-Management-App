import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import DeleteIcon from '@mui/icons-material/Delete';
import UndoIcon from '@mui/icons-material/Undo';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const EnhancedTableToolbar = ({
  numSelected,
  title,
  selectedIds,
  onApprove,
  onReject,
  onDelete,
  onRevert,
  activeTable,
}) => {

  const handleApproveClick = (event) => {
    event.preventDefault(); 
    onApprove(selectedIds); 
  };

  const handleRejectClick = (event) => {
    event.preventDefault(); 
    onReject(selectedIds); 
  };

  const handleDeleteClick = (event) => {
    event.preventDefault(); 
    onDelete(selectedIds); 
  };

  const handleRevertClick = (event) => {
    event.preventDefault(); 
    onRevert(selectedIds); 
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      )}

      {numSelected > 0 && (
        <Box sx={{ display: 'flex', gap: 1 }}>
          {activeTable === 'Pending Requests' && (
            <>
              <Tooltip title="Approve">
                <IconButton
                  aria-label="Approve"
                  onClick={handleApproveClick} 
                  sx={{
                    backgroundColor: '#ffffff',
                    color: '#28a745',
                    '&:hover': {
                      backgroundColor: '#D9D9D9',
                    },
                  }}
                >
                  <ThumbUpIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Reject">
                <IconButton
                  aria-label="Reject"
                  onClick={handleRejectClick} 
                  sx={{
                    backgroundColor: '#ffffff',
                    color: '#FF6347',
                    '&:hover': {
                      backgroundColor: '#D9D9D9',
                    },
                  }}
                >
                  <ThumbDownIcon />
                </IconButton>
              </Tooltip>
            </>
          )}

          {(activeTable === 'Approved Requests' || activeTable === 'Rejected Requests') && (
            <>
              <Tooltip title="Revert">
                <IconButton
                  aria-label="Revert"
                  onClick={handleRevertClick}
                  sx={{
                    backgroundColor: '#ffffff',
                    color: '#1E90FF',
                    '&:hover': {
                      backgroundColor: '#D9D9D9',
                    },
                  }}
                >
                  <UndoIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete">
                <IconButton
                  aria-label="Delete"
                  onClick={handleDeleteClick} 
                  sx={{
                    backgroundColor: '#ffffff',
                    color: '#DF4807',
                    '&:hover': {
                      backgroundColor: '#D9D9D9',
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Box>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  selectedIds: PropTypes.array.isRequired, 
  onReject: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired, 
  onRevert: PropTypes.func.isRequired, 
  activeTable: PropTypes.string.isRequired, 
};
