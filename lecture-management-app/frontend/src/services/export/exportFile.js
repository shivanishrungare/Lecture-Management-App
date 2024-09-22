import { utils, writeFile } from 'xlsx'; 

export const exportToExcel = (lecturePlans) => {
  const filteredData = lecturePlans.map(lecture => ({
    Week: lecture.lectureWeek,
    Date: lecture.lectureDate,
    StartTime: lecture.startTime,
    EndTime: lecture.endTime,
    Professors: lecture.professors.map(prof => prof.name).join(', '), 
    Details: lecture.lectureDetails,
    Units: lecture.lectureUnits
  }));


  const worksheet = utils.json_to_sheet(filteredData);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, 'Lecture Plans');

  writeFile(workbook, 'lecture_plan.xlsx');
};
