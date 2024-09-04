import { saveAs } from 'file-saver';

export const exportToICS = (lecturePlans) => {
  let icsContent = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//YourOrganization//YourProduct//EN\nCALSCALE:GREGORIAN\n';

  lecturePlans.forEach(lecture => {
    const title = lecture.lectureDetails || 'Untitled Lecture'; // Default title if undefined
    const start = new Date(`${lecture.lectureDate}T${lecture.startTime}`);
    const end = new Date(`${lecture.lectureDate}T${lecture.endTime}`);
    const description = `Module: ${lecture.module}\nProfessors: ${lecture.professors.join(', ')}` || 'No description provided'; // Combine module and professors
    const location = lecture.location || 'No location specified'; // Assuming you have a location field
    const uid = lecture.id ? `${lecture.id}@yourdomain.com` : `random-${Math.random().toString(36).substring(7)}@yourdomain.com`; // Default UID if undefined

    // Validate if start and end are valid dates
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      console.error(`Invalid date for lecture: ${title}`);
      return; // Skip this lecture if the date is invalid
    }

    // Constructing the event in .ics format
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

  // Create a Blob from the iCalendar content
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });

  // Use file-saver to save the .ics file
  saveAs(blob, 'lectures.ics');
};

// Helper function to format dates for iCalendar
const formatDateICS = (date) => {
  // Make sure the date is valid
  if (!date || isNaN(date.getTime())) {
    console.error("Invalid date passed to formatDateICS");
    return ''; // Return an empty string if the date is invalid
  }
  
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
};