import axios from 'axios';

export const usePlanData = () => {

  const fetchPlans = async (endpoint, userId) => {
    if (!userId) return [];

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/plan/${endpoint}/${userId}`);
      return response.data.map((moduleplan) => ({
        id: moduleplan._id,
        block: moduleplan.block,
        batch: moduleplan.batch,
        semester: moduleplan.semester,
        studyProgram: moduleplan.studyProgram,
        startDate: moduleplan.startDate,
        endDate: moduleplan.endDate,
        moduleName: moduleplan.moduleName,
        professors: moduleplan.professors,
        message: moduleplan.message,
      }));
    } catch (error) {
      console.error(`Error fetching ${endpoint} plans:`, error);
      return [];
    }
  };

  const fetchInProgressPlan = (userId) => fetchPlans('progressPlan', userId);
  const fetchCompletedPlan = (userId) => fetchPlans('completedPlan', userId);
  const fetchApprovedPlan = (userId) => fetchPlans('approvedPlan', userId);

  return {
    fetchInProgressPlan,
    fetchCompletedPlan,
    fetchApprovedPlan,
  };
};
