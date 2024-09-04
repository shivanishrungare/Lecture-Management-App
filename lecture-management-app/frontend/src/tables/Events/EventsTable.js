import React, { useState, useEffect } from 'react';
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
];

export const EventsTable = ({ refresh }) => {
  return (
    <GenericTable
      columns={eventColumns}
      fetchData={fetchEvents} // Pass the fetch function to the GenericTable
      title="Events"
      FormComponent={AddEventsForm}
      deleteEndpoint="admin/event"
      refresh={refresh} // Pass the refresh prop to trigger re-fetch
    />
  );
};
