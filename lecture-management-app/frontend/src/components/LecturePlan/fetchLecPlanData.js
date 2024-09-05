import axios from 'axios';

export const fetchAllLecturePlans = async (moduleId) => {
  try {
    const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/api/plan/lecturePlan`);
    return response.data.map(lectureplan => ({
      id: lectureplan._id,
      lectureWeek: lectureplan.lectureWeek, 
      module: lectureplan.module,
      lectureDate: lectureplan.lectureDate,
      startTime: lectureplan.startTime,
      endTime: lectureplan.endTime,
      professors: lectureplan.professors,
      lectureDetails: lectureplan.lectureDetails,
    }));
  } catch (error) {
    console.error('Error fetching lecture plans:', error);
    throw error;
  }
};

export const fetchModulePlanById = async (moduleId) => {
  try {
    const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/api/plan/modulePlan/${moduleId}`);
    
    const modulePlan = {
      id: response.data._id,
      block: response.data.block,
      batch: response.data.batch,
      semester: response.data.semester,
      studyProgram: response.data.studyProgram,
      moduleName: response.data.moduleName,
      startDate: response.data.startDate,
      endDate: response.data.endDate,
      professors: response.data.professors,
      message: response.data.message,
    };

    return modulePlan;
  } catch (error) {
    console.error('Error fetching module plan:', error);
    throw error;
  }
};

export const fetchLecturePlansByModuleId = async (moduleId) => {
  try {
    const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/api/plan/lecturePlans/${moduleId}`);
    return response.data.map(lectureplan => ({
      id: lectureplan._id,
      lectureWeek: lectureplan.lectureWeek, 
      module: lectureplan.module,
      lectureDate: lectureplan.lectureDate,
      startTime: lectureplan.startTime,
      endTime: lectureplan.endTime,
      professors: lectureplan.professors,
      lectureDetails: lectureplan.lectureDetails,
    }));
  } catch (error) {
    console.error('Error fetching lecture plans:', error);
    throw error;
  }
};



