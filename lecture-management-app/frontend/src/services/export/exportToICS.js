import { saveAs } from 'file-saver';

export const exportToICS = (lecturePlans) => {
  let icsContent = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//YourOrganization//YourProduct//EN\nCALSCALE:GREGORIAN\n';

  lecturePlans.forEach(lecture => {
    const title = lecture.lectureDetails || 'Untitled Lecture'; 
    const start = new Date(`${lecture.lectureDate}T${lecture.startTime}`);
    const end = new Date(`${lecture.lectureDate}T${lecture.endTime}`);
    const description = `Module: ${lecture.module}\nProfessors: ${lecture.professors.join(', ')}` || 'No description provided'; 
    const location = lecture.location || 'No location specified';
    const uid = lecture.id ? `${lecture.id}@yourdomain.com` : `random-${Math.random().toString(36).substring(7)}@yourdomain.com`;

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      console.error(`Invalid date for lecture: ${title}`);
      return; 
    }

   
    icsContent += 'BEGIN:VEVENT\n';
    icsContent += `SUMMARY:${title}\n`;
    icsContent += `DTSTART:${formatDateICS(start)}\n`;
    icsContent += `DTEND:${formatDateICS(end)}\n`;
    icsContent += `DESCRIPTION:${description}\n`;
    icsContent += `LOCATION:${location}\n`;
    icsContent += 'STATUS:CONFIRMED\n';
    icsContent += `UID:${uid}\n`;
    icsContent += 'END:VEVENT\n';
  });

  icsContent += 'END:VCALENDAR';


  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });


  saveAs(blob, 'lectures.ics');
};


const formatDateICS = (date) => {

  if (!date || isNaN(date.getTime())) {
    console.error("Invalid date passed to formatDateICS");
    return ''; 
  }
  
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
};