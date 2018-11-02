import PropTypes from 'prop-types';
// import lazyGettext from 'js-utils/lazy-gettext';
const lazyGettext = (string) => string;

export const BASE_URL = '/myevent/:eventId/multi-event-tickets/';

export const ASSOCIATION_STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
};

export const ASSOCIATION_STATUSES_PROP_TYPE = PropTypes.objectOf(PropTypes.oneOf([ASSOCIATION_STATUS.ACTIVE, ASSOCIATION_STATUS.INACTIVE]));

export const FILTERS_PROP_TYPE = PropTypes.shape({
    eventFilter: PropTypes.string,
    ticketFilter: PropTypes.string,
    selectedOnly: PropTypes.bool,
});

export const TICKET_PROP_TYPE = PropTypes.shape({
    id: PropTypes.string.isRequired,
    eventId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    hidden: PropTypes.bool, 
    onSaleStatus: PropTypes.string,
    free: PropTypes.bool,
    donation: PropTypes.bool,
    cost: PropTypes.shape({
        display: PropTypes.string,
    }),
});

export const EVENT_PROP_TYPE = PropTypes.shape({
    id: PropTypes.string.isRequired,
    start: PropTypes.object.isRequired,
    name: PropTypes.shape({
        text: PropTypes.string,
    }).isRequired,
});

export const LOCALIZED_TEXT = {
    landing: {
        title: lazyGettext('Multi Event Tickets'),
        noTickets: lazyGettext('No tickets have been created. Multi event tickets can only be associated once you have tickets created.'),
        newTicketButtonText: lazyGettext('Create New Ticket'),
        addTickets: lazyGettext('Add Tickets'),
        associationsCountColumnTitle: lazyGettext('# Assigned Tickets'),
        nameColumnTitle: lazyGettext('Name'),
    },
};
