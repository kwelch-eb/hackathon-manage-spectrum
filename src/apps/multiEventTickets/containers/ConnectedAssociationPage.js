import { connect } from 'react-redux';

import {
  initializeApp,
  updateFilters,
  updateTicketAssociations,
  navigateToLandingPage,
} from '../actions';
import {
  getActiveTicketAssociationsByMasterTicketId,
  getAssociationAsChildStatus,
} from '../selectors';
import AssociationPage from '../Pages/AssociationPage';

const _getActiveChildTicketIds = (state, { masterTicketId }) =>
  getActiveTicketAssociationsByMasterTicketId(state, masterTicketId).map(
    association => association.childTicketId
  );

const _getFilteredByTicketIds = (
  {
    entities: { events, ticketClasses },
    filters: { ticketFilter = '', eventFilter = '' } = {},
  },
  eventId,
  ticketIds
) => {
  let selectedTicketsByEventId = ticketIds.reduce((ticketList, ticketId) => {
    let ticket = ticketClasses[ticketId];
    let eventTickets = ticketList[ticket.eventId] || [];

    if (ticketFilter && !ticket.name.includes(ticketFilter)) {
      return ticketList;
    }

    return {
      ...ticketList,
      [ticket.eventId]: [...eventTickets, ticket],
    };
  }, {});

  let filteredEventsWithTickets = Object.keys(selectedTicketsByEventId).reduce(
    (eventList, eId) => {
      if (eId === eventId) {
        return eventList;
      }
      let event = events[eId];
      let ticketList = selectedTicketsByEventId[eId];

      if (ticketList.length === 0) {
        return eventList;
      }

      if (eventFilter && !event.name.text.includes(eventFilter)) {
        return eventList;
      }

      return [
        ...eventList,
        {
          ...event,
          allTicketIds: event.ticketClasses,
          ticketClasses: ticketList,
        },
      ];
    },
    []
  );

  return filteredEventsWithTickets;
};

const _getFilteredByEvents = (
  {
    entities: { events, ticketClasses },
    filters: { ticketFilter = '', eventFilter = '' } = {},
  },
  eventId
) =>
  Object.values(events).reduce((eventList, event) => {
    if (event.id === eventId) {
      return eventList;
    }

    if (eventFilter && !event.name.text.includes(eventFilter)) {
      return eventList;
    }

    let allTicketIds = event.ticketClasses;

    let eventTickets = allTicketIds.reduce((ticketList, ticketId) => {
      let ticket = ticketClasses[ticketId];

      if (ticketFilter && !ticket.name.includes(ticketFilter)) {
        return ticketList;
      }

      return [...ticketList, ticket];
    }, []);

    if (eventTickets.length === 0) {
      return eventList;
    }

    return [
      ...eventList,
      {
        ...event,
        allTicketIds,
        ticketClasses: eventTickets,
      },
    ];
  }, []);

export const getFilteredEventsWithTickets = (
  state,
  { eventId, masterTicketId }
) => {
  let {
    filters: { eventFilter = '', ticketFilter = '', selectedOnly = false } = {},
  } = state;
  console.log(eventId, masterTicketId, eventFilter, ticketFilter);

  // force user to filter before showing results
  // this avoids showing massive amounts of data
  // in the future we could either:
  // - check tickets length first
  // - optimize showing larger lists
  if (!eventFilter && !ticketFilter && !selectedOnly) {
    return [];
  }

  if (selectedOnly) {
    let activeChildTicketIds = _getActiveChildTicketIds(state, {
      masterTicketId,
    });

    return _getFilteredByTicketIds(state, eventId, activeChildTicketIds);
  }

  return _getFilteredByEvents(state, eventId);
};

const _mapStateToProps = (state, props) => {
  console.log('connected', props);
  const { eventId, masterTicketId } = props;
  let initialAssociationStatuses = getAssociationAsChildStatus(state, {
    masterTicketId,
  });
  let filteredEvents = getFilteredEventsWithTickets(state, {
    eventId,
    masterTicketId,
  });

  return {
    filteredEvents,
    initialAssociationStatuses,
    filters: state.filters,
    masterTicket: state.entities.ticketClasses[masterTicketId],
  };
};

const _mapDispatchToProps = {
  initializeApp,
  updateFilters,
  updateTicketAssociations,
  navigateToLandingPage,
};

export default connect(
  _mapStateToProps,
  _mapDispatchToProps
)(AssociationPage);
