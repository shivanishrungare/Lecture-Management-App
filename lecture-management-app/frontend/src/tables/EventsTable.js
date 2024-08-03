
import React from 'react';
import { GenericTable } from './GenericTable';
import { fetchEvents } from './fetchData';

const eventColumns = [
  { id: 'startDate', label: 'Start Date' },
  { id: 'endDate', label: 'End Date' },
  { id: 'startTime', label: 'Start Time' },
  { id: 'endTime', label: 'End Time' },
  { id: 'eventDetails', label: 'Event Details' },
  { id: 'eventType', label: 'Event Type' },
];

export const EventsTable = () => {
  return <GenericTable columns={eventColumns} fetchData={fetchEvents} />;
};

