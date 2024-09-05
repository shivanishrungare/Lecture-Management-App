import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { EnhancedTableHead } from './EnhancedTableHead';
import { EnhancedTableToolbar } from './EnhancedTableToolbar';
import { stableSort, getComparator } from './tableUtils';

export const GenericTable = ({ columns, fetchData, title, FormComponent, deleteEndpoint }) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(columns[0].id);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  // Fetch rows using the fetchData function passed as a prop
  useEffect(() => {
    const fetchRows = async () => {
      const result = await fetchData();  // Call fetchData prop
      setRows(result);                   // Set rows with fetched data
    };

    fetchRows();
  }, [fetchData]);  // Run this effect whenever fetchData changes

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rows]
  );

  const handleEdit = () => {
    if (selected.length === 1) {
      const id = selected[0];
      const rowToEdit = rows.find((row) => row.id === id);
      setEditingItem(rowToEdit);
    }
  };

  const handleDelete = async () => {
    if (selected.length > 0) {
      try {
        await Promise.all(selected.map(async (id) => {
          await axios.delete(`${process.env.REACT_APP_API_URL}/api/${deleteEndpoint}/${id}`);
        }));

        setRows(rows.filter((row) => !selected.includes(row.id)));
        setSelected([]);
      } catch (error) {
        console.error('Error deleting:', error.response?.data);
      }
    }
  };

  const handleFormClose = () => {
    setEditingItem(null);
  };

  const handleFormSubmit = async (formData) => {
    try {
      let response;
      if (editingItem) {
        response = await axios.put(`${process.env.REACT_APP_API_URL}/api/${deleteEndpoint}/${editingItem.id}`, formData);
      } else {
        response = await axios.post(`${process.env.REACT_APP_API_URL}/api/${deleteEndpoint}`, formData);
      }

      const updatedRows = editingItem
        ? rows.map((row) => (row.id === editingItem.id ? response.data : row))
        : [...rows, response.data];

      setRows(updatedRows);
      handleFormClose();
    } catch (error) {
      console.error('Error submitting form:', error.response?.data);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          title={title}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={columns}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.numeric ? 'right' : 'left'}
                      >
                        {row[column.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
      {editingItem && (
        <FormComponent
          initialData={editingItem}
          onRequestClose={handleFormClose}
          onSubmit={handleFormSubmit}
        />
      )}
    </Box>
  );
};

GenericTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
      disablePadding: PropTypes.bool,
    })
  ).isRequired,
  fetchData: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  FormComponent: PropTypes.elementType.isRequired,
  deleteEndpoint: PropTypes.string.isRequired,
};
