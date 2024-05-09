import type { CalendarEvent } from 'src/types/calendar';
import { createResourceId } from 'src/utils/create-resource-id';
import { deepCopy } from 'src/utils/deep-copy';
import { data } from './data';

type GetEventsRequest = {};

type GetEventsResponse = Promise<CalendarEvent[]>;

type CreateEventRequest = {
  allDay: boolean;
  description: string;
  end: number;
  start: number;
  title: string;
};

type CreateEventResponse = Promise<CalendarEvent>;

type UpdateEventRequest = {
  eventId: string;
  update: {
    allDay?: boolean;
    description?: string;
    end?: number;
    start?: number;
    title?: string;
  };
};

type UpdateEventResponse = Promise<CalendarEvent>;

type DeleteEventRequest = {
  eventId: string;
};

type DeleteEventResponse = Promise<true>;

class CalendarApi {
  getEvents(request?: GetEventsRequest): GetEventsResponse {
    return Promise.resolve(deepCopy(data.events));
  }

  createEvent(request: CreateEventRequest): CreateEventResponse {
    const { allDay, description, end, start, title } = request;

    return new Promise((resolve, reject) => {
      try {
        // Make a deep copy
        const clonedEvents = deepCopy(data.events) as CalendarEvent[];

        // Create the new event
        const event: CalendarEvent = {
          id: createResourceId(),
          allDay,
          description,
          end,
          start,
          title
        };

        // Add the new event to events
        clonedEvents.push(event);

        // Save changes
        data.events = clonedEvents;

        resolve(deepCopy(event));
      } catch (err) {
        console.error('[Calendar Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  updateEvent(request: UpdateEventRequest): UpdateEventResponse {
    const { eventId, update } = request;

    return new Promise((resolve, reject) => {
      try {
        // Make a deep copy
        const clonedEvents = deepCopy(data.events) as CalendarEvent[];

        // Find the event that will be updated
        const event = clonedEvents.find((event) => event.id === eventId);

        if (!event) {
          reject(new Error('Event not found'));
          return;
        }

        // Update the event
        Object.assign(event, update);

        // Save changes
        data.events = clonedEvents;

        resolve(deepCopy(event));
      } catch (err) {
        console.error('[Calendar Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  deleteEvent(request: DeleteEventRequest): DeleteEventResponse {
    const { eventId } = request;

    return new Promise((resolve, reject) => {
      try {
        // Make a deep copy
        let clonedEvents = deepCopy(data.events) as CalendarEvent[];

        // Find the event that will be removed
        const event = clonedEvents.find((event) => event.id === eventId);

        if (!event) {
          reject(new Error('Event not found'));
          return;
        }

        clonedEvents = clonedEvents.filter((event) => event.id !== eventId);

        // Save changes
        data.events = clonedEvents;

        resolve(true);
      } catch (err) {
        console.error('[Calendar Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }
}

export const calendarApi = new CalendarApi();
