import { push } from 'react-router-redux';

import { BASE_URL } from './constants';
import {
  loadEventGroupWithTickets,
  loadTicketAssociations,
  postTicketAssociations,
} from './api';
import { setWindowLocation } from 'js-utils/http';

export const LOAD_TICKETS_ASSOCIATIONS =
  'multi-event-tickets/load-tickets-associations';
export const LOAD_EVENTS = 'multi-event-tickets/load-events';
export const UPDATE_FILTERS = 'multi-event-tickets/update-filters';

export const updateFilters = filters => ({
  type: UPDATE_FILTERS,
  payload: filters,
});

const _loadTicketAssociations = ticketAssociations => ({
  type: LOAD_TICKETS_ASSOCIATIONS,
  payload: ticketAssociations,
});

const _loadEvents = events => ({
  type: LOAD_EVENTS,
  payload: events,
});

export const initializeApp = (sdk, eventId, eventGroupId) => dispatch =>
  loadEventGroupWithTickets(sdk)(eventGroupId).then(results => {
    dispatch(_loadEvents(results));
    if (results.entities && results.entities.ticketClasses) {
      Object.values(results.entities.ticketClasses).forEach(ticket => {
        if (+ticket.eventId !== +eventId) {
          return;
        }
        loadTicketAssociations(sdk)(eventId, ticket.id).then(
          ticketAssociations => {
            dispatch(_loadTicketAssociations(ticketAssociations));
          }
        );
      });
    }
  });

export const updateTicketAssociations = (
  sdk,
  eventId,
  masterTicketId,
  associations
) => dispatch =>
  postTicketAssociations(sdk)(eventId, masterTicketId, associations).then(
    ticketAssociations => {
      dispatch(_loadTicketAssociations(ticketAssociations));
    }
  );

export const redirectToTicketCreation = eventId => (dispatch, getState) => {
  let {
    featureFlags: { isCoyoteEvent },
  } = getState();
  let url = isCoyoteEvent
    ? `/manage/events/${eventId}/tickets`
    : `/edit?eid=${eventId}#create_tickets_wrapper`;

  setWindowLocation(url);
};

export const openMasterTicketEdit = (eventId, ticketId) =>
  push(`${BASE_URL.replace('/:eventId/', `/${eventId}/`)}${ticketId}`);

export const navigateToLandingPage = eventId =>
  push(`${BASE_URL.replace('/:eventId/', `/${eventId}/`)}`);
