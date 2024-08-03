import React from 'react';
import { GenericTable } from './GenericTable';
import { fetchCourses } from './fetchData';

const courseColumns = [
  { id: 'studyProgram', label: 'Study Program' },
  { id: 'moduleName', label: 'Module Name' },
  { id: 'creditPoints', label: 'Credit Points', align: 'right' },
  { id: 'language', label: 'Language' },
  { id: 'moduleDetails', label: 'Module Details' },
];

export const CoursesTable = () => {
  return <GenericTable columns={courseColumns} fetchData={fetchCourses} />;
};

