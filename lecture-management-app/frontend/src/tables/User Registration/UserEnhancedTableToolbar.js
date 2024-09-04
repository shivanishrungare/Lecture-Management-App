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
          {/* Show Approve/Reject buttons for Pending Requests table */}
          {activeTable === 'Pending Requests' && (
            <>
              <Tooltip title="Approve">
                <IconButton
                  aria-label="Approve"
                  onClick={() => onApprove(selectedIds)}
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
                  onClick={() => onReject(selectedIds)}
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

          {/* Show Delete/Revert buttons for Approved or Rejected tables */}
          {(activeTable === 'Approved Requests' || activeTable === 'Rejected Requests') && (
            <>
              <Tooltip title="Revert">
                <IconButton
                  aria-label="Revert"
                  onClick={() => onRevert(selectedIds)}
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
                  onClick={() => onDelete(selectedIds)}
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
  selectedIds: PropTypes.array.isRequired, // Pass selected IDs
  onApprove: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired, // For Delete functionality
  onRevert: PropTypes.func.isRequired, // For Revert functionality
  activeTable: PropTypes.string.isRequired, // To control which buttons are visible
};
