import axios from 'axios';

export const usePlanData = () => {
  // Fetching approved lecture plans
  const fetchApprovedLecturePlans = async (userId) => {
    if (!userId) return [];

    try {
      const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/api/plan/approvedLecturePlans/${userId}`);
      return response.data.map((plan) => ({
        id: plan._id,
        title: plan.moduleName || plan.lectureDetails,
        start: `${plan.lectureDate}T${plan.startTime}`,
        end: `${plan.lectureDate}T${plan.endTime}`,
        backgroundColor: '#28a745',
        borderColor: '#28a745',
        roomNumber: plan.room || '',
        professors: plan.professors || [],
        message: plan.message || '',
      }));
    } catch (error) {
      console.error('Error fetching approved lecture plans:', error);
      return [];
    }
  };

  // Fetching admin events
  const fetchAdminEvents = async () => {
    try {
      const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/api/admin/events`);
      return response.data.map((event) => ({
        id: event._id,
        title: event.eventDetails,
        start: `${event.startDate}T${event.startTime}`,
        end: `${event.endDate}T${event.endTime}`,
        backgroundColor: '#007bff',
        borderColor: '#007bff',
        roomNumber: event.room || '',
      }));
    } catch (error) {
      console.error('Error fetching admin events:', error);
      return [];
    }
  };

  return {
    fetchApprovedLecturePlans,
    fetchAdminEvents,
  };
};
