import axios from 'axios';

const url1 = 'https://localhost:5000/api/admin/courses';

export const viewAllCourses = (courses) => axios.get(url1, courses);
export const addNewCourse = (courses) => axios.post(url1, courses);