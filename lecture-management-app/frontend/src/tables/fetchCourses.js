import axios from 'axios';

export const fetchCourses = async () => {
  const response = await axios.get('http://localhost:5000/api/admin/courses');
  return response.data.map(course => ({
    id: course._id,
    studyProgram: course.studyProgram,
    moduleName: course.moduleName,
    creditPoints: course.creditPoints,
    language: course.language,
    moduleDetails: course.moduleDetails,
  }));
};
