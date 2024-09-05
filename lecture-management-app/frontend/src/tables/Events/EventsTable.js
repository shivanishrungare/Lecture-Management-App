import React from 'react';
import { GenericTable } from '../GenericTable';
import { fetchEvents } from '../fetchData';
import { AddEventsForm } from '../../forms/EventsForm/AddEventsForm';

const eventColumns = [
  { id: 'startDate', label: 'Start Date' },
  { id: 'endDate', label: 'End Date' },
  { id: 'startTime', label: 'Start Time' },
  { id: 'endTime', label: 'End Time' },
  { id: 'eventDetails', label: 'Event Details' },
  { id: 'eventType', label: 'Event Type' },
  { id: 'status', label: 'Event Status' },
];

export const EventsTable = ({ refresh }) => {
  return (
    <GenericTable
      columns={eventColumns}
      fetchData={fetchEvents} 
      title="Events"
      FormComponent={AddEventsForm}
      deleteEndpoint="admin/event"
      refresh={refresh} 
    />
  );
};
