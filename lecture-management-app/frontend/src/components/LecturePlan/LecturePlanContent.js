import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ModalForm } from '../../forms/ModalForm';
import { LecturePlanForm } from '../../forms/LecturePlanForm/LecturePlanForm';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from '@mui/icons-material/Download';
import ImageIcon from '@mui/icons-material/Image';
import TableChartIcon from '@mui/icons-material/TableChart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; 
import { exportToICS } from '../../services/export/exportToICS';
import { exportToExcel } from '../../services/export/exportFile';
import './LectureGrid.css';
import { fetchModulePlanById } from './fetchLecPlanData';
import { AuthContext } from '../../services/api/auth';

export const LecturePlanContent = ({ onAddWeek, lecturePlans }) => {
  const { moduleId } = useParams();
  const { role } = useContext(AuthContext);
  const [modulePlan, setModulePlan] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formType, setFormType] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const openModal = (type) => {
    setFormType(type);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setFormType('');
  };

  const handleExportICS = () => {
    exportToICS(lecturePlans);
  };

  const handleExportExcel = () => {
    exportToExcel(lecturePlans);
  };

  useEffect(() => {
    const loadModulePlan = async () => {
      try {
        const data = await fetchModulePlanById(moduleId);
        setModulePlan(data);
      } catch (error) {
        setError('Module plan not found or an error occurred while fetching the module plan.');
      }
    };

    if (moduleId) {
      loadModulePlan();
    }
  }, [moduleId]);

  if (!modulePlan) {
    return <Typography>Loading module information...</Typography>;
  }

  return (
    <div className='planning-content'>
      {error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <div className='header-with-back'>
          <ArrowBackIcon
            onClick={() => navigate(-1)} 
            sx={{
              fontSize: 25, 
              color: '#DF4807', 
              cursor: 'pointer', 
              marginRight: '10px',
            }}
          />
          <Typography className='font-face' sx={{ fontSize: '20px', color: '#DF4807', fontWeight: 'bold' }}>
            Lecture Planning: {`${modulePlan.studyProgram} - ${modulePlan.moduleName} - Block ${modulePlan.block} - Batch ${modulePlan.batch} - Sem ${modulePlan.semester}`}
            <br /> <Typography>Start Date: {`${modulePlan.startDate}  to  ${modulePlan.endDate}`}</Typography>
          </Typography>
        </div>
      )}
      {role === 'Professor' && (
        <div className='planning-buttons'>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            sx={{
              fontSize: '14px',
              backgroundColor: '#DF4807',
              color: '#FFFFFF',
              textTransform: 'capitalize',
              border: '1px solid #DF4807',
              borderRadius: '5px',
              margin: '2px 5px',
              '&:hover': {
                backgroundColor: '#FFFFFF',
                color: '#DF4807',
              },
            }}
            onClick={() => openModal('lecturePlan')}
          >
            New Lecture
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: '#FFFFFF',
              fontSize: '14px',
              color: '#DF4807',
              border: '1px solid #DF4807',
              textTransform: 'capitalize',
              borderRadius: '5px',
              margin: '2px 5px',
              '&:hover': {
                backgroundColor: '#DF4807',
                color: '#FFFFFF',
              },
            }}
            onClick={onAddWeek}
          >
            Add Week
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<DownloadIcon />}
            sx={{
              backgroundColor: '#FFFFFF',
              fontSize: '14px',
              color: '#DF4807',
              border: '1px solid #DF4807',
              textTransform: 'capitalize',
              borderRadius: '5px',
              margin: '2px 5px',
              '&:hover': {
                backgroundColor: '#DF4807',
                color: '#FFFFFF',
              },
            }}
            onClick={handleExportICS}
          >
            Export ICS
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<TableChartIcon />}
            sx={{
              backgroundColor: '#FFFFFF',
              fontSize: '14px',
              color: '#DF4807',
              border: '1px solid #DF4807',
              textTransform: 'capitalize',
              borderRadius: '5px',
              margin: '2px 5px',
              '&:hover': {
                backgroundColor: '#DF4807',
                color: '#FFFFFF',
              },
            }}
            onClick={handleExportExcel}
          >
            Export Excel
          </Button>
        </div>
      )}

      <div id="lecture-plans">
        {/* Render your lecture plans here */}
      </div>

      <ModalForm isOpen={modalIsOpen} onRequestClose={closeModal}>
        {formType === 'lecturePlan' && <LecturePlanForm onRequestClose={closeModal} />}
      </ModalForm>
    </div>
  );
};
